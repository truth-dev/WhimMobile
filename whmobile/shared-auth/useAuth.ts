import { useEffect, useState } from 'react';
import { getAuth, signInWithCredential, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // iOS specific fix

export const useAuth = () => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [, , promptAsync] = Google.useAuthRequest({
    clientId: '807110668374-skjoprepfpn386htfkil86is43tejb7o.apps.googleusercontent.com', // from Google Cloud Console
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return unsub;
  }, [auth]);

  const loginWithGoogle = async (): Promise<UserCredential | null> => {
    const result = await promptAsync();

    if (result?.type !== 'success') {
      throw new Error('Login canceled or failed.');
    }

    const idToken = result.authentication?.idToken;
    if (!idToken) {
      throw new Error('No ID token found.');
    }

    const credential = GoogleAuthProvider.credential(idToken);
    return await signInWithCredential(auth, credential);
  };

  return { user, loginWithGoogle };
};
