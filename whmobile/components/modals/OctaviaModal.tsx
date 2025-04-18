import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  lines: string[];
}

const OctaviaModal: React.FC<Props> = ({ visible, onClose, lines }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>[ OCTAVIA PROTOCOL: LIVE ]</Text>
          {lines.map((line, index) => (
            <Text key={index} style={styles.line}>
              {line}
            </Text>
          ))}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close Transmission</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OctaviaModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(3, 6, 15, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#0e1c2f',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    borderColor: '#4fd1c5',
    borderWidth: 1,
    elevation: 10,
  },
  header: {
    color: '#63e6be',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  line: {
    color: '#e0f2f1',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#319795',
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
