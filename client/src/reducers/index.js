import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer'

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  questions: questionsReducer
});
