import React, { useEffect } from 'react';
import {  Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Galaxy from '../../assets/images/galaxy.png';
import SparkleTrail from '../../assets/animations/stars.json'
const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = React.useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fade out first
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Tabs'); // Move to main app/home after fade
      });
    }, 4000); // 4 seconds of sparkle magic before fade

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
   <ImageBackground
  source={Galaxy}
  style={styles.background}
  resizeMode="cover"
>
  <Text style={styles.title}>🌟 Welcome to the Realm, Adventurer</Text>
  <Text style={styles.subtitle}>Your journey begins now...</Text>

  <LottieView
    source={SparkleTrail}
    autoPlay
    loop
    style={styles.sparkles}
  />
</ImageBackground>

    </Animated.View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  sparkles: {
    width: 300,
    height: 300,
  },
});
