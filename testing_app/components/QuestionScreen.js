import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getQuestion, getAnswersByQuestion, getQuestionLikes, setQuestionLikes, getAnswerLikes, setAnswerLikes, getLoggedUser, setAnswer } from './databases';

const AnswerItem = ({ user, time, content, likes, onLike }) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <Icon name="person-circle" size={40} color="#000" />
      <View style={styles.postHeaderText}>
        <Text>{user}</Text>
        <Text>{time}</Text>
      </View>
    </View>
    <Text style={styles.postContent}>{content}</Text>
    <TouchableOpacity onPress={onLike} style={styles.likeButton}>
      <Icon name="thumbs-up-outline" size={20} color="#000" />
      <Text style={styles.postLikes}>Curtidas: {likes}</Text>
    </TouchableOpacity>
  </View>
);

const QuestionScreen = ({ route, navigation }) => {
  const { questionId } = route.params;
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [likes, setLikes] = useState(0);
  const [user, setUser] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchQuestionAndAnswers();
    fetchLoggedUser();
  }, []);

  const fetchLoggedUser = async () => {
    const loggedUser = await getLoggedUser();
    setUser(loggedUser);
  };

  const fetchQuestionAndAnswers = async () => {
    const fetchedQuestion = await getQuestion(questionId);
    const fetchedAnswers = await getAnswersByQuestion(questionId.toString());
    const questionLikes = await getQuestionLikes(questionId.toString());
    setQuestion(fetchedQuestion);
    setAnswers(fetchedAnswers.sort((a, b) => b.likes - a.likes));
    setLikes(questionLikes ? questionLikes.length : 0);
  };

  const toggleQuestionLike = async () => {
    const userLike = await getQuestionLikes(questionId.toString());
    const userHasLiked = userLike && userLike.some(like => like.user === user.email);
    
    if (userHasLiked) {
      const updatedLikes = userLike.find(like => like.user === user.email);
      await setQuestionLikes(updatedLikes, false);
    } else {
      const newLike = { question: questionId, user: user.email };
      await setQuestionLikes(newLike, true);
    }

    fetchQuestionAndAnswers();
  };

  const toggleAnswerLike = async (answerId) => {
    const userLike = await getAnswerLikes(answerId.toString());
    const userHasLiked = userLike && userLike.some(like => like.user === user.email);

    if (userHasLiked) {
      const updatedLikes = userLike.find(like => like.user === user.email);
      await setAnswerLikes(updatedLikes, false);
    } else {
      const newLike = { answer: answerId, user: user.email };
      await setAnswerLikes(newLike, true);
    }

    fetchQuestionAndAnswers();
  };

  const handleAnswerSubmit = async () => {
    if (newAnswer.trim() === '') return;
    
    let date = new Date();
    let time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();

    const answer = {
      question: questionId.toString(),
      user: user.email,
      time: time,
      content: newAnswer,
      likes: 0,
    };

    await setAnswer(answer);
    setNewAnswer('');
    fetchQuestionAndAnswers();
  };

  if (!question) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.questionContainer}>
        <View style={styles.postHeader}>
          <Icon name="person-circle" size={40} color="#000" />
          <View style={styles.postHeaderText}>
            <Text>{question.user}</Text>
            <Text>{question.time}</Text>
          </View>
        </View>
        <Text style={styles.postTitle}>{question.title}</Text>
        <Text style={styles.postContent}>{question.content}</Text>
        <Text style={styles.postTags}>{question.tags.join(', ')}</Text>
        <TouchableOpacity onPress={toggleQuestionLike} style={styles.likeButton}>
          <Icon name="thumbs-up-outline" size={20} color="#000" />
          <Text style={styles.postLikes}>Curtidas: {likes}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.answersHeader}>Respostas ({answers.length})</Text>
      <FlatList
        data={answers}
        renderItem={({ item }) => (
          <AnswerItem
            {...item}
            onLike={() => toggleAnswerLike(item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
      <View style={styles.answerInputContainer}>
        <TextInput
          style={styles.answerInput}
          placeholder="Digite sua resposta..."
          value={newAnswer}
          onChangeText={setNewAnswer}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAnswerSubmit}>
          <Text style={styles.submitButtonText}>Responder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    margin: 10,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderText: {
    marginLeft: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  postTags: {
    marginTop: 5,
    color: '#666',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  postLikes: {
    marginLeft: 5,
    color: '#666',
  },
  answersHeader: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  answerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  answerInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default QuestionScreen;
