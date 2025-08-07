// src/helpers/userHelper.ts

import firestore from '@react-native-firebase/firestore';
import { db } from '../firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface UserProfileData {
  username?: string;
  guild?: string;
  motto?: string;
  avatarId?: string;
  mood?: string;
  additionalData?: Record<string, any>;
}

/**
 * Creates or updates the user's profile document in Firestore.
 */
export async function createOrUpdateUserProfile(
  user: FirebaseAuthTypes.User,
  profileData: UserProfileData = {}
): Promise<void> {
  try {
    // Reference to users/{uid}
    const userRef = db.collection('users').doc(user.uid);
    // Fetch the document snapshot
    const userSnap = await userRef.get(); // DocumentSnapshot.has exists() method :contentReference[oaicite:0]{index=0}

    if (!userSnap.exists()) {
      // New user: set with server timestamps
      await userRef.set({
        email:           user.email,
        createdAt:       firestore.FieldValue.serverTimestamp(), // serverTimestamp sentinel :contentReference[oaicite:1]{index=1}
        lastLogin:       firestore.FieldValue.serverTimestamp(),
        profileComplete: false,
        level:           1,
        inventory:       {},
        ...profileData,
      });
      console.log('✨ New user profile created');
    } else {
      // Existing user: update lastLogin + any passed fields
      await userRef.update({
        lastLogin: firestore.FieldValue.serverTimestamp(),
        ...profileData,
      });
      console.log('🔄 User profile updated with last login');
    }
  } catch (err) {
    console.error('🔥 Error creating/updating user profile:', err);
    throw new Error('Error creating/updating user profile');
  }
}
