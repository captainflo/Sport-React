import { GET_ARTICLE, ARTICLE_ERROR } from '../actions/types';
const INITIAL_STATE = {
  articles: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return { ...state, articles: action.payload || false };
    case ARTICLE_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
