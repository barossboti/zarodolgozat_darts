import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BelepesRegisztracio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose an option:</Text>  {/* Felirat módosítva */}

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate('Beleptetes')}
      >
        <Text style={styles.buttonText}>Login</Text>  {/* Gomb szövege módosítva */}
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.noAccountText}>Don't have an account yet?</Text>  {/* Felirat módosítva */}
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Regisztracio')}
        >
          <Text style={styles.buttonText2}>Register</Text>
        </TouchableOpacity>

        {/* "Back to Home" Button */}
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
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
  backButton: {
    backgroundColor: '#D3D3D3', // Light grey background for the back button
    padding: 10,
    marginBottom: 20, // Space below the button
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
  backButtonText: {
    fontSize: 14,  // Smaller text for the "Back" button
    color: '#333', // Dark text color
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 10, // Reduced the space between elements
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10, // Increased space between text and button
  },
});

export default BelepesRegisztracio;
