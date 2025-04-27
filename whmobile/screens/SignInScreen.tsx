// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/types';
// import { useAuth } from '../shared-auth/useAuth';
// import LottieView from 'lottie-react-native';
// import Magic from '../assets/animations/stars.json';

// const SignInScreen = () => {
//   const { loginWithGoogle } = useAuth();
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const [loading, setLoading] = useState(false);

//   const handleSignIn = async () => {
//     try {
//       setLoading(true);
//       const credential = await loginWithGoogle();
//       if (credential?.user) {
//         console.log('Welcome:', credential.user.displayName);
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Tabs' }],
//         });
//       } else {
//         Alert.alert('Login Failed', 'Could not retrieve user info.');
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//       Alert.alert('Login Error', 'Something went wrong signing you in.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <LottieView source={Magic} autoPlay loop style={StyleSheet.absoluteFillObject} />
//       <View style={styles.content}>
//         <Text style={styles.title}>Welcome to WhimLore 🌌</Text>
//         <TouchableOpacity
//           style={[styles.button, loading && { opacity: 0.5 }]}
//           onPress={handleSignIn}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>✨ Enter the Realm</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default SignInScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
//   title: { fontSize: 22, color: '#ffffff', fontWeight: '600', marginBottom: 40, textAlign: 'center' },
//   button: {
//     backgroundColor: '#7c3aed',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     marginTop: 20,
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });


//Temporary SignInScreen for testing purposes 

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { withTimeout } from '../utils/timeoutPromise';


const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastAttemptTimedOut, setLastAttemptTimedOut] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setLastAttemptTimedOut(false);

      const userCredential = await withTimeout(
        signInWithEmailAndPassword(auth, email, password),
        10000 // 10 seconds timeout
      );

      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.log('🌱 New user, signing out.');
        await auth.signOut();
        navigation.reset({
          index: 0,
          routes: [{ name: 'JoinTheRealm' }],
        });
      } else {
        console.log('🧙 Returning user.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      }

    } catch (error: any) {
      console.error('Login error:', error);

      if (error.message?.includes('timed out')) {
        setLastAttemptTimedOut(true);
      } else {
        Alert.alert('Login Failed', error.message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🪄 Magical Full Screen Loading */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#7c3aed" />
          <Text style={styles.loadingText}>🔮 Connecting to the Arcane Realm...</Text>
        </View>
      </Modal>

      <Text style={styles.title}>Sign In to WhimLore</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.5 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {lastAttemptTimedOut ? '⏳ Retry Connection' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={{ color: '#7c3aed', marginTop: 16 }}>
          ✨ New Realmwalker? Create an Account!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0f0f1a' },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#1f1f2f', color: '#fff', padding: 14, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#7c3aed', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});