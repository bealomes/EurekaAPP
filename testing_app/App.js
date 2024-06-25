import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Profile from './components/Profile';
import Filler from './components/databasefiller';
import { fill_database } from './components/databasefiller';

const Stack = createNativeStackNavigator();

function App() {

  fill_database();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false,}} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;