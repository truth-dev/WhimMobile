// src/helpers/auth.ts

// 1️⃣ Pull in the auth + firestore instances you set up in firebase.ts
import { auth, db } from '../firebase';

// 2️⃣ Use the native auth() and firestore() APIs
export const signUpUser = async (email: string, password: string) => {
  // Create the user
  const { user } = await auth.createUserWithEmailAndPassword(email, password);

  try {
    // Create a profile doc in Firestore
    await db.collection('users').doc(user.uid).set({
      email,
      createdAt: new Date(),
      profileComplete: false,
    });
    console.log('🌟 Firestore profile created!');
    return user;
  } catch (error) {
    console.error('🔥 Failed creating profile, deleting auth user', error);
    // Roll back
    await user.delete();
    throw new Error('Profile creation failed. User deleted.');
  }
};
