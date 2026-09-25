import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

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
  const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
    setLoading(false);
  });

  return () => {
    unsubAuth();
  };
}, []);

  const hasRole = (role: string) => userData?.role === role;

  return (
    <UserContext.Provider value={{ user, userData, loading, hasRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
