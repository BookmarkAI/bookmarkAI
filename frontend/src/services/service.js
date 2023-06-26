import { auth, db } from "../fb";
import { collection, query, getDocs, getDoc, doc, where, updateDoc } from "firebase/firestore";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

async function getAllConversations() {
    var conversations = []
    if (auth.currentUser != null) {
        const q = query(collection(db, "users", auth.currentUser.uid, "conversations"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const conversation = {
                id: doc.id,
                ...doc.data(),
              };
        
              conversations.push(conversation);
        
          });
    }

    conversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return conversations
}

async function getConversation(conversationId) {
    if (auth.currentUser != null) {
        const docRef = doc(db, 'users', auth.currentUser.uid, "conversations", conversationId);
        const docSnapshot = await getDoc(docRef);
        return docSnapshot.data()
    }
}

async function getBookmark(bookmarkId) {
    if (auth.currentUser != null) {
        const docRef = doc(db, 'users', auth.currentUser.uid, "bookmarks", bookmarkId);
        const docSnapshot = await getDoc(docRef);
        return docSnapshot.data()
    }
}


async function getAllBookmarks() {
    var bookmarks = []
    if (auth.currentUser != null) {
        const q = query(collection(db, "users", auth.currentUser.uid, "bookmarks"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const bookmark = {
                id: doc.id,
                ...doc.data(),
              };
        
              bookmarks.push(bookmark);
        
          });
    }
    bookmarks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return bookmarks
}

async function getAllFolders() {
    var folders = []
    if (auth.currentUser != null) {
        const userDoc = doc(db, "users", auth.currentUser.uid);

        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {

            folders = docSnap.data().folders
        } 
    }
    
    return folders
}

async function updateBookmarkFolder(bookmarkId, folder) {
    if (auth.currentUser != null) {
        const docRef = doc(db, 'users', auth.currentUser.uid, "bookmarks", bookmarkId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            await updateDoc(docRef, {
                folder: folder
            })
        }
    }
}

async function deleteBookmarks(idsToDelete, foldersToDelete) {
    if (auth.currentUser != null) {
        fetch(
            `${BASE_URL}/batch-delete`,
            {
                method: 'POST',
                body: JSON.stringify({ documents: idsToDelete, folders: foldersToDelete || [] }),
                headers: {
                    'X-UID': auth.currentUser.uid,
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}

export {getAllBookmarks, getAllFolders, updateBookmarkFolder, getAllConversations, getConversation, getBookmark, deleteBookmarks }

