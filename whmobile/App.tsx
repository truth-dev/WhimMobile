import React from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import RootNavigator from './navigation/RootNavigator';
import { UserProvider } from './context/UserContext';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <UserProvider>
          <RootNavigator />
        </UserProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}