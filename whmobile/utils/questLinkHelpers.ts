import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc,  getDocs, query, where } from 'firebase/firestore';

// Create a linked quest and invite a friend
export async function createLinkedQuest(questId: string, questTitle: string, fromUID: string, toUID: string) {
  const docRef = await addDoc(collection(db, 'linkedQuests'), {
    questId,
    questTitle,
    createdBy: fromUID,
    participants: [fromUID, toUID],
    startedAt: new Date(),
    status: 'pending',
  });

  return docRef.id;
}

// Accept a linked quest
export async function acceptLinkedQuest(linkId: string) {
  const ref = doc(db, 'linkedQuests', linkId);
  await updateDoc(ref, { status: 'active' });
}

// Get active linked quests for a user
export async function getLinkedQuestsForUser(userId: string) {
  const q = query(
    collection(db, 'linkedQuests'),
    where('participants', 'array-contains', userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Create a friend connection (discovery)
export async function createFriendRequest(userA: string, userB: string) {
  await addDoc(collection(db, 'connections'), {
    userA,
    userB,
    initiatedBy: userA,
    status: 'pending',
    bondLevel: 0,
  });
}

// Accept friend connection
export async function acceptFriendRequest(connectionId: string) {
  const ref = doc(db, 'connections', connectionId);
  await updateDoc(ref, { status: 'accepted' });
}
