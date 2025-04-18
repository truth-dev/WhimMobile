import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface ExtendedUserData {
  uid: string;
  displayName: string;
  guild: string;
  role: string;
  online: boolean;
  lastActive: Timestamp;
}

interface UserContextType {
  user: User | null;
  userData: ExtendedUserData | null;
  loading: boolean;
  hasRole: (role: string) => boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userData: null,
  loading: true,
  hasRole: () => false,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<ExtendedUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);

        // 🔁 Listen for real-time updates to user's profile
        const unsubUserDoc = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as ExtendedUserData);
          }
        });

        // 🔮 Set online and last active
        await setDoc(
          userRef,
          {
            online: true,
            lastActive: serverTimestamp(),
          },
          { merge: true }
        );

        // 🧼 Clean up: Set offline when the app closes
        const handleOffline = async () => {
          await setDoc(
            userRef,
            { online: false, lastActive: serverTimestamp() },
            { merge: true }
          );
        };

        window.addEventListener('beforeunload', handleOffline);
        return () => {
          unsubUserDoc();
          window.removeEventListener('beforeunload', handleOffline);
          handleOffline();
        };
      }
    });

    return () => unsubscribe();
  }, []);

  const hasRole = (role: string) => {
    return userData?.role === role;
  };

  return (
    <UserContext.Provider value={{ user, userData, loading, hasRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
