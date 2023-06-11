import { auth, db } from "../fb";
import { collection, query, getDocs, getDoc, doc, where } from "firebase/firestore";




async function getAllBookmarks() {
    var bookmarks = []
    if (auth.currentUser != null) {
        const q = query(collection(db, "users", auth.currentUser.uid, "bookmarks"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            bookmarks.push(doc.data())
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

async function updateBookmarkFolder(bookmark, folder) {
    if (auth.currentUser != null) {
        const q = query(collection(db, "users", auth.currentUser.uid, "bookmarks"), where("url", "==", bookmark));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await updateDoc(doc, {
                "folder": folder
              });
        })
    }
}
export {getAllBookmarks, getAllFolders, updateBookmarkFolder}

