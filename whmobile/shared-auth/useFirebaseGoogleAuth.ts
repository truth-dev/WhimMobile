import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { initializeAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase'; // Make sure you export Firebase `auth` properly

initializeAuth(auth.app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const useFirebaseGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '807110668374-skjoprepfpn386htfkil86is43tejb7o.apps.googleusercontent.com', // Found in Firebase or Google Cloud Console
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((res) => console.log("Signed in with Firebase:", res.user.email))
        .catch((err) => console.error("Firebase sign-in error", err));
    }
  }, [response]);

  return { promptAsync, request };
};
