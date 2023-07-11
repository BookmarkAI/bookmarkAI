import asyncio
import logging
from datetime import datetime
from typing import AsyncIterator, List, Dict
from langchain import PromptTemplate
from langchain.callbacks import AsyncIteratorCallbackHandler
from langchain.callbacks.manager import AsyncCallbackManager
from langchain.chat_models import ChatOpenAI
from langchain.chat_models.base import BaseChatModel
from langchain.schema import BaseMessage, SystemMessage, Document, HumanMessage

from config import Config
from models.bookmark import VectorStoreBookmark
from models.chat import ChatServiceMessage, ConversationMessage
from services.chat_history_service import ChatHistoryService
from services.context_service import ContextService
from utils.db import firebase_app as db
from utils.llm import get_num_tokens

config = Config()
log = logging.getLogger(__name__)

class ConversationService:
    __system_prompt = """
      You're an AI assistant helping users extract information from documents provided as CONTEXT.
      You are expected to produce an exhaustive answer to the user instruction or query given in PROMPT.
    """

    __base_prompt = """
        PROMPT:
        {question}
        CONTEXT:
        {context}
        ASSISTANT RESPONSE:
    """

    model_limits: Dict[str, int] = {
        'gpt-3.5-turbo-16k': 16384,
        'gpt-3.5-turbo': 4096,
        'gpt-4-32k': 32768,
        'gpt-4': 8192
    }

    def __init__(self, context_service: ContextService, uid: str):
        self.context_service = context_service
        self.uid = uid
        self.chat_history_service = ChatHistoryService(uid)

    def _get_system_prompt(self) -> str:
        template = PromptTemplate(template=self.__system_prompt, input_variables=[])
        return template.format()

    def _get_user_prompt(self, question: str, context: str) -> str:
        template = PromptTemplate(template=self.__base_prompt, input_variables=["question", "context"])
        return template.format(question=question, context=context)

    @classmethod
    def _format_context(cls, context: List[VectorStoreBookmark]) -> str:
        return '\n\n'.join([doc.page_content for doc in context])

    def _get_conversation_messages(self, llm: ChatOpenAI, system_msg: SystemMessage,
                                   human_msg: HumanMessage, history: List[ConversationMessage]) -> List[List[BaseMessage]]:
        history_messages = [msg.message for msg in history]
        necessary_tokens = sum([get_num_tokens(system_msg.content, llm.model_name), get_num_tokens(human_msg.content, llm.model_name)])
        token_limit = self.model_limits.get(llm.model_name, 4096)
        if necessary_tokens > token_limit:
            log.warning(f"Message too long for model {llm.model_name}. Skipping context.")
            return [[human_msg]]

        history_tokens = sum([get_num_tokens(m.content, llm.model_name) for m in history_messages])
        while history_tokens + necessary_tokens > token_limit * 0.9:
            history_messages = history_messages.pop(0)
            history_tokens = sum([get_num_tokens(m.content, llm.model_name) for m in history_messages])

        print('using history: ', '\n'.join([m.content for m in history_messages]))

        return [[system_msg, *history_messages, human_msg]]


    def _get_message_generator(self,
                               context: List[VectorStoreBookmark],
                               conversation_history: List[ConversationMessage],
                               user_message: BaseMessage) -> AsyncIterator[str]:
        msg_iterator = AsyncIteratorCallbackHandler()
        llm = ChatOpenAI(
            verbose=True,
            callback_manager=AsyncCallbackManager([msg_iterator]),
            streaming=True,
            model_name=config.fast_llm_model,
        )
        msgs = self._get_conversation_messages(llm,
           SystemMessage(content=self._get_system_prompt()),
           HumanMessage(content=self._get_user_prompt(
            user_message.content, self._format_context(context),
           )),
           conversation_history
        )

        asyncio.ensure_future(llm.agenerate(messages=msgs))

        return msg_iterator.aiter()

    def store_conversation(self, question: str, context: List[VectorStoreBookmark], answer: str):
        # store the conversation in firebase
        collection_ref = db.collection('users').document(self.uid).collection('conversations')
        collection_ref.add({
            'question': question,
            'context_urls': list({doc.metadata.url for doc in context}),
            'answer': answer,
            'timestamp': int(datetime.now().timestamp()),
        })

    def create_new_conversation(self) -> str:
        collection_ref = db.collection('users').document(self.uid).collection('conversations')
        update_time, doc_ref = collection_ref.add({
            'timestamp': int(datetime.now().timestamp()),
            'title': None
        })
        return doc_ref.id

    async def chat(self, message: str, conversation_id: str, selected_context: List[str] | None):
        history = await self.chat_history_service.get_chat_history(conversation_id)
        context = self.context_service.get_context(message=message, user_id=self.uid, history=history, selected_context=selected_context)
        full_response = ''

        token_generator = self._get_message_generator(
            context=context,
            conversation_history=history,
            user_message=HumanMessage(content=message),
        )

        # emit content + save it to full_response
        async for chunk in token_generator:
            # content = chunk['choices'][0]['delta'].get('content', '')  # extract the message
            content = chunk
            full_response += content
            if content == '':  # if the message is empty - ignore it
                continue

            yield ChatServiceMessage(msg=content, relevant_documents=context, done=False)

        yield ChatServiceMessage(msg=full_response, relevant_documents=context, done=True)

