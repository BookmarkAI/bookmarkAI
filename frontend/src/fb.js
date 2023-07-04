import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, getDoc } from "firebase/firestore"; 



export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const usersRef = collection(db, "users");

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const storage = getStorage(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // Handle the successful sign-in
      const user = auth.currentUser;
      const userRef = doc(usersRef, user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(doc(usersRef, user.uid), {
          "email": user.email,
          "name": user.displayName,
          "subscription_type": "free", 
          "folders": ["Unsorted",]
        });        
      }
      
    })
    .catch((error) => {
      // Handle errors during sign-in
      console.log(error);
    });
};

export const signOut = () => {
  auth.signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}



export const signInWithGoogle2 = () => {
  signInWithRedirect(auth, provider);
};

// Call this method after the redirect to handle the authentication result
export const handleSignInRedirect = async () => {
  try {
    await auth.getRedirectResult();
    const user = auth.currentUser;
    const userRef = doc(usersRef, user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(doc(usersRef, user.uid), {
        "email": user.email,
        "name": user.displayName,
        "subscription_type": "free", 
        "folders": ["Unsorted"]
      });        
    }
  } catch (error) {
    // Handle errors during sign-in
    console.log(error);
  }
};