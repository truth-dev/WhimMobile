import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyAiAyhjuzwkGFzXDWyILZrtiwMkPYT92RU",
  authDomain: "whmobile-9e94a.firebaseapp.com",
  projectId: "whmobile-9e94a",
  storageBucket: "whmobile-9e94a.firebasestorage.app",
  messagingSenderId: "1004236579641",
  appId: "1:1004236579641:web:46d782d0c231ae0b8b3ee8",
  measurementId: "G-PH4K6FQDBX"
};

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
