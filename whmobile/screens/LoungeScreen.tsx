// src/screens/LoungeScreen.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { auth, db } from "../firebase";  // native RN-Firebase instances
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { GUILD_COLORS } from '../constants/guilds';

interface LoungeMessage {
  id: string;
  text: string;
  authorName: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  guild: string;
  mood?: string;
  role?: string;
  userId?: string;
}

export default function LoungeScreen() {
  const [messages, setMessages] = useState<LoungeMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [riddleMode, setRiddleMode] = useState(false);
  const [castingUserId, setCastingUserId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const user = auth.currentUser;  // native auth instance

  useEffect(() => {
    // Build a query on the native Firestore instance
    const q = db
      .collection('loungeMessages')
      .orderBy('createdAt', 'asc');

    const unsubscribe = q.onSnapshot(snapshot => {
      const msgList = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<LoungeMessage, 'id'>)
      }));
      setMessages(msgList);
      scrollRef.current?.scrollToEnd({ animated: true });
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!user || newMessage.trim() === "") return;

    await db.collection('loungeMessages').add({
      text:        newMessage.trim(),
      authorName:  user.displayName || 'Mysterious Mage',
      userId:      user.uid,
      createdAt:   firestore.FieldValue.serverTimestamp(),
      mood:        '🌙',
      guild:       'ChronoGuard',
      role:        'Lorekeeper',
    });

    setNewMessage("");
    setCastingUserId(null);
  };

  const obscureMessage = (text: string) =>
    text
      .split(' ')
      .map(word =>
        word.length > 2
          ? word[0] + '*'.repeat(word.length - 2) + word[word.length - 1]
          : '*'.repeat(word.length)
      )
      .join(' ');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>🧩 Riddle Mode</Text>
        <Button
          title={riddleMode ? 'On' : 'Off'}
          color={riddleMode ? '#a78bfa' : '#444'}
          onPress={() => setRiddleMode(!riddleMode)}
        />
      </View>

      <ScrollView
        style={styles.messages}
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              castingUserId === msg.userId && styles.castingHighlight
            ]}
          >
            <View style={styles.messageHeader}>
              <View
                style={[
                  styles.guildDot,
                  { backgroundColor: GUILD_COLORS[msg.guild] || '#888' }
                ]}
              />
              <Text style={[styles.author, { color: GUILD_COLORS[msg.guild] || '#fff' }]}>  
                [{msg.role || 'Adventurer'}] {msg.authorName} {msg.mood || ''}
              </Text>
            </View>
            <Text style={styles.messageText}>
              {riddleMode ? obscureMessage(msg.text) : msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Speak, friend, and enter..."
          placeholderTextColor="#aaa"
          value={newMessage}
          onChangeText={text => {
            setNewMessage(text);
            setCastingUserId(user?.uid || null);
          }}
          style={styles.input}
          onBlur={() => setCastingUserId(null)}
        />
        <Button title="Send" onPress={sendMessage} color="#a78bfa" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  messages: { padding: 10 },
  messageBubble: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  castingHighlight: {
    shadowColor: '#a78bfa',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    borderColor: '#a78bfa',
    borderWidth: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  guildDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  messageText: { color: '#eee', paddingLeft: 16 },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1a1a1a',
  },
  toggleLabel: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
