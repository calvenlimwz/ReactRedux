import { FETCH_QUESTION, FETCH_QUESTIONS, FETCH_MYQUESTIONS,DELETE_QUESTION,FETCH_UNANSWERED, FETCH_ACTIVEQUESTIONS, FETCH_POPULARQUESTIONS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_QUESTION:
    case FETCH_QUESTIONS:
    case FETCH_MYQUESTIONS:
    case FETCH_UNANSWERED:
    case FETCH_ACTIVEQUESTIONS:
    case FETCH_POPULARQUESTIONS:
    case DELETE_QUESTION:
      return action.payload;
    default:
      return state;
  }
}
