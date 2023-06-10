import { firebaseConfig, app, auth, db } from "../fb";
import { collection, query, getDocs } from "firebase/firestore";
import { real_bookmarks } from "./dataset";


export async function getAllBookmarksReal() {
    if (auth.currentUser != null) {
        const q = query(collection(db, auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            real_bookmarks.push(doc)
          });
        console.log(real_bookmarks);
    
    }
}

