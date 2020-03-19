import axios from 'axios';
import { FETCH_USER, FETCH_QUESTION, FETCH_QUESTIONS, FETCH_ACTIVEQUESTIONS, FETCH_POPULARQUESTIONS, FETCH_MYQUESTIONS, FETCH_UNANSWERED, DELETE_QUESTION } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};
export const submitQuestion = (values, history) => async dispatch => {

  try {
    const res = await axios.post('/api/questions',values);
    history.push('/questions');
    dispatch({ type: FETCH_USER, payload: res.data});
  } catch(e) {
    window.alert("Please login first!");
  }
};
export const submitAnswer = (qid, body) => async dispatch => {
  try {
    const res = await axios.post('/api/answer', {body:body,qid:qid});
    dispatch({ type: FETCH_USER, payload: res.data});
  } catch(e) {
    window.alert("Please login first!");
  }
};
export const likeQuestion= (qid, vote, history) => async dispatch => {
  try {
    const res = await axios.post('/api/qvote', {qid:qid, vote: vote});
    dispatch({ type: FETCH_USER, payload: res.data});
  } catch(e) {
    window.alert("Please login first!");
    history.push('/profile');
  }
};
export const likeAnswer= (qid, aid, vote, history) => async dispatch => {
  try {
    const res = await axios.post('/api/avote', {qid:qid, aid: aid, vote: vote});
    dispatch({ type: FETCH_USER, payload: res.data});
  } catch(e) {
    window.alert("Please login first!");
    history.push('/profile');
  }
};
export const selectBestAnswer= (qid, aid) => async dispatch => {
  try {
    const res = await axios.post('/api/selectBestAnswer', {qid:qid, aid: aid});
    dispatch({ type: FETCH_USER, payload: res.data});
  } catch(e) {
    window.alert("Please login first!");
  }
};
export const fetchQuestions = (queryMode) => async dispatch => {
  var link;
  switch (queryMode){
    case FETCH_QUESTIONS:
      link = '/api/questions';
      break;
    case FETCH_MYQUESTIONS:
      link = '/api/myquestions';
      break;
    case FETCH_UNANSWERED:
      link = '/api/unanswered';
      break;
    case FETCH_ACTIVEQUESTIONS:
      link = '/api/activequestions';
      break;
   case FETCH_POPULARQUESTIONS:
      link = '/api/popularquestions';
      break;
    default:
      link = '/api/questions';
  }
  const res = await axios.get(link);
  dispatch({ type: FETCH_QUESTIONS, payload: res.data });
};
export const fetchQuestion = (qid) => async dispatch => {
  const res = await axios.get('/api/question', {params: { qid: qid}});
  dispatch({ type: FETCH_QUESTION, payload: res.data });
};
export const deleteQuestion = (qid) => async dispatch => {
  const res = await axios.get('/api/deletequestion', {params: { qid: qid}});
  dispatch({ type: DELETE_QUESTION, payload: res.data });
};
