// firebase.ts

// 1️⃣ Import the modular entrypoint
import { getApp } from '@react-native-firebase/app';

// 2️⃣ Import each service’s getter
import { getAuth }      from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { getStorage }   from '@react-native-firebase/storage';

// 3️⃣ Grab the default app instance synchronously
const app = getApp();  // ✅ no Promise, no “call Signature” errors :contentReference[oaicite:0]{index=0}

// 4️⃣ Initialize each service with that app
export const auth  = getAuth(app);
export const db    = getFirestore(app);
export const storageService = getStorage(app);

// 5️⃣ (Optional) Sanity-check
console.log('🔥 Firebase ready:', {
  name: app.name,
  options: app.options
});
