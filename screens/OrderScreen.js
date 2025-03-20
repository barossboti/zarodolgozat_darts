import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrderScreen({ navigation, route }) {
  const { selectedPlayers } = route.params;
  const [startingPlayer, setStartingPlayer] = useState(selectedPlayers[0]);
  const [sets, setSets] = useState(1); // Default value for sets
  const [legs, setLegs] = useState(1); // Default value for legs

  const selectStartingPlayer = (player) => {
    setStartingPlayer(player);
  };

  const handleSetsIncrement = () => {
    setSets((prevSets) => prevSets + 1);
  };

  const handleSetsDecrement = () => {
    setSets((prevSets) => (prevSets > 1 ? prevSets - 1 : 1));
  };

  const handleLegsIncrement = () => {
    setLegs((prevLegs) => prevLegs + 1);
  };

  const handleLegsDecrement = () => {
    setLegs((prevLegs) => (prevLegs > 1 ? prevLegs - 1 : 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Entypo name="chevron-left" size={24} color="#000000" />
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Order</Text>
      <Text style={styles.subtitle}>
        Tap a player to choose who starts the game. The player closest to the bullseye will begin.
      </Text>

      <ScrollView contentContainerStyle={styles.playersContainer}>
        {selectedPlayers.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.playerCard,
              startingPlayer === player && styles.selectedPlayerCard,
            ]}
            onPress={() => selectStartingPlayer(player)}
          >
            <MaterialCommunityIcons name="account" size={32} color="#000000" />
            <Text style={styles.playerText}>{player}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.settingsTitle}>Choose how many sets and legs you want to play</Text>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <TouchableOpacity onPress={handleSetsDecrement}>
            <Entypo name="minus" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.settingCircle}>
            <Text style={styles.settingText}>{sets}</Text>
          </View>
          <TouchableOpacity onPress={handleSetsIncrement}>
            <Entypo name="plus" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.settingLabel}>Sets</Text>
        </View>
        <View style={styles.settingItem}>
          <TouchableOpacity onPress={handleLegsDecrement}>
            <Entypo name="minus" size={24} color="#000000" />
          </TouchableOpacity>
          <View style={styles.settingCircle}>
            <Text style={styles.settingText}>{legs}</Text>
          </View>
          <TouchableOpacity onPress={handleLegsIncrement}>
            <Entypo name="plus" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.settingLabel}>Legs</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => {
          navigation.navigate('GameScreen', { startingPlayer, sets, legs, selectedPlayers });
        }}
      >
        <Text style={styles.footerButtonText}>GAME ON!</Text>
        <Entypo name="chevron-right" size={24} color="#000000" />
      </TouchableOpacity>
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
    alignItems: 'center',
    backgroundColor: '#eaf5e9',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    margin: 5,
    marginTop: 40,
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
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  settingItem: {
    alignItems: 'center',
  },
  settingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d3e7d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  settingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  settingLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  playersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  playerCard: {
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
  selectedPlayerCard: {
    backgroundColor: '#c3d7c3',
    borderWidth: 2,
    borderColor: '#4CAF50',
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
});
