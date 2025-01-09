import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TovabbScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statisztika</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DFF3E3",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#355E3B",
  },
});