// src/helpers/questLink.ts

import { db } from '../firebase'; // your getFirestore(app) export

/**
 * Create a linked quest and invite a friend
 */
export async function createLinkedQuest(
  questId: string,
  questTitle: string,
  fromUID: string,
  toUID: string
): Promise<string> {
  const ref = await db
    .collection('linkedQuests')
    .add({
      questId,
      questTitle,
      createdBy: fromUID,
      participants: [fromUID, toUID],
      startedAt: new Date(),
      status: 'pending',
    });
  return ref.id;
}

/**
 * Accept a linked quest
 */
export async function acceptLinkedQuest(linkId: string): Promise<void> {
  await db
    .collection('linkedQuests')
    .doc(linkId)
    .update({ status: 'active' });
}

/**
 * Get active linked quests for a user
 */
export async function getLinkedQuestsForUser(
  userId: string
): Promise<Array<{ id: string; [key: string]: any }>> {
  const snapshot = await db
    .collection('linkedQuests')
    .where('participants', 'array-contains', userId)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Create a friend connection (discovery)
 */
export async function createFriendRequest(
  userA: string,
  userB: string
): Promise<void> {
  await db
    .collection('connections')
    .add({
      userA,
      userB,
      initiatedBy: userA,
      status: 'pending',
      bondLevel: 0,
    });
}

/**
 * Accept friend connection
 */
export async function acceptFriendRequest(
  connectionId: string
): Promise<void> {
  await db
    .collection('connections')
    .doc(connectionId)
    .update({ status: 'accepted' });
}
