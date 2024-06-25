import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, CheckBox, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon from './../assets/eureka-icon.png';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await AsyncStorage.getItem(`USERS:${email}`);
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.senha === password) {
          //set user in async storage
          await AsyncStorage.setItem('USER', JSON.stringify(parsedUser));
          navigation.navigate('Profile', { user: parsedUser });
        } else {
          Alert.alert('Erro', 'Senha incorreta');
        }
      } else {
        Alert.alert('Erro', 'Usuário não encontrado');
      }
    } catch (error) {
      console.error('Failed to fetch the user from storage', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={icon} style={styles.lightBulb} />
      </View>

      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.registerLink}>Não tem uma conta? Cadastro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  forgotPassword: {
    color: '#3b82f6',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerLink: {
    color: '#3b82f6',
    textAlign: 'center',
  },
});

export default LoginScreen;