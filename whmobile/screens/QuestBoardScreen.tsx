import { mockQuests } from '../data/mockQuests';
import styles from './QuestBoard.styles';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function QuestBoardScreen() {
  return (
    <View style={styles.container}>
    <ScrollView
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
    >
    <View style={styles.content}>
        <Text style={styles.header}>
            Quest Board
        </Text>
        <Text style={styles.title}>
            What sounds interesting today?
        </Text>
        <Text style={styles.subtitle}>
            Pick something small, strange, creative or worth wandering towards. 
        </Text>
    </View>

    {mockQuests.map((quest) => (
          <View
            key={quest.id}
            style={styles.questCard}
          >
            <View style={styles.questTopRow}>
              <Text style={styles.questCategory}>
                {quest.category}
              </Text>

              <Text style={styles.questRealm}>
                {quest.realm}
              </Text>
            </View>

            <Text style={styles.questTitle}>
              {quest.title}
            </Text>

            <Text style={styles.questDescription}>
              {quest.description}
            </Text>

            <View style={styles.questMeta}>
              <Text style={styles.metaText}>
                {quest.difficulty}
              </Text>

              <Text style={styles.xpText}>
                +{quest.xp} XP
              </Text>
            </View>

            <TouchableOpacity
              style={styles.questButton}
              onPress={() => {
                console.log(
                  `Selected quest: ${quest.title}`
                );
              }}
            >
              <Text style={styles.questButtonText}>
                View Quest
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}