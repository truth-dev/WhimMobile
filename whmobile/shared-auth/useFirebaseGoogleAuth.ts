// import * as Google from 'expo-auth-session/providers/google';
// import { useEffect } from 'react';
// import { signInWithCredential, GoogleAuthProvider, type Auth } from 'firebase/auth';
// import { auth } from '../firebase'; // Make sure this uses the already-initialized auth
// import { Platform } from 'react-native';


// const typedAuth = auth as Auth
// export const useFirebaseGoogleAuth = () => {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId:  Platform.OS === 'ios'
//     ? 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com'
//     : '807110668374-skjoprepfpn386htfkil86is43tejb7o.apps.googleusercontent.com',
    
//   });
//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);

//       signInWithCredential(typedAuth, credential)
//         .then((res) => {
//           const user = res.user;
//           console.log('✅ Google sign-in success:', user?.email);
//         })
//         .catch((err) => {
//           console.error('🔥 Google sign-in error:', err);
//         });
//     }
//   }, [response]);

//   return { promptAsync, request };
// };
