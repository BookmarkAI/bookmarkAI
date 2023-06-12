from typing import List, Dict, Any

import tiktoken
import weaviate
from langchain.schema import Document
from config import Config
from models.bookmark import VectorStoreBookmark

config = Config()


class ContextService:
    def __init__(self, client: weaviate.Client):
        self.client = client

    def get_context(self, message: str, user_id: str, selected_context: List[str] | None = None,  certainty: float = 0.8) -> List[VectorStoreBookmark]:
        relevant_docs = self.__get_relevant_documents(message, user_id, selected_context, certainty)
        limited_context = self.__limit_context(relevant_docs, 3000)
        return limited_context

    @classmethod
    def __get_where_filter(cls, user_id: str, selected_context: List[str] | None) -> Dict[str, Any]:
        where_filter_user = {
            "path": ["user_id"],
            "operator": "Equal",
            "valueString": user_id
        }

        if selected_context:
            where_filter = {
                "operator": "And",
                "operands": [
                    where_filter_user,
                    {
                        "path": ["firebase_id"],
                        "operator": "In",
                        "valueStringArray": selected_context
                    }
                ]
            }
        else:
            where_filter = where_filter_user

        return where_filter

    def __get_relevant_documents(self, message: str, user_id: str, selected_context: List[str] | None, certainty: float) -> List[VectorStoreBookmark]:
        where_filter = self.__get_where_filter(user_id, selected_context)

        res = self.client.query.get(
            "Document", ["title", "url", "content", "firebase_id"]
        ).with_where(
            where_filter
        ).with_near_text({
            "concepts": [message],
            "certainty": certainty,
        }).do()

        docs: List[Dict[str, Any]] = res['data']['Get']['Document']

        return [VectorStoreBookmark(page_content=d.pop('content'), metadata={
            'title': d.get('title'),
            'url': d.get('url'),
            'id': d.get('firebase_id'),
        }) for d in docs]

    @classmethod
    def __limit_context(cls, context: List[VectorStoreBookmark], token_limit: int) -> List[VectorStoreBookmark]:
        ctx = []
        used_tokens = 0
        encoding = tiktoken.encoding_for_model(config.fast_llm_model)
        for doc in context:
            tokens = encoding.encode(doc.page_content)
            if used_tokens + len(tokens) > token_limit:
                break
            ctx.append(doc)
            used_tokens += len(tokens)

        return ctx
