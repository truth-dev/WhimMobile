import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur'; // fancy blur background

// Screens
import HomeScreen from '../screens/HomeScreen';
import LoungeScreen from '../screens/LoungeScreen';
import NearbyQuestScreen from '../screens/NearbyQuestScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RiftJournalScreen from '../screens/RiftJournalScreen';
import WhimMarketScreen from '../screens/WhimMarketScreen'; // 🛍️ NEW!
import RuneWheelButton from '../components/RuneWheelButton';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarBackground: () => (
          <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Lounge') iconName = 'chatbubble-ellipses-outline';
          if (route.name === 'QuestAtlas') iconName = 'compass-outline';
          if (route.name === 'RiftJournal') iconName = 'book-outline';
          if (route.name === 'Sanctum') iconName = 'person-circle-outline';
          if (route.name === 'WhimMarket') iconName = 'cart-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#a78bfa',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          backgroundColor: 'rgba(31, 31, 41, 0.9)',
          borderRadius: 24,
          height: 70,
          paddingBottom: 8,
          borderTopColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <RuneWheelButton /> {/* Floating button for the portal */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Lounge" component={LoungeScreen} />
      <Tab.Screen name="QuestAtlas" component={NearbyQuestScreen} />
      <Tab.Screen name="RiftJournal" component={RiftJournalScreen} />
      <Tab.Screen name="Sanctum" component={ProfileScreen} />
      <Tab.Screen name="WhimMarket" component={WhimMarketScreen} />
    </Tab.Navigator>
    
  );
}
