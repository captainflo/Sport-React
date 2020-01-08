import { GET_LEAGUE, LEAGUE_ERROR } from '../actions/types';
const INITIAL_STATE = {
  league: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LEAGUE:
      return { ...state, league: action.payload || false };
    case LEAGUE_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
