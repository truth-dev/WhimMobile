// shared/helpers/syncUserToFirestore.ts
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {jwtDecode} from 'jwt-decode';
import { db } from '../firebase';

interface DecodedToken {
  email?: string;
  name?: string;
  picture?: string;
  sub: string; // This is the Auth0 user ID
}

export const syncUserToFirestore = async (token: string): Promise<void> => {
  const decoded: DecodedToken = jwtDecode(token);
  const uid = decoded.sub; // Auth0's unique identifier

  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // 🪄 First-time user, create profile with Google data
    await setDoc(userRef, {
      email: decoded.email ?? '',
      name: decoded.name ?? 'Wanderer',
      picture: decoded.picture ?? '',
      guildTagline: '',
      selectedGuild: '',
      vibeStatus: '',
      createdAt: new Date(),
    });

    console.log('✨ New user added to Firestore');
  } else {
    console.log('👀 User already exists, skipping write');
  }
};
