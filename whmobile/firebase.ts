import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBdnTHdYh29-jKiEyy-mfeb9PTbliarJB8',
  authDomain: 'whimlore-dc9be.firebaseapp.com',
  projectId: 'whimlore-dc9be',
  storageBucket: 'whimlore-dc9be.appspot.com',
  messagingSenderId: '807110668374',
  appId: '1:807110668374:web:e1f92208620a2530084bf7',
  measurementId: 'G-0JEPENJ42M',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);        // 🔥 No persistence for now
export const db = getFirestore(app);     // 🪄 Firestore magic
export const storage = getStorage(app);  // 📦 Cloud Storage
