import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Regisztracio({ navigation }) {
  const [felhasznaloNev, setFelhasznalonev] = useState('');
  const [jelszo, setJelszo] = useState('');
  const [jelszo2, setJelszo2] = useState('');

  const regisztralasFv = async () => {
    if (jelszo !== jelszo2) {
      alert('A két jelszó nem egyezik!');
    } else {
      const adatok = {
        bevitel1: felhasznaloNev,
        bevitel2: jelszo,
      };

      try {
        const response = await fetch('http://192.168.10.65:3000/regisztracio', {
          method: 'POST',
          body: JSON.stringify(adatok),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        const result = await response.text();
        alert(result);
        if (result === 'Sikeres regisztráció!') {
          navigation.navigate('Beleptetes');
        }
      } catch (error) {
        alert('Hiba történt a regisztráció során.');
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Regisztráció</Text>

      <TextInput
        style={styles.input}
        onChangeText={setFelhasznalonev}
        placeholder="Felhasználónév"
        value={felhasznaloNev}
      />
      <TextInput
        style={styles.input}
        onChangeText={setJelszo}
        placeholder="Jelszó"
        value={jelszo}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setJelszo2}
        placeholder="Jelszó még egyszer"
        value={jelszo2}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={regisztralasFv}>
        <Text style={styles.buttonText}>Regisztrálás</Text>
      </TouchableOpacity>
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
});
