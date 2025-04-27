import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // adjust path if needed

export const signUpUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  try {
    await setDoc(doc(db, 'users', user.uid), {
      email,
      createdAt: new Date(),
      profileComplete: false,
    });
    console.log('🌟 Firestore profile created!');
    return user;
  } catch (error) {
    console.error('🔥 Failed creating profile, deleting auth user', error);
    await user.delete();
    throw new Error('Profile creation failed. User deleted.');
  }
};
