import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, RefreshControl, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllQuestionsFilteredByTag } from './databases';
import { useFocusEffect } from '@react-navigation/native';

const PostItem = ({ user, time, title, content, tags, likes, onPress }) => (
  <TouchableOpacity style={styles.postContainer} onPress={onPress}>
    <View style={styles.postHeader}>
      <Icon name="person-circle" size={40} color="#000" />
      <View style={styles.postHeaderText}>
        <Text>{user}</Text>
        <Text>{time}</Text>
      </View>
    </View>
    <Text style={styles.postTitle}>{title}</Text>
    <Text style={styles.postContent}>{content.slice(0, 100)}...</Text>
    <Text style={styles.postTags}>{tags.join(', ')}</Text>
    <Text style={styles.postLikes}>Curtidas: {likes}</Text>
  </TouchableOpacity>
);

const FeedScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchQuestions();
    }, [selectedTag])
  );

  const fetchQuestions = async () => {
    const questions = await getAllQuestionsFilteredByTag(selectedTag);
    const validQuestions = questions.filter(question => question && question.time);
    setQuestions(validQuestions);
    if (!selectedTag) {
      extractTags(validQuestions);
    }
  };

  const extractTags = (questions) => {
    const tagCounts = {};
    questions.forEach(question => {
      if (question && question.tags) {
        question.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
    setTags(sortedTags);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleQuestionPress = (questionId) => {
    navigation.navigate('Question', { questionId });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchQuestions().then(() => setRefreshing(false));
  };

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Descubra</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, !selectedTag && styles.tabSelected]}
            onPress={() => setSelectedTag(null)}
          >
            <Text style={[styles.tabText, !selectedTag && styles.tabTextSelected]}>TUDO</Text>
          </TouchableOpacity>
          {tags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[styles.tab, selectedTag === tag && styles.tabSelected]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text style={[styles.tabText, selectedTag === tag && styles.tabTextSelected]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Qual a sua pergunta?"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredQuestions}
        renderItem={({ item }) => (
          <PostItem
            {...item}
            onPress={() => handleQuestionPress(item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 90 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Faça sua pergunta!</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Digite sua pergunta aqui..."
              multiline
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Pergunte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 20,
  },
  tabSelected: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#FFEB3B',
  },
  tabText: {
    color: '#000',
  },
  tabTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButton: {
    padding: 10,
    marginLeft: 10,
  },
  postContainer: {
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
  postLikes: {
    marginTop: 5,
    color: '#666',
  },
  responseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  responseText: {
    marginLeft: 5,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(93, 64, 216, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#6D28D9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FeedScreen;
