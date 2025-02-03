import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import NewGameScreen from './screens/NewGameScreen';
import GameScreen from './screens/GameScreen';
import MatchResultsScreen from './screens/MatchResults';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="NewGame" component={NewGameScreen} options={{ title: 'New Game', headerShown: false }} />
        <Stack.Screen name="Order" component={OrderScreen} options={{ title: 'Order', headerShown: false }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Game', headerShown: false }} />
        <Stack.Screen name="MatchResults" component={MatchResultsScreen} options={{ title: 'Results', headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
