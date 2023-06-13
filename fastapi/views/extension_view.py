import asyncio
import logging
from typing import Annotated
from fastapi import APIRouter, Header
from langchain.text_splitter import CharacterTextSplitter

from config import Config
from models.extension import ExtensionDocument, ExtensionPDFDocument, UrlMetadataInfo
from services.bookmark_store_service import AsyncBookmarkStoreService
from services.context_service import ContextService
from utils.db import get_vectorstore, firebase_app as db
import PyPDF2

router = APIRouter()
config = Config()
log = logging.getLogger(__name__)


@router.post('/store')
async def store(document: ExtensionDocument, x_uid: Annotated[str, Header()]):
    vectorstore = get_vectorstore()
    user_id = x_uid
    chunks = CharacterTextSplitter(
        chunk_size=config.chunk_size, chunk_overlap=config.chunk_overlap, separator='.'
    ).split_text(document.raw_text)
    log.info(f'created {len(chunks)} chunks')
    bookmark_ref = await AsyncBookmarkStoreService().add_bookmark(user_id, document)

    try:
        with vectorstore.batch() as batch:
            for chunk in chunks:
                batch.add_data_object({
                    "title": document.title,
                    "content": chunk,
                    "user_id": user_id,
                    "url": document.url,
                    "firebase_id": bookmark_ref.id,  # all chunks have same firebase id
                }, "Document")
            batch.flush()
    except Exception as e:
        log.error(e)
        col_ref = db.collection('users').document(user_id).collection('bookmarks')
        col_ref.filter('url', '==', document.url).delete()  # do not keep in firebase if vectorstore fails
        return {'success': False, 'error': str(e)}

    return {'success': True}


@router.post('/storepdf')
def store(document: ExtensionPDFDocument, x_uid: Annotated[str, Header()]):
    vectorstore = get_vectorstore()
    user_id = x_uid
    pdf_bytes = bytes(document.pdf_bytes)

    pdf_text = ''
    reader = PyPDF2.PdfReader(pdf_bytes)
    num_pages = len(reader.pages)

    for page_number in range(num_pages):
        page = reader.pages[page_number]
        pdf_text += page.extract_text()

    chunks = CharacterTextSplitter(
        chunk_size=config.chunk_size, chunk_overlap=config.chunk_overlap, separator='.'
    ).split_text(pdf_text)
    log.info(f'created {len(chunks)} chunks')

    firebase_data = {
        'folder': 'unsorted',
        'timestamp': document.timestamp,
        'url': document.url,
        'title': document.title,
        'type': 'pdf'
    }
    bookmark_ref = db.collection('users').document(user_id).collection('bookmarks').add(firebase_data)
    # docsCount = 0
    # for doc in bookmark_ref:
    #     docsCount += 1
    # if docsCount == 0:
    #     bookmark_ref = db.collection('users').document(user_id).collection('bookmarks').add(firebase_data)

    try:
        with vectorstore.batch() as batch:
            for chunk in chunks:
                batch.add_data_object({
                    "title": document.title,
                    "content": chunk,
                    "user_id": user_id,
                    "url": document.url,
                    "firebase_id": bookmark_ref.id,  # all chunks have same firebase id
                }, "Document")
            batch.flush()
    except Exception as e:
        log.error(e)
        col_ref = db.collection('users').document(user_id).collection('bookmarks')
        col_ref.filter('url', '==', document.url).delete()  # do not keep in firebase if vectorstore fails
        return {'success': False, 'error': str(e)}

    return {'success': True}


@router.get('/info')
async def url_metadata(url: str, x_uid: Annotated[str, Header()]) -> UrlMetadataInfo:
    service = AsyncBookmarkStoreService()
    bookmarks, folders = await asyncio.gather(service.get_bookmarks_by_url(x_uid, url), service.get_user_folders(x_uid))
    return UrlMetadataInfo(
        is_bookmarked=len(bookmarks) > 0,
        folders=folders,
    )
