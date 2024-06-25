import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const data = [
  { id: '1', user: 'Usuário 1', time: 'Há 20 segundos', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum felis dorcepas coisores...', tag: '#geometriaanalitica' },
  { id: '2', user: 'Usuário 2', time: 'Há 10 minutos', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum felis dorcepas coisores...', tag: '#calculo' },
];

const PostItem = ({ user, time, message, tag }) => (
  <View style={styles.postContainer}>
    <View style={styles.postHeader}>
      <Icon name="person-circle" size={40} color="#000" />
      <View style={styles.postHeaderText}>
        <Text>{user}</Text>
        <Text>{time}</Text>
      </View>
    </View>
    <Text style={styles.postMessage}>{message}</Text>
    <Text style={styles.postTag}>{tag}</Text>
    <TouchableOpacity style={styles.responseButton}>
      <Icon name="chatbubble-outline" size={20} color="#000" />
      <Text style={styles.responseText}>Responda</Text>
    </TouchableOpacity>
  </View>
);

const FeedScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Descubra</Text>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tabSelected}><Text style={styles.tabTextSelected}>TUDO</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>FÍSICA</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>CÁLCULO</Text></TouchableOpacity>
          <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>GEOMETRIA</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Qual a sua pergunta?" />
        <TouchableOpacity style={styles.filterButton}><Text>Filtrar</Text></TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <PostItem {...item} />}
        keyExtractor={item => item.id}
      />
      {/* <View style={styles.footer}>
        <TouchableOpacity><Icon name="home" size={30} color="#000" /></TouchableOpacity>
        <TouchableOpacity onPress={toggleModal}><Icon name="help-circle" size={30} color="#000" /></TouchableOpacity>
        <TouchableOpacity><Icon name="person" size={30} color="#000" /></TouchableOpacity>
      </View> */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Icon name="close" size={24} color="#000" />
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
  postMessage: {
    fontSize:20,
    marginTop: 10,
    color: '#333',
  },
  postTag: {
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
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
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 100,
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
