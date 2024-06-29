// components/QuestionModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { setQuestion } from './databases';
import { getLoggedUser } from './databases';

const QuestionModal = ({ isVisible, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async () => {
    const loggedUser = await getLoggedUser();
    if (!loggedUser) {
      alert("Você precisa estar logado para fazer uma pergunta.");
      return;
    }

    const newQuestion = {
      user: loggedUser.email,
      time: new Date().toISOString(),
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      likes: 0,
    };

    await setQuestion(newQuestion);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Faça sua pergunta!</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Digite sua pergunta aqui..."
            value={content}
            onChangeText={setContent}
            multiline
          />
          <TextInput
            style={styles.textInput}
            placeholder="Tags (separadas por vírgula)"
            value={tags}
            onChangeText={setTags}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Pergunte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default QuestionModal;
