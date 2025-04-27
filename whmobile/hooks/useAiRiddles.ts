import { useState } from 'react';
import { fetchAndStoreRiddle } from '../utils/AI/aiFirestore';
import { getDoc } from 'firebase/firestore';

export function useAiRiddle(guild: string) {
  const [loading, setLoading] = useState(false);
  const [riddle, setRiddle] = useState<string>();
  const [error, setError] = useState<string>();

  async function create() {
    setLoading(true);
    setError(undefined);
    try {
      const docRef = await fetchAndStoreRiddle(guild);
      const snap = await getDoc(docRef);
      setRiddle(snap.data()?.text);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { riddle, loading, error, create };
}
