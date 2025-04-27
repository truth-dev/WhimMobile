// File: src/screens/CreateAccountScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import { auth, db } from '../../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import LoadingPortal from '../../components/LoadingPortal';

const CreateAccountScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      return Alert.alert('Oopsie daisy', 'Your fields seem to be empty!');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Oh darn', 'We seem to have a mismatch in passwords!');
    }

    setLoading(true);
    try {
      // 1️⃣ Create the user in Firebase Auth
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const { user } = credential;
      console.log('🌟 Account created for:', user.email);

      // 2️⃣ Create the Firestore user document
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        profileComplete: false,
        createdAt: serverTimestamp(),
      });
      console.log('📜 User profile document created.');

      // 3️⃣ Navigate to the onboarding (or main) screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'JoinTheRealm' }],
      });

    } catch (err) {
      console.error('🔥 Account creation error:', err);
      if (err instanceof FirebaseError) {
        const firebaseError: FirebaseError = err;
        switch (firebaseError.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Whoops!', 'An account with this email already exists. Try logging in instead.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Hmm...', 'That email looks a little funky. Double-check it!');
            break;
          case 'auth/weak-password':
            Alert.alert('Heads up!', 'Your password is a bit too weak. Try something stronger!');
            break;
          case 'auth/too-many-requests':
            Alert.alert('Slow down!', 'Too many attempts. Wait a bit before trying again.');
            break;
          default:
            Alert.alert('Account Creation Failed', (err as FirebaseError).message);
        }
      } else {
        // Non-Firebase errors
        Alert.alert('Account Creation Failed', (err as Error).message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your WhimLore Account</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleCreateAccount}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      <LoadingPortal visible={loading} message="Summoning the WhimLore Spirits…" />
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#0f0f1a' },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#1f1f2f', color: '#fff', padding: 14, borderRadius: 8, marginBottom: 16 },
  button: { backgroundColor: '#7c3aed', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
