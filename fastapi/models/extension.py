from pydantic import BaseModel


class ExtensionDocument(BaseModel):
    raw_text: str
    url: str