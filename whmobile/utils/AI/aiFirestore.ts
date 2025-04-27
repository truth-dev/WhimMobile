import { addDoc, collection, DocumentReference } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  generateRiddle,
  generateScavengerTask,
  generateNpcDialogue,
} from '../../services/openai';

export async function fetchAndStoreRiddle(guild: string): Promise<DocumentReference> {
  const text = await generateRiddle(guild);
  return addDoc(collection(db, 'riddles'), { guild, text, createdAt: Date.now() });
}

export async function fetchAndStoreQuest(guild: string): Promise<DocumentReference> {
  const text = await generateScavengerTask(guild);
  return addDoc(collection(db, 'quests'), { guild, text, createdAt: Date.now() });
}

export async function fetchAndStoreNpcLine(
  npcName: string,
  playerId: string,
  playerName: string
): Promise<DocumentReference> {
  const text = await generateNpcDialogue(npcName, playerName);
  return addDoc(collection(db, 'npcDialogues'), {
    npcName,
    playerId,
    text,
    createdAt: Date.now(),
  });
}
