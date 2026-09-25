import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import {
  doc,
  onSnapshot,
} from 'firebase/firestore';

import { auth, db } from '../firebase';
import { RootStackParamList } from './types';

import RealmLoadingScreen from '../screens/RealmLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import BottomTabNavigator from './BottomTabNav';
import JoinTheRealm from '../screens/Onboarding/JoinTheRealm';
import CreateAccountScreen from '../screens/Onboarding/CreateAccountScreen';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [user, setUser] = useState<User | null>(null);

  const [profileComplete, setProfileComplete] =
    useState<boolean | null>(null);

  const [loading, setLoading] = useState(true);

  /*
    Watch Firebase Authentication.
  */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);

        if (!currentUser) {
          setProfileComplete(null);
        }

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  /*
    If someone is logged in, watch their
    Whimlore profile document.

    This means when onboarding creates the
    document, RootNavigator notices automatically.
  */
  useEffect(() => {
    if (!user) {
      return;
    }

    setProfileComplete(null);

    const userDocRef = doc(
      db,
      'users',
      user.uid
    );

    const unsubscribe = onSnapshot(
      userDocRef,

      (snapshot) => {
        setProfileComplete(snapshot.exists());
      },

      (error) => {
        console.error(
          'Profile listener error:',
          error
        );

        setProfileComplete(false);
      }
    );

    return unsubscribe;
  }, [user]);

  /*
    Initial Firebase Auth check.
  */
  if (loading) {
    return <RealmLoadingScreen />;
  }

  /*
    Logged in, but we're still checking whether
    their Whimlore profile exists.
  */
  if (user && profileComplete === null) {
    return <RealmLoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          /*
            USER IS NOT LOGGED IN
          */
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
            />

            <Stack.Screen
              name="CreateAccount"
              component={CreateAccountScreen}
            />
          </>
        ) : !profileComplete ? (
          /*
            USER IS LOGGED IN
            BUT HASN'T COMPLETED ONBOARDING
          */
          <Stack.Screen
            name="JoinTheRealm"
            component={JoinTheRealm}
          />
        ) : (
          /*
            USER IS LOGGED IN
            AND HAS A WHIMLORE PROFILE
          */
          <Stack.Screen
            name="Tabs"
            component={BottomTabNavigator}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}