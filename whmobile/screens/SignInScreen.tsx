import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../shared-auth/useAuth';
import LottieView from 'lottie-react-native';
import Magic from '../assets/animations/stars.json';

const SignInScreen = () => {
  const { loginWithGoogle } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const credential = await loginWithGoogle();
      if (credential?.user) {
        console.log('Welcome:', credential.user.displayName);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }],
        });
      } else {
        Alert.alert('Login Failed', 'Could not retrieve user info.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      Alert.alert('Login Error', 'Something went wrong signing you in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LottieView source={Magic} autoPlay loop style={StyleSheet.absoluteFillObject} />
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to WhimLore 🌌</Text>
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>✨ Enter the Realm</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 22, color: '#ffffff', fontWeight: '600', marginBottom: 40, textAlign: 'center' },
  button: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
