import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from './utils/contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Substituto do sessionStorage
import { View, Text, ActivityIndicator } from 'react-native';
import SearchResults from './SearchResults'; 

const Stack = createStackNavigator();

export default function App() {
  const [USER, setUSER] = useState();
  const [MATERIAS, setMATERIAS] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUSER(parsedUser);
          setMATERIAS(parsedUser.fav_disciplinas);
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ user: [USER, setUSER], disciplinas: [MATERIAS, setMATERIAS] }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
