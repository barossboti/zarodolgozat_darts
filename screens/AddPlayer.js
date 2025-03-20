import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddPlayerScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const storedPlayers = await AsyncStorage.getItem('players');
      if (storedPlayers) {
        setPlayers(JSON.parse(storedPlayers));
      }
    } catch (error) {
      console.error('Error loading players:', error);
    }
  };

  const addPlayer = async () => {
    if (newPlayerName.trim() === '') {
      Alert.alert('Error!', 'Please enter a name!');
      return;
    }

    const updatedPlayers = [...players, { name: newPlayerName }];
    try {
      await AsyncStorage.setItem('players', JSON.stringify(updatedPlayers));
      setPlayers(updatedPlayers);
      setNewPlayerName('');
      Alert.alert('Success!', 'Player successfully added');
    } catch (error) {
      console.error('Error saving player:', error);
      Alert.alert('Error!', 'Failed to add player');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Player</Text>
      <TextInput
        style={styles.input}
        placeholder="Player Name"
        value={newPlayerName}
        onChangeText={setNewPlayerName}
      />
      <TouchableOpacity style={styles.button} onPress={addPlayer}>
        <Text style={styles.buttonText}>Add Player</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fff5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d3e7d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
