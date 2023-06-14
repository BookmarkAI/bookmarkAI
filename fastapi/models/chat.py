from typing import List

from langchain.schema import Document
from pydantic import BaseModel

from models.bookmark import VectorStoreBookmark, VectorStoreBookmarkMetadata


class ChatServiceMessage(BaseModel):
    done: bool = False
    msg: str = ''
    relevant_documents: List[VectorStoreBookmark] = []


class UserChatMessage(BaseModel):
    message: str


class UserSearchMessage(BaseModel):
    query: str
    use_hybrid: bool = True
    certainty: float = 0.8
    limit_chunks: int = 10
    alpha: float = 0.25


class ChatEndpointMessage(BaseModel):
    chat_response: str
    documents: List[VectorStoreBookmarkMetadata]
    done: bool
