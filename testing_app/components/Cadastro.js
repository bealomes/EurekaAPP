import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon from './../assets/eureka-icon.png';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [bio, setBio] = useState('');

  const handleRegister = async () => {
    const user = {
      senha: password,
      name,
      faculdade: university,
      curso: course,
      ano_ingresso: parseInt(year, 10),
      bio: '',
    };

    try {
      //check if user exists
      const userExists = await AsyncStorage.getItem(`USERS:${email}`);
      if (userExists) {
        Alert.alert('Erro', 'Usuário já cadastrado');
        return;
      }

      await AsyncStorage.setItem(`USERS:${email}`, JSON.stringify(user));
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to save the user in storage', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={icon} style={styles.lightBulb} />
      </View>

      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <Text style={styles.label}>Universidade</Text>
      <TextInput style={styles.input} value={university} onChangeText={setUniversity} />

      <Text style={styles.label}>Curso</Text>
      <TextInput style={styles.input} value={course} onChangeText={setCourse} />

      <Text style={styles.label}>Ano de ingresso</Text>
      <TextInput style={styles.input} value={year} onChangeText={setYear} keyboardType="numeric" />

      <Text style={styles.label}>Bio</Text>
      <TextInput style={styles.input} value={bio} onChangeText={setBio} multiline numberOfLines={4} />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Quase lá! Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já tem uma conta? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  lightBulb: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginLink: {
    color: '#3b82f6',
    textAlign: 'center',
  },
});

export default RegisterScreen;
