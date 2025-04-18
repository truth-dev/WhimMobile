
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';


//screens 
import HomeScreen from '../screens/HomeScreen';
import LoungeScreen from '../screens/LoungeScreen';
import NearbyQuestScreen from '../screens/NearbyQuestScreen';
import ProfileScreen from '../screens/ProfileScreen'; 
import RiftJournalScreen from '../screens/RiftJournalScreen';
import SendGnomeScreen from '../screens/SendGnomeScreen';
import QuestLinkScreen from '../screens/QuestLinkScreen';
// import SettingsScreen from '../screens/SettingsScreen';




const Tab = createBottomTabNavigator();

export default function BottomTabNavigator(){

    return (
       
            <Tab.Navigator initialRouteName="Home" screenOptions={({ route}) => ({
                headerShown:false,
                tabBarIcon:({color, size}) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
                    if(route.name === 'Home') iconName = 'home-outline';
                    if(route.name === 'Lounge') iconName = 'chatbubble-ellipses-outline';
                    if (route.name === 'Nearby') iconName = 'compass-outline';
                    if(route.name === 'Profile') iconName = 'person-outline';
                    // if(route.name === 'Settings') iconName = 'settings-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#a78bfa',
                tabBarInactiveTintColor: '#aaa',
                tabBarStyle: {
                  backgroundColor: '#1e1e1e',
                  borderTopColor: '#333',
                  paddingBottom: 4,
                  height: 60,
                },
                tabBarLabelStyle: {
                  fontSize: 12,
                },
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Lounge" component={LoungeScreen} />
              <Tab.Screen name="Nearby" component={NearbyQuestScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
              <Tab.Screen name="Journal" component={RiftJournalScreen} />
              <Tab.Screen name="SendGnome" component={SendGnomeScreen} />
              <Tab.Screen name="QuestLink" component={QuestLinkScreen} />
              {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}

            </Tab.Navigator>
          
    )
}
 
