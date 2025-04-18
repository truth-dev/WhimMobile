import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { triggerRareGnome } from '../utils/gnomeEngine';

// TEMPORARY FRIEND MOCK
const mockFriends = [
  { id: '1', name: 'FaeShadow13' },
  { id: '2', name: 'NekoMage88' },
  { id: '3', name: 'CrystalWarden' },
  { id: '4', name: 'BlipKnight' },
];

const SendGnomeScreen = () => {
  const [isSending, setIsSending] = useState(false);

  const handleSendPrank = (friendName: string) => {
    setIsSending(true);

    const mischief = triggerRareGnome(); // Always prank for now

    // Simulate network delay
    setTimeout(() => {
      Alert.alert(
        `🧌 Gnome Deployed!`,
        `${friendName} has been pranked!\n\n${mischief.message}`,
        [{ text: 'Mwahaha', onPress: () => {} }]
      );

      // Later: Send prank to Firestore or notifications

      setIsSending(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎁 Send a Gnome</Text>
      <Text style={styles.subtext}>Pick a friend to prank!</Text>

      <FlatList
        data={mockFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, isSending && { opacity: 0.6 }]}
            disabled={isSending}
            onPress={() => handleSendPrank(item.name)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.prankButton}>Send Gnome</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SendGnomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d1a', padding: 16 },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtext: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  name: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 6,
  },
  prankButton: {
    color: '#9f7aea',
    fontSize: 14,
    fontWeight: '500',
  },
});
