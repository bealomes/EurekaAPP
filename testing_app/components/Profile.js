import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import icon from './../assets/eureka-icon.png';
import user_temp from './../assets/user_icon.png';
import { getLoggedUser, removeLoggedUser, getAnswersByUser, getQuestionsByUser, getQuestion } from './databases'; // Importando as funções do Database.js

const ProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Perguntas');
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getLoggedUser();
        if (userData) {
          setUser(userData);
          const userQuestions = await getQuestionsByUser(userData.email);
          const userAnswers = await getAnswersByUser(userData.email);

          const detailedAnswers = await Promise.all(userAnswers.map(async (answer) => {
            const question = await getQuestion(answer.question);
            return { ...answer, questionTitle: question.title };
          }));

          setAnswers(detailedAnswers);
          setQuestions(userQuestions);
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

  const renderQuestions = () => (
    <View>
      {questions.map((question, index) => (
        <TouchableOpacity key={index} style={styles.post} onPress={() => navigation.navigate('Question', { questionId: question.id })}>
          <Text style={styles.postTitle}>{question.title}</Text>
          <Text style={styles.postContent}>{question.content.slice(0, 100)}...</Text>
          <Text style={styles.postTime}>{question.time}</Text>
          <Text style={styles.postLikes}>Curtidas: {question.likes}</Text>
          <Text style={styles.postTag}>{question.tags.join(', ')}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAnswers = () => (
    <View>
      {answers.map((answer, index) => (
        <TouchableOpacity key={index} style={styles.post} onPress={() => navigation.navigate('Question', { questionId: answer.question })}>
          <Text style={styles.postTitle}>{answer.questionTitle}</Text>
          <Text style={styles.postContent}>{answer.content.slice(0, 100)}...</Text>
          <Text style={styles.postTime}>{answer.time}</Text>
          <Text style={styles.postLikes}>Curtidas: {answer.likes}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const logout = async () => {
    await removeLoggedUser();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={logout}>
          <Text style={styles.backButtonText}>{' < '}</Text>
        </TouchableOpacity>
        <Image source={icon} style={styles.editButton} />
      </View>

      <View style={styles.profile}>
        <Image source={user_temp} style={styles.profileImage} />
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

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContentContainer}>
        {selectedTab === 'Perguntas' && renderQuestions()}
        {selectedTab === 'Respostas' && renderAnswers()}
      </ScrollView>

      {/* <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Questions')}>
          <Text style={styles.footerIcon}>❓</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerIcon, styles.activeFooterIcon]}>👤</Text>
        </TouchableOpacity>
      </View> */}
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
  scrollContentContainer: {
    paddingBottom: 120, // Ajuste o valor conforme necessário para garantir que o último item não seja escondido
  },
  post: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 5,
  },
  postTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 5,
  },
  postUser: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  postLikes: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 5,
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
  activeFooterIcon: {
    color: '#1d4ed8',
  },
});

export default ProfileScreen;
