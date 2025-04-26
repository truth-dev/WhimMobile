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
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // your firebase.ts setup

const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  
  const handleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔍 Check if the user has a profile document
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log('🧙‍♂️ Returning user! Welcome back.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }], // Go to main Tabs
        });
      } else {
        console.log('🌱 New user! Time to Join the Realm.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'JoinTheRealm' }], // Go to onboarding
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In to WhimLore</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
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
});
