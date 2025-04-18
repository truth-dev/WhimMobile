import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRiftJournal } from '../context/RiftJournalContext';

const RiftJournalScreen = () => {
  const { entries, clearJournal } = useRiftJournal();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📜 Rift Journal</Text>

      {entries.length === 0 ? (
        <Text style={styles.empty}>No rift entries yet... seek the unknown!</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>🌌 {item.rift}</Text>
              <Text style={styles.details}>+{item.xp} XP | 💎 {item.loot} ({item.rarity})</Text>
              <Text style={styles.timestamp}>📅 {formatDate(item.timestamp)}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity onPress={clearJournal} style={styles.clearButton}>
        <Text style={styles.clearText}>🧹 Clear Journal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RiftJournalScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d1a', padding: 16 },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  empty: {
    color: '#aaa',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  details: {
    color: '#c0afff',
    fontSize: 14,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginTop: 6,
  },
  clearButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#6b46c1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
