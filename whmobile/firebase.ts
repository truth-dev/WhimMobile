import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBdnTHdYh29-jKiEyy-mfeb9PTbliarJB8",
  databaseURL: "https://whimlore-dc9be-default-rtdb.firebaseio.com",
  authDomain: "whimlore-dc9be.firebaseapp.com",
  projectId: "whimlore-dc9be",
  storageBucket: "whimlore-dc9be.appspot.com",
  messagingSenderId: "807110668374",
  appId: "1:807110668374:web:e1f92208620a2530084bf7",
  measurementId: "G-0JEPENJ42M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
