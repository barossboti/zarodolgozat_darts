import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenSzabi from './HomeScreenSzabi';
import SzabiatlagScreen from './Szabiatlag';  // Import SzabiatlagScreen here
import Beleptetes from './Beleptetes';
import Regisztracio from './Regisztracio';
import BelepesRegisztracio from './BelepesRegisztracio';

const Stack = createStackNavigator();

export default function MatchResults() {
  return (
   
      <Stack.Navigator initialRouteName="BelepesRegisztracio">
        {/* Home Screen with custom header */}
        <Stack.Screen
          name="Home"
          component={HomeScreenSzabi}
          options={{
            title: 'Kezdőlap',
            headerStyle: { backgroundColor: '#D5E2D5' }, // Header background color
            headerTintColor: '#1B3F1B', // Header text color
          }}
        />

        {/* Szabiatlag Screen */}
        <Stack.Screen
          name="Szabiatlag"
          component={SzabiatlagScreen}
          options={{ title: 'Statisztikák',
          headerStyle: { backgroundColor: '#D5E2D5' }, // Header background color
          headerTintColor: '#1B3F1B', // Header text color
        }} // Optionally customize header for this screen
        />
        <Stack.Screen
          name="Beleptetes"
          component={Beleptetes}
          options={{ title: 'Kilépés',
          headerStyle: { backgroundColor: '#D5E2D5' }, // Header background color
          headerTintColor: '#1B3F1B', // Header text color
        }} // Optionally customize header for this screen
        />

        <Stack.Screen
          name="Regisztracio"
          component={Regisztracio}
          options={{ title: 'Regisztráció',
          headerStyle: { backgroundColor: '#D5E2D5' }, // Header background color
          headerTintColor: '#1B3F1B', // Header text color
        }} // Optionally customize header for this screen
        />

        <Stack.Screen
          name="BelepesRegisztracio"
          component={BelepesRegisztracio}
          options={{ title: 'Vissza',headerShown:false,
          headerStyle: { backgroundColor: '#D5E2D5' }, // Header background color
          headerTintColor: '#1B3F1B', // Header text color
        }} // Optionally customize header for this screen
        />
      </Stack.Navigator>
  
  );
}
