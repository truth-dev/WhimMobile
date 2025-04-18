import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const sendLoungeWhisper = async (text: string, userId?: string) => {
  const ref = collection(db, 'lounge');

  await addDoc(ref, {
    text,
    sender: 'Elders',
    uid: userId ?? 'system',
    createdAt: serverTimestamp(),
    whisper: true,
  });
};
