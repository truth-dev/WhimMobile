// src/helpers/firebaseHelper.ts

import * as FileSystem from 'expo-file-system';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { db } from '../firebase';  // your getFirestore(app) export

export type WhimLoreEntry = {
  username: string;
  guild:    string;
  mood:     string;
  motto?:   string;
  avatarUri?: string;
  additionalData?: Record<string, any>;
};

/**
 * Downloads a remote URI to a temp file and uploads it to Firebase Storage.
 * Returns the public download URL.
 */
export async function uploadImageAsync(
  uri: string,
  remotePath: string
): Promise<string> {
  try {
    // 1. Download to Expo’s DocumentDirectory
    const filename = remotePath.split('/').pop();
    const localFile = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.downloadAsync(uri, localFile);

    // 2. Upload that file
    const ref = storage().ref(remotePath);
    await ref.putFile(localFile);

    // 3. Get & return its URL
    return await ref.getDownloadURL();
  } catch (err) {
    console.error('🔥 Error uploading image:', err);
    throw err;
  }
}

/**
 * Save a new “profile” doc in Firestore under /profiles.
 */
export async function saveWhimLoreProfile(entry: WhimLoreEntry) {
  try {
    let avatarUrl: string | null = null;
    if (entry.avatarUri) {
      const path = `avatars/${entry.username}-${Date.now()}.jpg`;
      avatarUrl = await uploadImageAsync(entry.avatarUri, path);
    }

    await db
      .collection('profiles')
      .add({
        username:       entry.username,
        guild:          entry.guild,
        mood:           entry.mood,
        motto:          entry.motto ?? '',
        avatarUrl:     avatarUrl,
        additionalData: entry.additionalData ?? {},
        createdAt:     firestore.FieldValue.serverTimestamp(),
      });

    console.log('✅ Profile saved successfully');
  } catch (err) {
    console.error('🔥 Error saving profile:', err);
    throw err;
  }
}

/**
 * Convenient alias for your onboarding flow.
 */
export const submitOnboardingProfile = saveWhimLoreProfile;
