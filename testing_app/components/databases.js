//!LOGGED USER
//await AsyncStorage.getItem('USER');
//await AsyncStorage.setItem('USER', JSON.stringify(user));

//!USUARIOS
//await AsyncStorage.getItem(`USERS:${email}`);
//await AsyncStorage.setItem(`USERS:${email}`, JSON.stringify(user));
const user = {
    senha: '',
    name: '',
    faculdade: '',
    curso: '',
    ano_ingresso: '',
    bio: '',
};

//!PERGUNTAS
//await AsyncStorage.getItem(`QUESTIONS:${id}`);
//await AsyncStorage.setItem(`QUESTIONS:${id}`, JSON.stringify(question));
const question = {
    user: '',
    time: '',
    content: '',
    tag: '',
    likes: '',
};
//ALWAYS UPDATE THE NEXT ID WHEN ADDING A NEW QUESTION
//await AsyncStorage.getItem('QUESTIONS:ID');
//await AsyncStorage.setItem('QUESTIONS:ID', JSON.stringify(id));

//!RESPOSTAS
//await AsyncStorage.getItem(`ANSWERS:${id}`);
//await AsyncStorage.setItem(`ANSWERS:${id}`, JSON.stringify(answer));
const answer = {
    question: '',
    user: '',
    time: '',
    content: '',
    likes: '',
};

//!CURTIDAS_PERGUNTAS
//await AsyncStorage.getItem(`LIKES:QUESTIONS:${id}`);
//await AsyncStorage.setItem(`LIKES:QUESTIONS:${id}`, JSON.stringify(likes));
const likes_question = {
    question: '',
    user: '',
};
//ALWAYS UPDATE THE NEXT ID WHEN ADDING A NEW LIKE
//await AsyncStorage.getItem('LIKES:QUESTIONS:ID');
//await AsyncStorage.setItem('LIKES:QUESTIONS:ID', JSON.stringify(id));

//!CURTIDAS_RESPOSTAS
//await AsyncStorage.getItem(`LIKES:ANSWERS:${id}`);
//await AsyncStorage.setItem(`LIKES:ANSWERS:${id}`, JSON.stringify(likes));
const likes_answer = {
    answer: '',
    user: '',
};
//ALWAYS UPDATE THE NEXT ID WHEN ADDING A NEW LIKE
//await AsyncStorage.getItem('LIKES:ANSWERS:ID');
//await AsyncStorage.setItem('LIKES:ANSWERS:ID', JSON.stringify(id));