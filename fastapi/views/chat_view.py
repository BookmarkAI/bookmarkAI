import json
import logging
from typing import AsyncGenerator, Annotated

import numpy as np

from fastapi import APIRouter, Header
from starlette.responses import StreamingResponse

from models.chat import ChatServiceMessage, UserSearchMessage
from services.context_service import ContextService
from services.conversation_service import ConversationService
from utils.db import get_vectorstore

router = APIRouter()


logger = logging.getLogger(__name__)

context_service = ContextService(client=get_vectorstore())


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()  # Convert NumPy array to Python list
        return super(NumpyEncoder, self).default(obj)


async def sse_generator(messages_generator: AsyncGenerator[ChatServiceMessage, None], question: str, conversation_service: ConversationService):
    async for msg in messages_generator:
        msg_dict = {
            'chat_response': msg.msg,
            'documents': [d.dict() for d in msg.relevant_documents],
            'done': msg.done
        }
        if msg.done:
            yield f"data: {json.dumps(msg_dict, cls=NumpyEncoder)}\n\n"
            await conversation_service.store_conversation(
                question=question,
                context=[d for d in msg.relevant_documents],
                answer=msg.msg,
            )
        else:
            yield f"data: {json.dumps(msg_dict, cls=NumpyEncoder)}\n\n"


@router.get('/chat', responses={200: {"content": {"text/event-stream": {}}}})
async def chat(q: str, x_uid: Annotated[str, Header()]):
    conversation_service = ConversationService(context_service=context_service, uid=x_uid)
    completion = conversation_service.chat(
        message=q,
    )
    sse = StreamingResponse(
        sse_generator(completion, q, conversation_service),
        media_type='text/event-stream'
    )

    # workaround for app engine
    sse.headers["Cache-Control"] = "no-cache"
    return sse


@router.post('/search')
async def search(message: UserSearchMessage, x_uid: Annotated[str, Header()]):
    relevant_docs = context_service.get_context(message.query, x_uid)
    return [d.dict() for d in relevant_docs]
