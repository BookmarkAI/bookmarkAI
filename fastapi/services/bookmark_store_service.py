import abc
from typing import List

from models.bookmark_store import UserDoc
from utils.db import firebase_app, async_firebase_app


class BaseBookmarkStoreService(abc.ABC):
    @abc.abstractmethod
    def get_user_folders(self, x_uid: str):
        pass

    @abc.abstractmethod
    def get_bookmarks_by_url(self, x_uid: str, url: str):
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
