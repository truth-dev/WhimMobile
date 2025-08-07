// src/helpers/firestore.ts

import { db } from '../firebase';  

/**
 * Marks a user’s profile as complete.
 */
export async function updateProfileComplete(uid: string) {
  try {
    // Grab a DocumentReference for users/{uid}
    const userRef = db.collection('users').doc(uid);

    // Update just the two fields you need
    await userRef.update({
      profileComplete: true,
      updatedAt: new Date(),
    });

    console.log('✅ Profile marked as complete!');
  } catch (err) {
    console.error('🔥 Failed to update profileComplete:', err);
    throw new Error('Failed to update profileComplete');
  }
}
