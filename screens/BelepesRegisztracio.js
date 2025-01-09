import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BelepesRegisztracio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Válassz egy lehetőséget:</Text>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate('Beleptetes')}
      >
        <Text style={styles.buttonText}>Bejelentkezés</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.noAccountText}>Még nem rendelkezel fiókkal?</Text>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Regisztracio')}
        >
          <Text style={styles.buttonText2}>Regisztráció</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#D3E7D3',
  },
  registerButton: {
    backgroundColor: '#1E441E',
  },
  buttonText: {
    fontSize: 16,
    color: '#F0F0F',
    fontWeight: 'bold',
  },
  buttonText2: {
    fontSize: 16,
    color: '#FFFF',
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 10, // Csökkentettük a távolságot
    alignItems: 'center', // Középre igazítjuk
  },
  noAccountText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10, // Növeltük a távolságot a szöveg és a gomb között
  },
});

export default BelepesRegisztracio;
