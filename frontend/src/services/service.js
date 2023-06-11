import { auth, db } from "../fb";
import { collection, query, getDocs, getDoc, doc, where, updateDoc } from "firebase/firestore";




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
export {getAllBookmarks, getAllFolders, updateBookmarkFolder}

