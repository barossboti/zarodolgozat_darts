import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Tovabbitbackend({ route }) {
  const { dartsThrown, startingPlayer, selectedPlayers, winner, setsWon, legsWon, highestCheckout, } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Itt lesz a Felvitel</Text>
      <Text>Starting Player: {startingPlayer}</Text>
      <Text>Winner: {winner}</Text>
      <Text>Darts Thrown: {dartsThrown}</Text>
      <Text>Sets Won: {setsWon}</Text>
      <Text>Legs Won: {legsWon}</Text>
      <Text>Highest Checkout: {highestCheckout}</Text>
      <Text>Selected Players:</Text>
      {selectedPlayers.map((player, index) => (
        <Text key={index}>{player}</Text>
      ))}
    </View>
  );
}
