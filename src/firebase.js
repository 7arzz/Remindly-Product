import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔧 Konfigurasi Firebase (Dapatkan dari Firebase Console Anda!)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = (vapidKey) => {
  return getToken(messaging, { vapidKey: vapidKey })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Current token for client: ', currentToken);
        // Simpan token ini ke server/database Anda untuk mengirim notif nanti!
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

export { messaging };
