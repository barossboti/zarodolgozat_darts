import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NewGameScreen({ navigation }) {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

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
      Alert.alert('Hiba', 'Kérlek adj meg egy nevet!');
      return;
    }

    const updatedPlayers = [...players, { name: newPlayerName }];
    try {
      await AsyncStorage.setItem('players', JSON.stringify(updatedPlayers));
      setPlayers(updatedPlayers);
      setNewPlayerName('');
      setModalVisible(false);
      Alert.alert('Siker', 'Játékos sikeresen hozzáadva');
    } catch (error) {
      console.error('Error saving player:', error);
      Alert.alert('Hiba', 'Nem sikerült hozzáadni a játékost');
    }
  };

  const togglePlayerSelection = (playerName) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerName)
        ? prev.filter((name) => name !== playerName)
        : [...prev, playerName]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Entypo name="chevron-left" size={24} color="black" />
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.headerButton}>
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Players</Text>
      <Text style={styles.subtitle}>Choose at least one player or add a new one</Text>

      <ScrollView contentContainerStyle={styles.playersContainer}>
        {players.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.playerButton,
              selectedPlayers.includes(player.name) && styles.selectedPlayerButton,
            ]}
            onPress={() => togglePlayerSelection(player.name)}
          >
            <MaterialCommunityIcons name="account" size={32} color="black" />
            <Text style={styles.playerText}>{player.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => {
          if (selectedPlayers.length === 0) {
            Alert.alert('Hiba', 'Kérlek válassz legalább egy játékost!');
          } else {
            navigation.navigate('Order', { selectedPlayers });
          }
        }}
      >
  <Text style={styles.footerButtonText}>NEXT</Text>
  <Entypo name="chevron-right" size={24} color="black" />
</TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Player</Text>
            <TextInput
              style={styles.input}
              placeholder="Player Name"
              value={newPlayerName}
              onChangeText={setNewPlayerName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={addPlayer}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fff5',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eaf5e9',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin:5
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  playersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  playerButton: {
    backgroundColor: '#eaf5e9',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlayerButton: {
    backgroundColor: '#c3d7c3', 
  },
  playerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginTop: 5,
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3e7d3',
    paddingVertical: 10,
    borderRadius: 10,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#d3e7d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
