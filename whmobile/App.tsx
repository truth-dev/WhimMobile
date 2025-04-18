import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from 'react-native';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { RiftJournalProvider } from './context/RiftJournalContext';
import { UserProvider } from './context/UserContext';


export default function App() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <UserProvider>
        <RiftJournalProvider>
          <RootNavigator />
        </RiftJournalProvider>
        </UserProvider>
   
      </ThemeProvider>
      
    </GestureHandlerRootView>
  );
}
