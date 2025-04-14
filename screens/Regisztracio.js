import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import Ip from '../Ip';

// Emoji regex to detect emojis
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2764}\u{FE0F}]/gu;

// Password validation regex (minimum 8 characters, at least one uppercase, one number, one special character)
const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Regisztracio({ navigation }) {
  const [felhasznaloNev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [jelszo2, setJelszo2] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validate inputs and check for emojis
  const validateInputs = () => {
    if (emojiRegex.test(felhasznaloNev) || emojiRegex.test(jelszo) || emojiRegex.test(jelszo2)) {
      setErrorMessage('Username and password cannot contain emojis!');
      setShowModal(true);
      return false;
    }

    if (!felhasznaloNev || !jelszo || !jelszo2) {
      setErrorMessage('Fields cannot be empty!');
      setShowModal(true);
      return false;
    }

    if (jelszo !== jelszo2) {
      setErrorMessage('The two passwords do not match!');
      setShowModal(true);
      return false;
    }

    // Check password strength
    if (!passwordStrengthRegex.test(jelszo)) {
      setErrorMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character!');
      setShowModal(true);
      return false;
    }

    return true;
  };

  const regisztralasFv = async () => {
    if (validateInputs()) {
      const adatok = {
        bevitel1: felhasznaloNev,
        bevitel2: jelszo,
      };

      try {
        const response = await fetch(Ip.Ipcim + 'regisztracio', {
          method: 'POST',
          body: JSON.stringify(adatok),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const result = await response.text();
        alert(result);
        if (result === 'Successful registration!') {
          navigation.navigate('Beleptetes');
        }
      } catch (error) {
        setErrorMessage('An error occurred during registration.');
        setShowModal(true);
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registration</Text>

      <TextInput
        style={styles.input}
        onChangeText={setFelhasznalonev}
        placeholder="Username"
        value={felhasznaloNev}
      />
      <TextInput
        style={styles.input}
        onChangeText={setJelszo}
        placeholder="Password"
        value={jelszo}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setJelszo2}
        placeholder="Confirm Password"
        value={jelszo2}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={regisztralasFv}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Modal for error messages */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Pressable
              style={[
                styles.modalButton,
                { backgroundColor: '#1E441E', marginHorizontal: 11, padding: 10, borderRadius: 5, alignItems: 'center' }
              ]}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    width: '80%',
    backgroundColor: '#1B3F1B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Modal styles for error messages
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B3F1B',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
