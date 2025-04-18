import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDCn8XqK8h3jnOV3FbZgD40s72tzqLNB3A",
  authDomain: "socialquest-2c334.firebaseapp.com",
  projectId: "socialquest-2c334",
  storageBucket: "socialquest-2c334.appspot.com",
  messagingSenderId: "965290551052",
  appId: "1:965290551052:web:56054ef42f29d2c1c88b29",
  
  };
   
  
const app = initializeApp(firebaseConfig);  
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

   export const firestore = getFirestore(app);

   