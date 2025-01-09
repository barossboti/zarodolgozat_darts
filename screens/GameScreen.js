import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

export default function GameScreen({ route, navigation }) {
  const { startingPlayer, selectedPlayers, sets, legs } = route.params;

  const initialPlayerStats = {
    score: 501,
    dartsThrown: 0,
    legsWon: 0,
    setsWon: 0,
    highestCheckout: 0,
    totalPoints: 0, // Pontszám az átlaghoz
  };

  const [playerStats, setPlayerStats] = useState(
    Object.fromEntries(selectedPlayers.map((player) => [player, { ...initialPlayerStats }]))
  );

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(
    selectedPlayers.indexOf(startingPlayer)
  );
  const [inputValue, setInputValue] = useState(0);
  const [history, setHistory] = useState([]);

  const calculateAverage = (player) => {
    const stats = playerStats[player];
    return stats.dartsThrown > 0
      ? ((stats.totalPoints / stats.dartsThrown) * 3).toFixed(2)
      : "0.00";
  };

  const handleNumberPress = (number) => {
    const newValue = parseInt(`${inputValue}${number}`);
    if (newValue <= 180) {
      setInputValue(newValue);
    }
  };

  const handleBackspace = () => {
    setInputValue(Math.floor(inputValue / 10));
  };

  const handleSubmit = () => {
    const currentPlayer = selectedPlayers[currentPlayerIndex];

    setPlayerStats((prevStats) => {
      const updatedStats = { ...prevStats };
      const currentStats = updatedStats[currentPlayer];
      const newScore = Math.max(currentStats.score - inputValue, 0);

      setHistory([
        ...history,
        { player: currentPlayer, prevScore: currentStats.score, input: inputValue },
      ]);

      currentStats.score = newScore;
      currentStats.dartsThrown += 3;
      currentStats.totalPoints += inputValue;

      if (newScore === 0) {
        currentStats.legsWon += 1;
        currentStats.highestCheckout = Math.max(currentStats.highestCheckout, inputValue);

        if (currentStats.legsWon >= legs) {
          if (sets === 1 || currentStats.setsWon + 1 >= sets) {
            Alert.alert(
              "Game Over",
              `${currentPlayer} wins the game! Do you want to save your results?`,
              [
                {
                  text: "Yes",
                  onPress: () =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "tovabb" }], // "tovabb.js" helyett csak a képernyő neve kell
                    }),
                },
                {
                  text: "No",
                  onPress: () =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "HomeScreen" }],
                    }),
                },
              ]
            );
            return updatedStats;
          }

          currentStats.setsWon += 1;
          currentStats.legsWon = 0;
        }

        // Reset scores for next leg
        Object.keys(updatedStats).forEach((key) => {
          updatedStats[key].score = 501;
        });
      }

      return updatedStats;
    });

    setInputValue(0);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % selectedPlayers.length);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastAction = history.pop();
      setHistory([...history]);

      setPlayerStats((prevStats) => {
        const updatedStats = { ...prevStats };
        const currentStats = updatedStats[lastAction.player];
        currentStats.score = lastAction.prevScore;
        currentStats.totalPoints -= lastAction.input;
        currentStats.dartsThrown -= 3;
        return updatedStats;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {selectedPlayers.map((player, index) => (
          <View
            key={player}
            style={[
              styles.playerContainer,
              index === currentPlayerIndex && styles.activePlayer,
            ]}
          >
            <Text
              style={[
                styles.playerScore,
                index === currentPlayerIndex && styles.activePlayerScore,
              ]}
            >
              {playerStats[player].score}
            </Text>
            <Text
              style={[
                styles.playerName,
                index === currentPlayerIndex && styles.activePlayerText,
              ]}
            >
              {player}
            </Text>
            <View style={styles.statsContainer}>
              <Text style={styles.playerStats}>Sets: {playerStats[player].setsWon}</Text>
              <Text style={styles.playerStats}>Legs: {playerStats[player].legsWon}</Text>
              <Text style={styles.playerStats}>High CO: {playerStats[player].highestCheckout}</Text>
              <Text style={styles.playerStats}>Avg: {calculateAverage(player)}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.inputValue}>{inputValue}</Text>

      <View style={styles.numberPadContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.numberButton} onPress={handleBackspace}>
          <MaterialCommunityIcons name="backspace" size={32} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.numberButton}
          onPress={() => handleNumberPress(0)}
        >
          <Text style={styles.numberText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.numberButton} onPress={handleSubmit}>
          <Entypo name="arrow-bold-right" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.undoButton} onPress={handleUndo}>
        <MaterialCommunityIcons name="undo" size={32} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFF3E3",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  playerContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#355E3B",
    marginHorizontal: 5,
  },
  activePlayer: {
    backgroundColor: "#1E441E",
  },
  playerScore: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  activePlayerScore: {
    fontSize: 48,
  },
  playerName: {
    fontSize: 20,
    marginBottom: 10,
    color: "#FFF",
  },
  statsContainer: {
    marginTop: 10,
  },
  playerStats: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
  },
  inputValue: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
    color: "#000",
  },
  numberPadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  numberButton: {
    width: "30%",
    margin: 5,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#355E3B",
    borderRadius: 10,
  },
  numberText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  undoButton: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#555",
    borderRadius: 10,
    padding: 10,
  },
});
