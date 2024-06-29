import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getQuestion, getAnswersByQuestion, getQuestionLikes, setQuestionLikes, getAnswerLikes, setAnswerLikes, getLoggedUser } from './databases';

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
    console.log("Question likes: ");
    console.log(userLike);

    const userHasLiked = userLike && userLike.some(like => like.user === user.email);

    console.log("User %s has liked: %s", user.email, userHasLiked);
    const quest = await getQuestion(questionId);
    console.log("Current question");
    console.log(quest);
    
    if (userHasLiked) {
        console.log("Removing like");
        const updatedLikes = userLike.find(like => like.user === user.email);
        console.log("Updated likes: ");
        console.log(updatedLikes);
        await setQuestionLikes(updatedLikes, false);
    } else {
        console.log("Adding like");
        const newLike = { question: questionId, user: user.email };
        await setQuestionLikes(newLike, true);
    }
    
    const question = await getQuestion(questionId);
    console.log("Current likes after change: %s", await question.likes);

    fetchQuestionAndAnswers();
  };

  const toggleAnswerLike = async (answerId) => {
    const userLike = await getAnswerLikes(answerId);
    const userHasLiked = userLike && userLike.some(like => like.user === user.email);

    if (userHasLiked) {
      // Remove like
      const updatedLikes = userLike.filter(like => like.user !== user.email);
      await AsyncStorage.setItem(`LIKES:ANSWERS:${answerId}`, JSON.stringify(updatedLikes));
    } else {
      // Add like
      const newLike = { answer: answerId, user: user.email };
      await setAnswerLikes(newLike);
    }

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
});

export default QuestionScreen;
