import { firebaseConfig, app, auth, db } from "../fb";
import { collection, query, getDocs } from "firebase/firestore";




export async function getAllBookmarks() {
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

