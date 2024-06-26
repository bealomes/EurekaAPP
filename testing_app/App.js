// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Profile from './components/Profile';
import Question from './components/QuestionScreen'
import { fill_database } from './components/databasefiller';
import TabNavigator from './components/TabNavigator';

const Stack = createNativeStackNavigator();

function App() {

  fill_database();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Feed" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Question" component={Question} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
