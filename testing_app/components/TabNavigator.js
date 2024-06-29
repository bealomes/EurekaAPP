// components/TabNavigator.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBarButton from './CustomTabBarButton';
import Feed from './Feed';
import Profile from './Profile';
import QuestionModal from './QuestionModal';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <React.Fragment>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            let backgroundColor = focused ? '#EDEDED' : 'transparent';

            if (route.name === 'Feed') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return (
              <View style={{ ...styles.iconContainer, backgroundColor }}>
                <Icon name={iconName} size={30} color={color} />
              </View>
            );
          },
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 90,
            shadowColor: '#7F5DF0',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
          },
        })}
      >
        <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Tab.Screen
          name="AddQuestion"
          component={View}
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={toggleModal}>
                <Icon name="add" size={30} color="#fff" />
              </CustomTabBarButton>
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleModal();
            },
          }}
        />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      </Tab.Navigator>

      <QuestionModal isVisible={isModalVisible} onClose={toggleModal} />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default TabNavigator;
