// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView,TouchableOpacity } from 'react-native';
import styles from './HomeScreen.styles';

export default function HomeScreen() {
  return(
    <View style={styles.container}> 
    <ScrollView
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>
          WHIMLORE
        </Text>

        <Text style={styles.title}>
          Welcome back, Realmwalker 
        </Text>

        <Text style={styles.subtitle}>
          Something ordinary is waiting to become interesting...
        </Text>
      </View>
      {/* Today's Spark */}
        <View style={styles.featureCard}>
          <Text style={styles.cardEyebrow}>
            ✦ TODAY'S SPARK
          </Text>

          <Text style={styles.featureTitle}>
            Take the long way
          </Text>

          <Text style={styles.cardText}>
            The next time you head somewhere familiar,
            choose a route you normally ignore.
          </Text>

          <View style={styles.rewardRow}>
            <Text style={styles.rewardText}>
              +20 XP
            </Text>

            <Text style={styles.difficultyText}>
              Easy
            </Text>
          </View>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              View Quest
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quest Board */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionIcon}>🗺️</Text>

            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>
                Quest Board
              </Text>

              <Text style={styles.cardText}>
                New adventures are waiting.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              
              Browse Quests
            </Text>
          </TouchableOpacity>
        </View>

        {/* Camp */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionIcon}>⛺</Text>

            <View style={styles.cardHeaderText}>
              <Text style={styles.cardTitle}>
                Your Camp
              </Text>

              <Text style={styles.cardText}>
                Quiet for now. Probably suspiciously quiet.
              </Text>
            </View>
          </View>

          <Text style={styles.placeholder}>
            Camp coming soon
          </Text>
        </View>

        {/* Octavia */}
        <View style={styles.whisperCard}>
          <Text style={styles.cardEyebrow}>
            OCTAVIA'S WHISPER
          </Text>

          <Text style={styles.whisperText}>
            “There are places you have passed a hundred
            times without ever really seeing them.”
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

