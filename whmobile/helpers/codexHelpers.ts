import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

export const unlockCodexFragment = async (userId: string, fragmentId: string) => {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, {
    codex: arrayUnion(fragmentId),
  });
};
