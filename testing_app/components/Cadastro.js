import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import icon from './../assets/eureka-icon.png'

const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={icon} style={styles.lightBulb} />
      </View>

      <Text style={styles.title}>Cadastro</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} secureTextEntry />

      <Text style={styles.label}>Universidade</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Curso</Text>
      <TextInput style={styles.input} />

      <Text style={styles.label}>Ano de ingresso</Text>
      <TextInput style={styles.input} keyboardType="numeric" />

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Quase lá! Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Já tem uma conta? Login</Text>
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
