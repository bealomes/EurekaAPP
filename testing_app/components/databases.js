import AsyncStorage from '@react-native-async-storage/async-storage';

export const wipeDatabase = async () => {
    try {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('ID:QUESTIONS', '0');
        await AsyncStorage.setItem('ID:ANSWERS', '0');
        await AsyncStorage.setItem('LIKES:ID:QUESTIONS', '0');
        await AsyncStorage.setItem('LIKES:ID:ANSWERS', '0');
    } catch (error) {
        console.error('Failed to wipe database', error);
    }
};

//!LOGGED USER

/** Gets the logged user from the storage
 * 
 * @returns user = {
 *   senha: '',
 *   name: '',
 *   faculdade: '',
 *   curso: '',
 *   ano_ingresso: '',
 *   bio: '',
 * }
 */
export const getLoggedUser = async () => {
  try {
    const user = await AsyncStorage.getItem('USER');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to get logged user', error);
    return null;
  }
};

/** Removes the logged user from the storage
 * 
 */
export const removeLoggedUser = async () => {
    try {
        await AsyncStorage.removeItem('USER');
    } catch (error) {
        console.error('Failed to remove logged user', error);
    }
};

/** Sets the logged user in the storage
 * 
 * @param {*} user = {
 *   senha: '',
 *   name: '',
 *   faculdade: '',
 *   curso: '',
 *   ano_ingresso: '',
 *   bio: '',
 * }
 */
export const setLoggedUser = async (user) => {
  try {
    await AsyncStorage.setItem('USER', JSON.stringify(user));
  } catch (error) {
    console.error('Failed to set logged user', error);
  }
};

//!USUARIOS

/** Gets the user from the storage
 * 
 * @param {*} email as id
 * @returns user = {
 *   senha: '',
 *   name: '',
 *   faculdade: '',
 *   curso: '',
 *   ano_ingresso: '',
 *   bio: '',
 * }
 */
export const getUser = async (email) => {
  try {
    const user = await AsyncStorage.getItem(`USERS:${email}`);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Failed to get user', error);
    return null;
  }
};

/** Sets the user in the storage
 * 
 * @param {*} email as id
 * @param {*} user = {
 *   senha: '',
 *   name: '',
 *   faculdade: '',
 *   curso: '',
 *   ano_ingresso: '',
 *   bio: '',
 * }
 */
export const setUser = async (email, user) => {
  try {
    await AsyncStorage.setItem(`USERS:${email}`, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to set user', error);
  }
};

//!PERGUNTAS

/** Gets the next question ID from the storage
 * 
 * @returns next question ID
 */
const getNextId = async (id) => {
    try {
        const value = await AsyncStorage.getItem(id);
        return value ? JSON.parse(value) : 0;
    } catch (error) {
        console.error('Failed to get ID', error);
        return 1;
    }
};

/** Increments and returns the next question ID
 * 
 * @returns next question ID
 */
const incrementId = async (id) => {
    try {
        const currentId = await getNextId(id);
        const nextId = currentId + 1;
        await AsyncStorage.setItem(id, JSON.stringify(nextId));
        return nextId;
    } catch (error) {
        console.error('Failed to increment question ID', error);
        return 1;
    }
};

/** Gets the question from the storage
 * 
 * @param {*} id as question ID
 * @returns question = {
 *   user: '',
 *   time: '',
 *   title: '',
 *   content: '',
 *   tag: '',
 *   likes: '',
 * }
 */
export const getQuestion = async (id) => {
  try {
    const question = await AsyncStorage.getItem(`QUESTIONS:${id}`);
    return question ? JSON.parse(question) : null;
  } catch (error) {
    console.error('Failed to get question', error);
    return null;
  }
};

/** Gets all questions with user as the author
 * 
 * @param {*} user as user ID
 * @returns questions = [{}]
 */
export const getQuestionsByUser = async (user) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const questions = await AsyncStorage.multiGet(keys.filter(key => key.startsWith('QUESTIONS:')));
      const result = questions
        .map(([key, value]) => JSON.parse(value))
        .filter(question => question.user === user)
        .sort((a, b) => new Date(b.time) - new Date(a.time)); // Ordenar por question.time
      return result;
    } catch (error) {
      console.error('Failed to get questions by user', error);
      return [];
    }
  };

/** Gets all questions from the storage filtered by tag
 * 
 * 
 * @returns questions = [{}]
 */
export const getAllQuestionsFilteredByTag = async (tag) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const questions = await AsyncStorage.multiGet(keys.filter(key => key.startsWith('QUESTIONS:')));
    let filteredQuestions = questions.map(([key, value]) => JSON.parse(value)).filter(question => question && question.time);

    if (tag) {
      filteredQuestions = filteredQuestions.filter(question => question.tags.includes(tag));
    }

    return filteredQuestions.sort((a, b) => new Date(b.time) - new Date(a.time));
  } catch (error) {
    console.error('Failed to get questions by tag', error);
    return [];
  }
};


/** Sets the question in the storage
 * 
 * @param {*} question = {
 *   user: '',
 *   time: '',
 *   title: '',
 *   content: '',
 *   tag: '',
 *   likes: '',
 * }
 * @returns question ID
 */
export const setQuestion = async (question) => {
  try {
    const id = await incrementId('ID:QUESTIONS');
    await AsyncStorage.setItem(`QUESTIONS:${id}`, JSON.stringify({ id, ...question }));
    return id;
  } catch (error) {
    console.error('Failed to set question', error);
    return null;
  }
};

export const updateQuestion = async (question) => {
    try {
        await AsyncStorage.setItem(`QUESTIONS:${question.id}`, JSON.stringify(question));
    } catch (error) {
        console.error('Failed to update question', error);
    }
};

//!RESPOSTAS

/** Get all answers from an user
 * 
 * @param {*} user as user ID
 * @returns answers = [{}]
 */
export const getAnswersByUser = async (user) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const answers = await AsyncStorage.multiGet(keys.filter(key => key.startsWith('ANSWERS:')));
    const result = answers
      .map(([key, value]) => JSON.parse(value))
      .filter(answer => answer.user === user)
      .sort((a, b) => new Date(b.time) - new Date(a.time)); // Ordenar por answer.time
    return result;
  } catch (error) {
    console.error('Failed to get answers by user', error);
    return [];
  }
};

/** 
 * Gets all answers for a specific question from the storage
 * 
 * @param {number} questionId - The ID of the question
 * @returns {Promise<Array>} - The list of answers for the question
 */
export const getAnswersByQuestion = async (questionId) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const answers = await AsyncStorage.multiGet(keys.filter(key => key.startsWith('ANSWERS:')));
    const result = answers
      .map(([key, value]) => JSON.parse(value))
      .filter(answer => answer.question === questionId)
      .sort((a, b) => new Date(b.time) - new Date(a.time)); // Ordenar por answer.time
    return result;
  } catch (error) {
    console.error('Failed to get answers by question', error);
    return [];
  }
};

/** Gets the answer from the storage
 * 
 * @param {*} id as answer ID
 * @returns answer = {
 *   question: '',
 *   user: '',
 *   time: '',
 *   content: '',
 *   likes: '',
 * }
 */
export const getAnswer = async (id) => {
  try {
    const answer = await AsyncStorage.getItem(`ANSWERS:${id}`);
    return answer ? JSON.parse(answer) : null;
  } catch (error) {
    console.error('Failed to get answer', error);
    return null;
  }
};

/** Sets the answer in the storage
 * 
 * @param {*} answer = {
 *   question: '',
 *   user: '',
 *   time: '',
 *   content: '',
 *   likes: '',
 * }
 * @returns answer ID
 */
export const setAnswer = async (answer) => {
  try {
    const id = await incrementId('ID:ANSWERS');
    await AsyncStorage.setItem(`ANSWERS:${id}`, JSON.stringify({ id, ...answer }));
    return id;
  } catch (error) {
    console.error('Failed to set answer', error);
    return null;
  }
};

export const updateAnswer = async (answer) => {
  try {
      await AsyncStorage.setItem(`ANSWERS:${answer.id}`, JSON.stringify(answer));
  } catch (error) {
      console.error('Failed to update answer', error);
  }
};

//!CURTIDAS_PERGUNTAS

/** Gets the question likes from the storage
 * 
 * @param {*} id as question like ID
 * @returns likes = {
 *   question: '',
 *   user: '',
 * }
 */
export const getQuestionLikes = async (id) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const likes = await AsyncStorage.multiGet(keys.filter(key => key.startsWith('LIKES:QUESTIONS:')));
    const result = likes
      .map(([key, value]) => JSON.parse(value))
      .filter(like => like.question == id);
    return result;
  } catch (error) {
    console.error('Failed to get question likes', error);
    return null;
  }
};

/** Sets the question likes in the storage
 * 
 * @param {*} likes = {
 *   question: '',
 *   user: '',
 * }
 * @returns question like ID
 */
export const setQuestionLikes = async (likes, add) => {
  try {
    let id;
    const question = await getQuestion(likes.question);
    if(add){
      const new_id = await incrementId('LIKES:ID:QUESTIONS');
      id = new_id;
      const like = {
        id: new_id,
        question: likes.question,
        user: likes.user
      };
      await AsyncStorage.setItem(`LIKES:QUESTIONS:${id}`, JSON.stringify(like));

      if(!question.likes) question.likes = 0;
      question.likes++;
    }else{
      await AsyncStorage.removeItem(`LIKES:QUESTIONS:${likes.id}`);
      id = likes.id;

      question.likes--;
      if(question.likes < 0) question.likes = 0;
    }

    await updateQuestion(question);

    return id;
  } catch (error) {
    console.error('Failed to set question likes', error);
    return null;
  }
};

//!CURTIDAS_RESPOSTAS
/** Gets the answer likes from the storage
 * 
 * @param {*} id as answer like ID
 * @returns likes = {
 *   answer: '',
 *   user: '',
 * }
 */
export const getAnswerLikes = async (id) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const likes = await AsyncStorage.multiGet(keys.filter(key => key.startsWith('LIKES:ANSWERS:')));
    const result = likes
      .map(([key, value]) => JSON.parse(value))
      .filter(like => like.answer == id);
    return result;
  } catch (error) {
    console.error('Failed to get answer likes', error);
    return null;
  }
};

/** Sets the answer likes in the storage
 * 
 * @param {*} likes = {
 *   id: '',
 *   answer: '',
 *   user: '',
 * }
 * @returns answer like ID
 */
export const setAnswerLikes = async (likes, add) => {
  try {
    let id;
    const answer = await getAnswer(likes.answer);
    if(add){
      const new_id = await incrementId('LIKES:ID:ANSWERS');
      id = new_id;
      const like = {
        id: new_id,
        answer: likes.answer,
        user: likes.user
      };
      await AsyncStorage.setItem(`LIKES:ANSWERS:${id}`, JSON.stringify(like));

      if(!answer.likes) answer.likes = 0;
      answer.likes++;
    }else{
      await AsyncStorage.removeItem(`LIKES:ANSWERS:${likes.id}`);
      id = likes.id;

      answer.likes--;
      if(answer.likes < 0) answer.likes = 0;
    }

    await updateAnswer(answer);

    return id;
  } catch (error) {
    console.error('Failed to set answer likes', error);
    return null;
  }
};
