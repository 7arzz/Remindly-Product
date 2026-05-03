/**
 * Remindly Premium Template
 * Firebase Service Configuration
 */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyADgLsiTYqfYbvnlt1BI2cQonBTguxlhDU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "remindly-579de.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "remindly-579de",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "remindly-579de.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "575184734169",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:575184734169:web:6c8fbd257a6a686e263bc8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const messaging = getMessaging(app);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithRedirect = () => signInWithRedirect(auth, googleProvider);
export const logout = () => signOut(auth);

export const requestForToken = (vapidKey) => {
  return getToken(messaging, { vapidKey: vapidKey })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Current token for client: ', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Message received in foreground: ", payload);
      resolve(payload);
    });
  });

export { auth, db, messaging };
