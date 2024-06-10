import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SearchField() {
  const [texto, setTexto] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate('SearchResults', { texto }); // supondo que você tenha uma tela SearchResults para resultados de pesquisa
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>🔍</Text> {/* substituindo o ícone de busca */}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Qual a sua pergunta?"
          value={texto}
          onChangeText={setTexto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    margin: 10,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
