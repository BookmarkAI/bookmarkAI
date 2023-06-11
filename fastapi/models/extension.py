from typing import Optional

from pydantic import BaseModel

class ExtensionDocument(BaseModel):
    raw_text: str
    url: str
    title: str
    image_urls: list
    timestamp: int
