from pydantic import BaseModel


class ExtensionDocument(BaseModel):
    raw_text: str
    url: str
    UID: str
    title: str
    image_urls: list
    