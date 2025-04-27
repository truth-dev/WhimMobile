import { View, Text, StyleSheet } from 'react-native';

export default function WhimMarketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 WhimMarket - Coming Soon! 🌟</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f1a' },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});
