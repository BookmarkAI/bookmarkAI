from datetime import datetime

import firebase_admin
import weaviate
from firebase_admin import credentials, firestore

from config import Config
from utils.files import get_root_path

document_schema = {
    "class": "Document",
    "vectorizer": 'text2vec-openai',
    "properties": [
        {
            "name": "title",
            "dataType": ["string"],
        },
        {
            "name": "url",
            "dataType": ["string"],
        },
        {
            "name": "content",
            "dataType": ["string"],
        },
        {
            "name": "firebase_id",
            "dataType": ["string"],
        },
        {
            "name": "user_id",
            "dataType": ["string"]
        }
    ]
}


def get_vectorstore() -> weaviate.Client:
    config = Config()
    print(f'Connecting to Weaviate at {config.weaviate_url}')
    weaviate_client = weaviate.Client(config.weaviate_url)

    if not weaviate_client.schema.exists(document_schema['class']):
        weaviate_client.schema.create_class(document_schema)

    return weaviate_client


cred = credentials.Certificate('../bookmarkai-c7f69-0e7393f3fe4e.json')
app = firebase_admin.initialize_app(cred)
firebase_app = firestore.client()
