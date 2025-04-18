import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import usePlayerProgress from "../hooks/usePlayerProgress";
import { useRiftJournal }  from "../context/RiftJournalContext";

interface Rift {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
}

const mockRifts: Rift[] = [
  {
    id: "test001",
    title: "Debug Rift",
    latitude: 47.6062,
    longitude: -113.6123,
  },

  {
    id: "rift002",
    title: "Shattered Vale",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: "rift003",
    title: "Wailing Hollow",
    latitude: 37.7762,
    longitude: -122.4173,
  },
];

export default function HomeScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [userCoords, setUserCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [nearbyRift, setNearbyRift] = useState<Rift | null>(null);

  const { level, xp, loot, addXP, generateLoot, levelUpPopup, dismissPopup } =
    usePlayerProgress();

    const { addEntry } = useRiftJournal();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location access is required to track rifts."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      console.log("🧭 My current coords:", coords);

      setUserCoords(coords);
      setRegion({
        ...coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setNearbyRift(null); // Reset during testing

      for (const rift of mockRifts) {
        const distance = getDistance(coords, {
          latitude: rift.latitude,
          longitude: rift.longitude,
        });

        if (distance < 5000) {
          setNearbyRift(rift);
          Alert.alert(
            "🌌 Rift Detected!",
            `You're near the ${rift.title}. Investigate?`
          );
          break;
        }
      }
    })();
  }, []);

  const handleInvestigate = (rift: Rift) => {
    const gainedXp = 25;
    const item = generateLoot();
    addXP(gainedXp);
  
    // 🌌 Log to journal
    addEntry({
      rift: rift.title,
      xp: gainedXp,
      loot: item.name,
      rarity: item.rarity,
    });
  
    Alert.alert(
      `🧭 Rift Explored: ${rift.title}`,
      `You gained ${gainedXp} XP and found:\n\n💎 ${item.name} (${item.rarity})`,
      [{ text: 'Close Rift', onPress: () => setNearbyRift(null) }]
    );
  };

  // Show level-up popup
  if (levelUpPopup) {
    Alert.alert("✨ LEVEL UP!", `You're now level ${level}!`, [
      { text: "Woohoo!", onPress: dismissPopup },
    ]);
  }

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation
          showsMyLocationButton
        >
          {mockRifts.map((rift) => (
            <Marker
              key={rift.id}
              coordinate={{
                latitude: rift.latitude,
                longitude: rift.longitude,
              }}
              title={`⚡ ${rift.title}`}
              description="Something stirs within..."
            />
          ))}
        </MapView>
      )}

      {nearbyRift && userCoords && (
        <View style={styles.riftCard}>
          <Text style={styles.riftTitle}>🌀 Rift Nearby!</Text>
          <Text style={styles.riftText}>
            The <Text style={{ fontWeight: "bold" }}>{nearbyRift.title}</Text>{" "}
            is within range.
          </Text>
          <Text style={[styles.riftText, { fontSize: 12 }]}>
            Your coords: {userCoords.latitude.toFixed(4)},{" "}
            {userCoords.longitude.toFixed(4)}
          </Text>

          <View style={styles.buttonWrapper}>
            <Text
              style={styles.investigateButton}
              onPress={() => handleInvestigate(nearbyRift)}
            >
              🔍 Investigate
            </Text>
          </View>

          <Text style={styles.statusText}>
            Lvl {level} | {xp} XP
          </Text>
          {loot && (
            <Text style={styles.lootText}>
              🎁 Loot: <Text style={{ fontWeight: "600" }}>{loot.name}</Text> (
              {loot.rarity})
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  riftCard: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: "#1e1e2f",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  riftTitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 6,
    fontWeight: "600",
  },
  riftText: {
    color: "#ccc",
    fontSize: 14,
  },
  buttonWrapper: {
    marginTop: 12,
    alignItems: "flex-start",
  },
  investigateButton: {
    backgroundColor: "#6b46c1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    overflow: "hidden",
  },
  statusText: {
    color: "#a0aec0",
    fontSize: 13,
    marginTop: 10,
  },
  lootText: {
    marginTop: 6,
    color: "#ffd700",
    fontSize: 14,
  },
});
