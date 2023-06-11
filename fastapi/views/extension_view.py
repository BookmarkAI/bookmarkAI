import logging
from typing import Annotated
from fastapi import APIRouter, Header
from langchain.text_splitter import CharacterTextSplitter

from config import Config
from models.extension import ExtensionDocument
from utils.db import get_vectorstore, firebase_app as db

router = APIRouter()
config = Config()
log = logging.getLogger(__name__)


@router.post('/store')
def store(document: ExtensionDocument, x_uid: Annotated[str, Header()]):
    vectorstore = get_vectorstore()
    user_id = x_uid
    chunks = CharacterTextSplitter(
        chunk_size=config.chunk_size, chunk_overlap=config.chunk_overlap, separator='.'
    ).split_text(document.raw_text)
    log.info(f'created {len(chunks)} chunks')

    firebase_data = {
        'folder': 'unsorted',
        'timestamp': document.timestamp,
        'url': document.url,
        'title': document.title,
        'type': 'url'
    }
    time, bookmark_ref = db.collection('users').document(user_id).collection('bookmarks').add(firebase_data)

    try:
        with vectorstore.batch() as batch:
            for chunk in chunks:
                batch.add_data_object({
                    "title": document.title,
                    "content": chunk,
                    "user_id": user_id,
                    "url": document.url,
                    "firebase_id": bookmark_ref.id,     # all chunks have same firebase id
                }, "Document")
            batch.flush()
    except Exception as e:
        log.error(e)
        col_ref = db.collection('users').document(user_id).collection('bookmarks')
        col_ref.filter('url', '==', document.url).delete()  # do not keep in firebase if vectorstore fails
        return {'success': False, 'error': str(e)}

    return {'success': True}
