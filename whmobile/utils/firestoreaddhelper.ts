// utils/firestoreaddhelper.ts

import {
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../firebase';

export type OnboardingProfile = {
  uid: string;
  username: string;
  guild: string;
  mood: string;
  motto?: string;
  avatarId?: string;
};

export const submitOnboardingProfile = async ({
  uid,
  username,
  guild,
  motto,
  avatarId,
  mood = 'whimsical',
}: OnboardingProfile) => {
  try {
    const userRef = doc(db, 'users', uid);

    await setDoc(
      userRef,
      {
        uid,
        username: username.trim(),
        guild,
        motto: motto?.trim() || '',
        avatarId: avatarId || null,
        mood,

        profileComplete: true,

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    console.log('✅ Whimlore profile saved!');
  } catch (err) {
    console.error('🔥 Error saving profile:', err);
    throw err;
  }
};