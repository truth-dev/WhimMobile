import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


const RealmloadingScreen = () => {

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#7c3aed" />
            <Text style={styles.text}>✨ Peeking into the Realms...</Text>
        </View>
    )
}

export default RealmloadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1a',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        color: '#fff',
        fontSize: 18,
        marginTop: 20,
    },

});