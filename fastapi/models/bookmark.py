from pydantic import BaseModel


class VectorStoreBookmarkMetadata(BaseModel):
    url: str
    title: str
    id: str


class VectorStoreBookmark(BaseModel):
    page_content: str
    metadata: VectorStoreBookmarkMetadata
