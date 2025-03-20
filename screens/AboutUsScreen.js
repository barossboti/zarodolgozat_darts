import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function AboutUsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Entypo name="chevron-left" size={24} color="black" />
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>About us</Text>
      
      <Text style={styles.description}>
        We are two guys who decided to create a darts app to make playing and keeping track of scores 
        easier and more fun. After many hours of coding and brainstorming, we built Darts Counter, a simple yet 
        powerful tool for darts enthusiasts of all levels. Whether you're playing casually with friends or 
        competing professionally, our app helps you focus on the game without worrying about calculations.
      </Text>

      <Text style={styles.description}>
        Our goal is to constantly improve the app and bring more features that will enhance your dart-playing experience. 
        Stay tuned for upcoming updates and new functionalities!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL('https://www.deakbutor.hu')}
      >
        <Text style={styles.buttonText}>Visit our website for more!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fff5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eaf5e9',
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 20,
    margin: 20,
    marginTop: 40,
  },
  headerButton: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    padding: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 3,
    textAlign: 'left'
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E441E',
    textAlign: 'center',
    marginBottom: 60,
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#eaf5e9',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E441E',
  },
});
