// src/screens/SignInScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import {
  doc,
  getDoc,
} from 'firebase/firestore';

import { RootStackParamList } from '../navigation/types';
import { withTimeout } from '../utils/timeoutPromise';
import { auth, db } from '../firebase';

const SignInScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setTimedOut(false);

      const userCredential = await withTimeout<UserCredential>(
        signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        ),
        10_000
      );

      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // User has Firebase Auth account but no Whimlore profile yet.
        await signOut(auth);

        navigation.reset({
          index: 0,
          routes: [{ name: 'JoinTheRealm' }],
        });
      } else {
        // Returning Whimlore user.
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      }
    } catch (err: any) {
      console.error('Login error:', err);

      if (err.message?.includes('timed out')) {
        setTimedOut(true);
      } else {
        Alert.alert(
          'Login Failed',
          err.message || 'Something went wrong.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={loading}
        transparent
        animationType="fade"
      >
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            size="large"
            color="#7c3aed"
          />

          <Text style={styles.loadingText}>
            🔮 Connecting to the Arcane Realm...
          </Text>
        </View>
      </Modal>

      <Text style={styles.title}>
        Sign In to WhimLore
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading && { opacity: 0.5 },
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {timedOut
            ? '⏳ Retry Connection'
            : 'Sign In'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CreateAccount')
        }
      >
        <Text style={styles.linkText}>
          ✨ New Realmwalker? Create an Account!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#0f0f1a',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#1f1f2f',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#7c3aed',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  linkText: {
    color: '#7c3aed',
    marginTop: 16,
    textAlign: 'center',
  },

  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});