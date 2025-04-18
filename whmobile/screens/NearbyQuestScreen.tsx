import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useOctaviaQuest } from "../hooks/useOcativiaQuest";
import usePlayerProgress  from "../hooks/usePlayerProgress";
import OctaviaModal from "../components/modals/OctaviaModal";
import ShardScanner from "../components/mechanics/ShardScanner"
import { unlockCodexFragment } from "../helpers/codexHelpers";
import { sendLoungeWhisper } from "../helpers/loungeHelpers";

interface Portal {
  id: string;
  name: string;
  distance: string;
  status: string;
}

const mockPortals: Portal[] = [
  {
    id: "p001",
    name: "🌀 Hidden Hollow Rift",
    distance: "0.3 miles",
    status: "Active now!",
  },
  {
    id: "p002",
    name: "⚡ Static Veil Node",
    distance: "1.1 miles",
    status: "Distorted timeline",
  },
  {
    id: "p003",
    name: "🔮 Echoing Mirror Gate",
    distance: "2.5 miles",
    status: "Low resonance",
  },
];

const NearbyScreen = () => {
  const [scanning, setScanning] = useState(false);
  const [portals, setPortals] = useState<Portal[]>([]);
  const [cooldown, setCooldown] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showShardScanner, setShowShardScanner] = useState(false);

  const quest = useOctaviaQuest();
  const { xp, addXP, generateLoot } = usePlayerProgress();

  const hasCompletedGuildScroll = true; // replace with real logic

  const meetsRequirements = () => {
    return (
      quest &&
      xp >= quest.requirements.xp &&
      hasCompletedGuildScroll === quest.requirements.completeGuildScroll
    );
  };

  // Cooldown countdown
  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleScan = () => {
    setScanning(true);
    setPortals([]);

    setTimeout(() => {
      setPortals(mockPortals);
      setCooldown(100);
      setScanning(false);
    }, 2000);
  };

  const handleAcceptQuest = () => {
    if (!quest) return;
    addXP(quest.rewards.xp);
    generateLoot();
    setShowModal(true);
    setShowShardScanner(true);
  };

  const handleShardComplete = async () => {
    const user = getAuth().currentUser;
    if (user) {
      await unlockCodexFragment(user.uid, "octavia_activation");
      await sendLoungeWhisper(
        "She’s stabilizing. The Codex breathes again.",
        user.uid
      );
    }
    Alert.alert("✨ Lore Unlocked!", "Octavia's Codex fragment has been revealed.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Scan for Portal Activity</Text>

      {/* Echo Protocol Quest */}
      {quest && meetsRequirements() && (
        <View style={styles.questBox}>
          <Text style={styles.questTitle}>📡 Story Anomaly Detected</Text>
          <Text style={styles.questSubtitle}>{quest.title}</Text>
          <Text style={styles.questDescription}>{quest.description}</Text>

          <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptQuest}>
            <Text style={styles.acceptText}>Accept Quest</Text>
          </TouchableOpacity>
        </View>
      )}

      {showShardScanner && <ShardScanner onComplete={handleShardComplete} />}

      {/* Octavia Modal */}
      <OctaviaModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        lines={
          quest?.hologramMessage ?? [
            "Initializing memory cascade...",
            "If you're seeing this... I'm still alive.",
            "Follow the fragments. Stabilize the Rift.",
          ]
        }
      />

      <TouchableOpacity
        style={[styles.scanButton, (cooldown > 0 || scanning) && { opacity: 0.6 }]}
        onPress={handleScan}
        disabled={cooldown > 0 || scanning}
      >
        <Text style={styles.scanText}>
          {scanning ? "Scanning..." : cooldown > 0 ? `Cooldown: ${cooldown}s` : "Begin Scan"}
        </Text>
      </TouchableOpacity>

      {scanning && (
        <View style={styles.scanningBox}>
          <ActivityIndicator size="large" color="#9f7aea" />
          <Text style={styles.scanMessage}>Casting detection spells...</Text>
        </View>
      )}

      {portals.length > 0 && (
        <FlatList
          data={portals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.portalCard}>
              <Text style={styles.portalName}>{item.name}</Text>
              <Text style={styles.portalDetails}>📍 {item.distance}</Text>
              <Text style={styles.portalStatus}>🕒 {item.status}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}
    </View>
  );
};

export default NearbyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c0c18", padding: 16 },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  scanButton: {
    backgroundColor: "#6b46c1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  scanText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  scanningBox: {
    alignItems: "center",
    marginVertical: 24,
  },
  scanMessage: {
    color: "#bcbcff",
    marginTop: 12,
    fontSize: 14,
    fontStyle: "italic",
  },
  portalCard: {
    backgroundColor: "#1e1e2f",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  portalName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  portalDetails: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 4,
  },
  portalStatus: {
    color: "#9f7aea",
    fontSize: 14,
    marginTop: 2,
  },
  questBox: {
    backgroundColor: "#041a25",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: "#4fd1c5",
    borderWidth: 1,
  },
  questTitle: {
    fontSize: 16,
    color: "#4fd1c5",
    fontWeight: "bold",
    marginBottom: 4,
  },
  questSubtitle: {
    fontSize: 18,
    color: "#f0fdf4",
    fontWeight: "700",
    marginBottom: 8,
  },
  questDescription: {
    fontSize: 14,
    color: "#cbd5e1",
    marginBottom: 12,
  },
  acceptButton: {
    backgroundColor: "#319795",
    paddingVertical: 10,
    borderRadius: 8,
  },
  acceptText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
