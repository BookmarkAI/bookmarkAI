import logging
from typing import List, Dict, Any

import weaviate
from config import Config
from models.bookmark import VectorStoreBookmark
from models.chat import ConversationMessage
from services.query_builder_service import QueryBuilderService
from utils.llm import get_num_tokens

config = Config()
log = logging.getLogger(__name__)

class ContextService:
    def __init__(self, client: weaviate.Client):
        self.client = client
        self.query_service = QueryBuilderService()

    def get_context(self, message: str, user_id: str, history: List[ConversationMessage],
                    selected_context: List[str] | None = None,  certainty: float = 0.8) -> List[VectorStoreBookmark]:
        try:
            query = self.query_service.build_query(message, history)
        except BaseException as e:
            log.warning(f"Could not build context query - {e}")
            query = message
        relevant_docs = self.__get_relevant_documents(query, user_id, selected_context, certainty)
        limited_context = self.__limit_context(relevant_docs, config.max_tokens)
        return limited_context

    def search(self, query: str, user_id: str, use_hybrid: bool = True, certainty: float = 0.8, limit: int = 3, alpha: float = 0.25) -> List[VectorStoreBookmark]:
        if use_hybrid:
            relevant_docs = self.__hybrid_search(query, user_id, limit, alpha)
        else:
            relevant_docs = self.__get_relevant_documents(query, user_id, None, certainty)
        return relevant_docs

    def batch_delete(self, user_id: str, firebase_ids: List[str]):
        where_filter = self.__get_where_filter(user_id, firebase_ids)
        self.client.batch.delete_objects(
            class_name="Document",
            where=where_filter
        )

    @classmethod
    def __build_id_in_filter(cls, selected_context: List[str]) -> Dict[str, Any]:
        filters = [{
            "path": ["firebase_id"],
            "operator": "Equal",
            "valueString": context
        } for context in selected_context]

        if len(filters) > 1:
            where_filter = {
                "operator": "Or",
                "operands": filters
            }
        elif len(filters) == 1:
            where_filter = filters[0]
        else:
            raise ValueError("selected_context must not be empty")

        return where_filter

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
                    cls.__build_id_in_filter(selected_context)
                ]
            }
        else:
            where_filter = where_filter_user

        return where_filter

    def __hybrid_search(self, message: str, user_id: str, limit: int, alpha: float) -> List[VectorStoreBookmark]:
        where_filter = self.__get_where_filter(user_id, None)
        res = self.client.query.get(
            "Document", ["title", "url", "content", "firebase_id"]
        ).with_where(
            where_filter
        ).with_hybrid(
            query=message,
            alpha=alpha
        ).with_limit(
            limit
        ).with_additional(
            ['score']
        ).do()

        docs: List[Dict[str, Any]] = res['data']['Get']['Document']
        bookmarks = [VectorStoreBookmark(page_content=d.pop('content'), metadata={
            'title': d.get('title'),
            'url': d.get('url'),
            'id': d.get('firebase_id'),
            'similarity_score': d.get('_additional', {}).get('score'),
        }) for d in docs]
        return bookmarks


    def __get_relevant_documents(self, message: str, user_id: str, selected_context: List[str] | None, certainty: float) -> List[VectorStoreBookmark]:
        where_filter = self.__get_where_filter(user_id, selected_context)

        res = self.client.query.get(
            "Document", ["title", "url", "content", "firebase_id"]
        ).with_where(
            where_filter
        ).with_near_text({
            "concepts": [message],
            "certainty": certainty,
        }).with_additional(
            ['certainty']
        ).do()
        if res.get('errors', None):
            raise Exception(res['errors'])
        docs: List[Dict[str, Any]] = res['data']['Get']['Document']

        bookmarks = [VectorStoreBookmark(page_content=d.pop('content'), metadata={
            'title': d.get('title'),
            'url': d.get('url'),
            'id': d.get('firebase_id'),
            'similarity_score': d.get('_additional', {}).get('certainty'),
        }) for d in docs]
        return bookmarks

    @classmethod
    def __limit_context(cls, context: List[VectorStoreBookmark], token_limit: int) -> List[VectorStoreBookmark]:
        ctx = []
        used_tokens = 0
        for doc in context:
            tokens = get_num_tokens(doc.page_content, config.fast_llm_model)
            if used_tokens + tokens > token_limit:
                break
            ctx.append(doc)
            used_tokens += tokens

        return ctx
