// File: src/components/LoadingPortal.tsx
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';

interface LoadingPortalProps {
  visible: boolean;
  message?: string;
}

const LoadingPortal: React.FC<LoadingPortalProps> = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color="#7c3aed" />
          {message ? <Text style={styles.text}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

export default LoadingPortal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#1f1f2f',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});
