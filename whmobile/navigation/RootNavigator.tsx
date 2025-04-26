import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import SignInScreen from '../screens/SignInScreen';
import BottomTabNavigator from './BottomTabNav';
import JoinTheRealm from '../screens/Onboarding/JoinTheRealm';

type RootStackParamList = {
  SignIn: undefined;
  Tabs: undefined;
  JoinTheRealm: undefined;
  Loading: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        setProfileComplete(userDoc.exists());
      } else {
        setProfileComplete(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null; // you could replace this with a splash screen later
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        ) : profileComplete === false ? (
          <Stack.Screen name="JoinTheRealm" component={JoinTheRealm} />
        ) : (
          <Stack.Screen name="Tabs" component={BottomTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
