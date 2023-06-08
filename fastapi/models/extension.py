from pydantic import BaseModel


class ExtensionDocument(BaseModel):
    raw_text: str
    url: str
    title: str
    UID: str
    image_urls: list
