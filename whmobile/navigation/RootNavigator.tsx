import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { RootStackParamList } from './types';


import RealmLoadingScreen from '../screens/RealmLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import BottomTabNavigator from './BottomTabNav';
import JoinTheRealm from '../screens/Onboarding/JoinTheRealm';
import CreateAccountScreen from '../screens/Onboarding/CreateAccountScreen'; // Import your CreateAccountScreen



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [user, setUser] = useState<User | null>(null);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // 🔍 Check Firestore for profile
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
    return <RealmLoadingScreen />; // 🌟 show the loading screen while checking auth
  }

  return (
    <NavigationContainer>

<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="SignIn" component={SignInScreen} />
  <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
  <Stack.Screen name="JoinTheRealm" component={JoinTheRealm} />
  <Stack.Screen name="Tabs" component={BottomTabNavigator} />
</Stack.Navigator>
      
    </NavigationContainer>
  );
}
