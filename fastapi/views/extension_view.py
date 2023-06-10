import logging
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from datetime import datetime

import weaviate
from fastapi import APIRouter
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document
from langchain.text_splitter import CharacterTextSplitter

from config import Config
from models.extension import ExtensionDocument
from utils.db import get_vectorstore

router = APIRouter()
config = Config()
log = logging.getLogger(__name__)
cred = credentials.Certificate('../bookmarkai-c7f69-0e7393f3fe4e.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

@router.post('/store')
def store(document: ExtensionDocument):
    vectorstore = get_vectorstore()
    user_id = "user1"   # TODO: get user id from session
    chunks = CharacterTextSplitter(
        chunk_size=config.chunk_size, chunk_overlap=config.chunk_overlap, separator='.'
    ).split_text(document.raw_text)
    log.info(f'created {len(chunks)} chunks')

    with vectorstore.batch() as batch:
        for chunk in chunks:
            batch.add_data_object({
                "title": document.title,
                "content": chunk,
                "user_id": user_id,
                "url": document.url
            }, "Document")
        batch.flush()
    
    firebase_data = {
        'folder': 'general', 
        'timestamp': document.timestamp, 
        'url': document.url, 
        'title': document.title, 
        'type': 'url'
    }
    db.collection('users').document(document.UID).collection('bookmarks').add(firebase_data)

    return {'success': True}
