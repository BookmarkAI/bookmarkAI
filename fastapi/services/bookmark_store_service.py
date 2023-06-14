import abc
import asyncio
from typing import List

from google.cloud.firestore_v1 import ArrayUnion

from models.bookmark_store import UserDoc
from models.extension import ExtensionDocument, ExtensionPDFDocument
from utils.db import firebase_app, async_firebase_app


class BaseBookmarkStoreService(abc.ABC):
    @abc.abstractmethod
    def get_user_folders(self, x_uid: str):
        pass

    @abc.abstractmethod
    def get_bookmarks_by_url(self, x_uid: str, url: str):
        pass

    @abc.abstractmethod
    def add_bookmark(self, x_uid: str, document: ExtensionDocument):
        pass


class AsyncBookmarkStoreService(BaseBookmarkStoreService):
    def __init__(self):
        self.db = async_firebase_app

    async def get_user_folders(self, x_uid: str) -> List[str]:
        doc_ref = self.db.collection('users').document(x_uid)
        doc = await doc_ref.get()
        if not doc.exists:
            raise Exception(f'User {x_uid} does not exist')
        return UserDoc.parse_obj(doc.to_dict()).folders

    async def get_bookmarks_by_url(self, x_uid: str, url: str):
        doc_ref = self.db.collection('users').document(x_uid).collection('bookmarks')
        docs = await doc_ref.where('url', '==', url).get()
        return [doc.to_dict() for doc in docs]

    async def add_bookmark(self, x_uid: str, document: ExtensionDocument | ExtensionPDFDocument):
        user_doc_ref = self.db.collection('users').document(x_uid)
        firebase_data = {
            'folder': document.folder,
            'timestamp': document.timestamp,
            'url': document.url,
            'title': document.title,
            'type': "pdf" if isinstance(document, ExtensionPDFDocument) else "url"
        }
        add_bookmark_task = user_doc_ref.collection('bookmarks').add(firebase_data)
        create_new_folder_task = user_doc_ref.update({
            'folders': ArrayUnion([document.folder])
        })
        bookmark_task, folder_task = await asyncio.gather(add_bookmark_task, create_new_folder_task)
        return bookmark_task[1]  # bookmark_task: Tuple[timestamp, ref]
