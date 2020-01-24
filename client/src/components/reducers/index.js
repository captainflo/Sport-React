import { combineReducers } from 'redux';
import auth from './auth';
import league from './league';
import article from './article';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: auth,
  form: formReducer,
  league: league,
  article: article
});
