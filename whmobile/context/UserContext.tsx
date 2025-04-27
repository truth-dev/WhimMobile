import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
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

    // 1) Subscribe to auth state
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // 2) When user changes, subscribe to their Firestore doc
    let unsubUserDoc: (() => void) | null = null;
    let cleanupOffline: (() => void) | null = null;

    if (user) {
      const userRef = doc(db, 'users', user.uid);

      // Listen for real-time updates
      unsubUserDoc = onSnapshot(userRef, (snap) => {
        if (snap.exists()) {
          setUserData(snap.data() as ExtendedUserData);
        }
      });

      // Mark online
      setDoc(
        userRef,
        { online: true, lastActive: serverTimestamp() },
        { merge: true }
      );

      // Prepare offline handler
      cleanupOffline = () => {
        setDoc(
          userRef,
          { online: false, lastActive: serverTimestamp() },
          { merge: true }
        );
      };
      window.addEventListener('beforeunload', cleanupOffline);
    }

    // Cleanup on unmount or when user changes
    return () => {
      unsubAuth();
      if (unsubUserDoc) unsubUserDoc();
      if (cleanupOffline) {
        window.removeEventListener('beforeunload', cleanupOffline);
        cleanupOffline();
      }
    };
  }, [user]);

  const hasRole = (role: string) => userData?.role === role;

  return (
    <UserContext.Provider value={{ user, userData, loading, hasRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
