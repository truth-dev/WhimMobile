import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAuth } from '../../shared-auth/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { submitOnboardingProfile } from '../../utils/firestoreaddhelper';


const MAX_MOTTO_LENGTH = 100;

const JoinTheRealm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [selectedGuild, setSelectedGuild] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [motto, setMotto] = useState('');




  

 const handleSaveProfile = async () => {
  if (!user) {
    return Alert.alert(
      'Error',
      'You must be logged in.'
    );
  }

  if (
    !username ||
    !selectedGuild ||
    !selectedAvatar
  ) {
    return Alert.alert(
      'Missing Info',
      'Please complete all steps.'
    );
  }

  try {
    await submitOnboardingProfile({
      uid: user.uid,
      username,
      guild: selectedGuild,
      motto,
      avatarId: selectedAvatar,
      mood: 'whimsical',
    });

    /*
      Don't manually navigate here.

      RootNavigator is watching users/{uid}.
      Once this document exists with profileComplete=true,
      RootNavigator should automatically switch to Tabs.
    */
  } catch (err) {
    console.error(
      '🔥 Error completing onboarding!:',
      err
    );

    Alert.alert(
      'Error',
      'Something went wrong saving your profile.'
    );
  }
};

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>Step 1: Choose Your Name</Text>
          <Text style={styles.subtitle}>What shall the scrolls call you?</Text>
          <TextInput
            placeholder="Enter your realm name"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
            <Text style={styles.buttonText}>Next ➡️</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Step 2: Choose Your Guild</Text>
          <Text style={styles.subtitle}>Where does your spirit align?</Text>
          {[
            { id: 'mythicforge', label: '🛠️ MythicForge', desc: 'Tinkerers, builders, and tech wizards.' },
            { id: 'spellweavers', label: '✨ SpellWeavers', desc: 'Writers, artists, and dream-coders.' },
            { id: 'arcadecoven', label: '🎮 ArcadeCoven', desc: 'Gamers, rebels, and chaotic casters.' },
            { id: 'chronoguard', label: '⏳ ChronoGuard', desc: 'Lorekeepers, scholars, and time mages.' },
          ].map((guild) => (
            <TouchableOpacity
              key={guild.id}
              style={[
                styles.guildCard,
                selectedGuild === guild.id && styles.selectedGuildCard,
              ]}
              onPress={() => setSelectedGuild(guild.id)}
            >
              <Text style={styles.guildLabel}>{guild.label}</Text>
              <Text style={styles.guildDesc}>{guild.desc}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.button, !selectedGuild && { opacity: 0.6 }]}
            onPress={() => selectedGuild && setStep(3)}
            disabled={!selectedGuild}
          >
            <Text style={styles.buttonText}>Next ➡️</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
  <>
    <Text style={styles.title}>Step 3: Select Your Avatar</Text>
    <Text style={styles.subtitle}>
      Who do you appear as in the Realms?
    </Text>

    <View style={styles.avatarGrid}>
      {[
        { id: 'wizard1', icon: '🧙', label: 'Wizard' },
        { id: 'knight1', icon: '🛡️', label: 'Knight' },
        { id: 'healer1', icon: '🌿', label: 'Healer' },
        { id: 'ninja1', icon: '🥷', label: 'Ninja' },
      ].map((avatar) => (
        <TouchableOpacity
          key={avatar.id}
          onPress={() => setSelectedAvatar(avatar.id)}
          style={[
            styles.avatarOption,
            selectedAvatar === avatar.id && styles.selectedAvatar,
          ]}
        >
          <Text style={styles.avatarIcon}>
            {avatar.icon}
          </Text>

          <Text style={styles.avatarLabel}>
            {avatar.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <TouchableOpacity
      style={[
        styles.button,
        !selectedAvatar && { opacity: 0.6 },
      ]}
      onPress={() => setStep(4)}
      disabled={!selectedAvatar}
    >
      <Text style={styles.buttonText}>Next ➡️</Text>
    </TouchableOpacity>
  </>
)}

      {step === 4 && (
        <>
          <Text style={styles.title}>Step 4: Your Motto</Text>
          <Text style={styles.subtitle}>Let the realm know your vibe.</Text>
          <TextInput
            placeholder="e.g., The stars whisper my name..."
            value={motto}
            onChangeText={setMotto}
            maxLength={MAX_MOTTO_LENGTH}
            multiline
            style={styles.input}
            placeholderTextColor="#aaa"
          />
          <Text style={styles.counter}>{motto.length}/{MAX_MOTTO_LENGTH}</Text>

          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>✨ Finish Setup</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default JoinTheRealm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1f1f2f',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  guildCard: {
    backgroundColor: '#1f1f2f',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGuildCard: {
    borderColor: '#7c3aed',
  },
  guildLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  guildDesc: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 20,
  },
 avatarOption: {
  width: '47%',
  minHeight: 110,
  marginBottom: 12,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#33334a',
  backgroundColor: '#1f1f2f',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 12,
},
avatarIcon: {
  fontSize: 42,
  marginBottom: 8,
},

avatarLabel: {
  color: '#fff',
  fontSize: 15,
  fontWeight: '600',
},
  selectedAvatar: {
    borderColor: '#7c3aed',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  counter: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
  },
});
