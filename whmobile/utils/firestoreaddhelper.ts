// firebaseHelper.ts
import { db, storage } from '../firebase'; // Adjust the import path as necessary
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export type WhimLoreEntry = {
  username: string;
  guild: string;
  mood: string;
  motto?: string;
  avatarUri?: string;
  additionalData?: Record<string, any>;
};

/**
 * Uploads an image to Firebase Storage and returns its URL
 */
export const uploadImageAsync = async (uri: string, path: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, blob);

    const downloadUrl = await getDownloadURL(imageRef);
    return downloadUrl;
  } catch (err) {
    console.error('Error uploading image:', err);
    throw err;
  }
};

/**
 * Pushes a new WhimLore profile entry to Firestore
 */
export const saveWhimLoreProfile = async (entry: WhimLoreEntry) => {
  try {
    let avatarUrl = null;
    if (entry.avatarUri) {
      const filePath = `avatars/${entry.username}-${Date.now()}.jpg`;
      avatarUrl = await uploadImageAsync(entry.avatarUri, filePath);
    }

    const profileRef = collection(db, 'profiles');
    await addDoc(profileRef, {
      username: entry.username,
      guild: entry.guild,
      mood: entry.mood,
      motto: entry.motto || '',
      avatarUrl: avatarUrl || null,
      additionalData: entry.additionalData || {},
      createdAt: serverTimestamp()
    });

    console.log('✅ Profile saved successfully');
  } catch (err) {
    console.error('🔥 Error saving profile:', err);
    throw err;
  }
};

/**
 * Call this during onboarding final step to save new user profile
 */
export const submitOnboardingProfile = async ({
  username,
  guild,
  motto,
  avatarUri,
  mood = 'default',
  additionalData
}: {
  username: string;
  guild: string;
  motto: string;
  avatarUri?: string;
  mood?: string;
  additionalData?: Record<string, any>;
}) => {
  await saveWhimLoreProfile({
    username,
    guild,
    mood,
    motto,
    avatarUri,
    additionalData
  });
};
