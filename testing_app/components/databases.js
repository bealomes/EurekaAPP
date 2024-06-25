import AsyncStorage from '@react-native-async-storage/async-storage';

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
const getNextQuestionId = async () => {
  try {
    const id = await AsyncStorage.getItem('QUESTIONS:ID');
    return id ? JSON.parse(id) : 1;
  } catch (error) {
    console.error('Failed to get next question ID', error);
    return 1;
  }
};

/** Increments and returns the next question ID
 * 
 * @returns next question ID
 */
const incrementNextQuestionId = async () => {
  try {
    const currentId = await getNextQuestionId();
    const nextId = currentId + 1;
    await AsyncStorage.setItem('QUESTIONS:ID', JSON.stringify(nextId));
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

/** Sets the question in the storage
 * 
 * @param {*} question = {
 *   user: '',
 *   time: '',
 *   content: '',
 *   tag: '',
 *   likes: '',
 * }
 * @returns question ID
 */
export const setQuestion = async (question) => {
  try {
    const id = await incrementNextQuestionId();
    await AsyncStorage.setItem(`QUESTIONS:${id}`, JSON.stringify({ id, ...question }));
    return id;
  } catch (error) {
    console.error('Failed to set question', error);
    return null;
  }
};

//!RESPOSTAS

/** Gets the next answer ID from the storage
 * 
 * @returns next answer ID
 */
const getNextAnswerId = async () => {
  try {
    const id = await AsyncStorage.getItem('ANSWERS:ID');
    return id ? JSON.parse(id) : 1;
  } catch (error) {
    console.error('Failed to get next answer ID', error);
    return 1;
  }
};

/** Increments and returns the next answer ID
 * 
 * @returns next answer ID
 */
const incrementNextAnswerId = async () => {
  try {
    const currentId = await getNextAnswerId();
    const nextId = currentId + 1;
    await AsyncStorage.setItem('ANSWERS:ID', JSON.stringify(nextId));
    return nextId;
  } catch (error) {
    console.error('Failed to increment answer ID', error);
    return 1;
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
    const id = await incrementNextAnswerId();
    await AsyncStorage.setItem(`ANSWERS:${id}`, JSON.stringify({ id, ...answer }));
    return id;
  } catch (error) {
    console.error('Failed to set answer', error);
    return null;
  }
};

//!CURTIDAS_PERGUNTAS

/** Gets the next question like ID from the storage
 * 
 * @returns next question like ID
 */
const getNextQuestionLikeId = async () => {
  try {
    const id = await AsyncStorage.getItem('LIKES:QUESTIONS:ID');
    return id ? JSON.parse(id) : 1;
  } catch (error) {
    console.error('Failed to get next question like ID', error);
    return 1;
  }
};

/** Increments and returns the next question like ID
 * 
 * @returns next question like ID
 */
const incrementNextQuestionLikeId = async () => {
  try {
    const currentId = await getNextQuestionLikeId();
    const nextId = currentId + 1;
    await AsyncStorage.setItem('LIKES:QUESTIONS:ID', JSON.stringify(nextId));
    return nextId;
  } catch (error) {
    console.error('Failed to increment question like ID', error);
    return 1;
  }
};

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
    const likes = await AsyncStorage.getItem(`LIKES:QUESTIONS:${id}`);
    return likes ? JSON.parse(likes) : null;
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
export const setQuestionLikes = async (likes) => {
  try {
    const id = await incrementNextQuestionLikeId();
    await AsyncStorage.setItem(`LIKES:QUESTIONS:${id}`, JSON.stringify({ id, ...likes }));
    return id;
  } catch (error) {
    console.error('Failed to set question likes', error);
    return null;
  }
};

//!CURTIDAS_RESPOSTAS

/** Gets the next answer like ID from the storage
 * 
 * @returns next answer like ID
 */
const getNextAnswerLikeId = async () => {
  try {
    const id = await AsyncStorage.getItem('LIKES:ANSWERS:ID');
    return id ? JSON.parse(id) : 1;
  } catch (error) {
    console.error('Failed to get next answer like ID', error);
    return 1;
  }
};

/** Increments and returns the next answer like ID
 * 
 * @returns next answer like ID
 */
const incrementNextAnswerLikeId = async () => {
  try {
    const currentId = await getNextAnswerLikeId();
    const nextId = currentId + 1;
    await AsyncStorage.setItem('LIKES:ANSWERS:ID', JSON.stringify(nextId));
    return nextId;
  } catch (error) {
    console.error('Failed to increment answer like ID', error);
    return 1;
  }
};

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
    const likes = await AsyncStorage.getItem(`LIKES:ANSWERS:${id}`);
    return likes ? JSON.parse(likes) : null;
  } catch (error) {
    console.error('Failed to get answer likes', error);
    return null;
  }
};

/** Sets the answer likes in the storage
 * 
 * @param {*} likes = {
 *   answer: '',
 *   user: '',
 * }
 * @returns answer like ID
 */
export const setAnswerLikes = async (likes) => {
  try {
    const id = await incrementNextAnswerLikeId();
    await AsyncStorage.setItem(`LIKES:ANSWERS:${id}`, JSON.stringify({ id, ...likes }));
    return id;
  } catch (error) {
    console.error('Failed to set answer likes', error);
    return null;
  }
};
