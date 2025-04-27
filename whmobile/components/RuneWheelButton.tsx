import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated, Easing, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import { Audio } from 'expo-av';
import { BlurView } from 'expo-blur';

const RuneWheelButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [expanded, setExpanded] = useState(false);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // useEffect(() => {
  //   // load portal sound
  //   const loadSound = async () => {
  //     const { sound } = await Audio.Sound.createAsync(
  //       require('/assets/sounds/wheelopening') // 🎵 You will need a small sound file
  //     );
  //     setSound(sound);
  //   };

  //   loadSound();
  //   return () => {
  //     sound?.unloadAsync();
  //   };
  // }, []);

  const toggleExpand = async () => {
    setExpanded(!expanded);
  
    Animated.timing(expandAnim, {
      toValue: expanded ? 0 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  
    try {
      if (!expanded && sound) {
        await sound.replayAsync();
      }
    } catch (err) {
      console.error('⚠️ Failed to play portal sound:', err);
    }
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const portalOptions = [
    { icon: 'bag-handle-outline', route: 'WhimMarket' },
    { icon: 'book-outline', route: 'RiftJournal' },
    { icon: 'location-outline', route: 'Nearby' },
  ];

  const getPortalPosition = (index: number) => {
    const angle = (index / portalOptions.length) * Math.PI * 2;
    const radius = 100;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {expanded && (
        <BlurView intensity={50} style={StyleSheet.absoluteFillObject} tint="dark" />
      )}

      <View style={styles.container}>
        {portalOptions.map((option, index) => {
          const { x, y } = getPortalPosition(index);
          return (
            <Animated.View
              key={option.route}
              style={[
                styles.portalRune,
                {
                  transform: [
                    { translateX: expandAnim.interpolate({ inputRange: [0, 1], outputRange: [0, x] }) },
                    { translateY: expandAnim.interpolate({ inputRange: [0, 1], outputRange: [0, y] }) },
                    { scale: expandAnim },
                  ],
                  opacity: expandAnim,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.runeButton}
                onPress={() => {
                  setExpanded(false);
                  navigation.navigate(option.route as keyof RootStackParamList);
                }}
              >
                <Ionicons name={option.icon as any} size={24} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <TouchableOpacity style={styles.button} onPress={toggleExpand} activeOpacity={0.8}>
          <Animated.View style={{ transform: [{ rotate: spin }, { scale: pulseAnim }] }}>
            <Ionicons name="sparkles" size={36} color="#a78bfa" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RuneWheelButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    zIndex: 100,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1e1e2f',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a78bfa',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
  portalRune: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#3b3b5c',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a78bfa',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  runeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
