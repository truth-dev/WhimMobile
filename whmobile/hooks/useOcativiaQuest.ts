import { useEffect, useState } from 'react';
import { collection, getDocs,  } from 'firebase/firestore';
import { db } from '../firebase';
import { OctaviaQuest } from '../type/OctaviaQuest';

export function useOctaviaQuest() {
    const [quest, setQuest] = useState<OctaviaQuest | null>(null);
  
    useEffect(() => {
      const fetchQuest = async () => {
        const querySnap = await getDocs(collection(db, 'octaviaQuests'));
        const activeQuest = querySnap.docs.find(doc => doc.data().status === 'available');
        if (activeQuest) setQuest({ id: activeQuest.id, ...activeQuest.data() } as OctaviaQuest);
      };
      fetchQuest();
    }, []);
  
    return quest;
  }