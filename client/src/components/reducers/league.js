import {
  GET_LEAGUE,
  LEAGUE_ERROR,
  GET_PLAYERS,
  PLAYERS_ERROR,
  GET_TEAM,
  TEAM_ERROR
} from '../actions/types';
const INITIAL_STATE = {
  league: '',
  teamDetails: '',
  playerByTeam: '',
  errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LEAGUE:
      return { ...state, league: action.payload || false };
    case LEAGUE_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_PLAYERS:
      return { ...state, playerByTeam: action.payload || false };
    case PLAYERS_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_TEAM:
      return { ...state, teamDetails: action.payload || false };
    case TEAM_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
}
