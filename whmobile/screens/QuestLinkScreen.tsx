import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { createLinkedQuest } from '../utils/questLinkHelpers';

const mockFriends = [
  { id: '1', name: 'MysticMoth' },
  { id: '2', name: 'WaffleKnight' },
  { id: '3', name: 'CrimsonJelly' },
];

const mockQuests = [
  { id: 'q1', title: 'Cleanse the Forgotten Fountain' },
  { id: 'q2', title: 'Deliver the Enchanted Mail' },
  { id: 'q3', title: 'Help a Gnome File His Taxes' },
];

const QuestLinkScreen = () => {
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState('');

  const handleSendInvite = async () => {
    if (!selectedQuest || !selectedFriend) {
      Alert.alert('Hold up!', 'Please select a friend and a quest first.');
      return;
    }

    // Replace with actual user UID later
    const myUid = 'test-user-001';
    const friendUid = selectedFriend;

    const questData = mockQuests.find((q) => q.id === selectedQuest);
    const questTitle = questData?.title || '';

    try {
      await createLinkedQuest(selectedQuest, questTitle, myUid, friendUid);
      Alert.alert('QuestLink Sent!', 'Your friend has been invited to your quest.');
      setSelectedQuest(null);
      setSelectedFriend(null);
    } catch (err) {
      console.error('Error sending QuestLink:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔗 QuestLink</Text>
      <Text style={styles.section}>1. Choose a friend:</Text>
      <FlatList
        horizontal
        data={mockFriends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.friendCard,
              item.id === selectedFriend && styles.selectedCard,
            ]}
            onPress={() => setSelectedFriend(item.id)}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.section}>2. Pick a quest:</Text>
      <FlatList
        horizontal
        data={mockQuests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.questCard,
              item.id === selectedQuest && styles.selectedCard,
            ]}
            onPress={() => setSelectedQuest(item.id)}
          >
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendInvite}>
        <Text style={styles.sendText}>🎁 Send QuestLink</Text>
      </TouchableOpacity>

      <Text style={styles.section}>3. Join by Quest Code:</Text>
      <TextInput
        style={styles.input}
        value={joinCode}
        onChangeText={setJoinCode}
        placeholder="Enter Quest Code"
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinText}>🌀 Join Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestLinkScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1c', padding: 16 },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    color: '#aaa',
    fontSize: 14,
    marginVertical: 8,
  },
  friendCard: {
    backgroundColor: '#1a1a2f',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  questCard: {
    backgroundColor: '#1f1f35',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedCard: {
    borderColor: '#9f7aea',
    borderWidth: 2,
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#6b46c1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#4141a5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinText: {
    color: '#fff',
    fontWeight: '600',
  },
});
