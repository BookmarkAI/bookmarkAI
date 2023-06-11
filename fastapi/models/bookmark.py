from pydantic import BaseModel


class VectorStoreBookmarkMetadata(BaseModel):
    url: str
    title: str
    firebase_id: str


class VectorStoreBookmark(BaseModel):
    page_content: str
    metadata: VectorStoreBookmarkMetadata
