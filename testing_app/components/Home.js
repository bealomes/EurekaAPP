import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default Home = () => {
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>PERGUNTE</Text>
        </TouchableOpacity>
      </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: 'blue',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 17,
      fontWeight: '800',
      textAlign: 'center',
    },
  });
