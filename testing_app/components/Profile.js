import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon from './../assets/eureka-icon.png';

const ProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Perguntas');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('USER');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user from storage', error);
        Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados do usuário');
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={icon} style={styles.editButton} />
      </View>

      <View style={styles.profile}>
        <Image source={{ uri: 'https://scontent-gru1-1.cdninstagram.com/v/t51.2885-19/395784084_1011340880116777_1477600076027533740_n.jpg?_nc_ht=scontent-gru1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=iquUvpp1qtoQ7kNvgGkNpx_&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AYA-5caG5Ymj7jb0mHXjWejxRP323NQx1ICgPRxDyT58eQ&oe=667E6696&_nc_sid=cf751b' }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileInfo}>{user.faculdade}</Text>
        <Text style={styles.profileInfo}>{user.curso}</Text>
        <Text style={styles.profileInfo}>Ano de Ingresso: {user.ano_ingresso}</Text>
        <Text style={styles.profileInfo}>{user.bio}</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Perguntas' && styles.activeTab]}
          onPress={() => setSelectedTab('Perguntas')}
        >
          <Text style={[styles.tabText, selectedTab === 'Perguntas' && styles.activeTabText]}>Perguntas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Respostas' && styles.activeTab]}
          onPress={() => setSelectedTab('Respostas')}
        >
          <Text style={[styles.tabText, selectedTab === 'Respostas' && styles.activeTabText]}>Respostas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'Perguntas' && (
          <View>
            <View style={styles.post}>
              <Text style={styles.postUser}>Usuário 1</Text>
              <Text style={styles.postTime}>Há 20 segundos</Text>
              <Text style={styles.postContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum felis dorcepas coisores...
              </Text>
              <Text style={styles.postTag}>#geometriaanaltica</Text>
            </View>
            <View style={styles.post}>
              <Text style={styles.postUser}>Usuário 1</Text>
              <Text style={styles.postTime}>Há 20 segundos</Text>
              <Text style={styles.postContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum felis dorcepas coisores...
              </Text>
              <Text style={styles.postTag}>#geometriaanaltica</Text>
            </View>
          </View>
        )}
        {selectedTab === 'Respostas' && (
          <View>
            {/* Add responses content here */}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerIcon}>❓</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
  editButton: {
    width: 30,
    height: 30,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d4ed8',
    marginVertical: 10,
  },
  profileInfo: {
    fontSize: 16,
    color: '#6b7280',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  tab: {
    padding: 10,
    marginHorizontal: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1d4ed8',
  },
  activeTabText: {
    color: '#1d4ed8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  post: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  postTag: {
    fontSize: 12,
    color: '#3b82f6',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerIcon: {
    fontSize: 24,
    color: '#6b7280',
  },
});

export default ProfileScreen;
