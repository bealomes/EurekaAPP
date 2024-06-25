// components/CustomTabBarButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.button}>{children}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6D28D9',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default CustomTabBarButton;
