// mobile/screens/ProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

interface UserProfile {
  name: string;
  email: string;
  guildTagline: string;
  vibeStatus: string;
  picture?: string;
}

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const userRef = doc(getFirestore(), 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#9f7aea" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Fetching your aura...</Text>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff' }}>No profile found. Are you a shadow of the past? 🕯️</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Your WhimLore Identity</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{userProfile.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userProfile.email}</Text>

        <Text style={styles.label}>Guild Motto</Text>
        <Text style={styles.value}>
          {userProfile.guildTagline || 'Still finding your battle cry...'}
        </Text>

        <Text style={styles.label}>Vibe Status</Text>
        <Text style={styles.value}>
          {userProfile.vibeStatus || 'No vibe selected, mysterious one.'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0e0f1f',
    padding: 20,
  },
  centered: {
    flex: 1,
    backgroundColor: '#0e0f1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1f2233',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  label: {
    color: '#9f7aea',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 12,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    marginTop: 2,
  },
});
