import {
  GET_LEAGUE,
  LEAGUE_ERROR,
  GET_TEAM,
  TEAM_ERROR,
  GET_PLAYERS,
  PLAYERS_ERROR,
  GET_PLAYER,
  PLAYER_ERROR,
  GET_PLAYER_HONOURS,
  PLAYER_HONOURS_ERROR,
  GET_PLAYER_FORMER,
  PLAYER_FORMER_ERROR,
  GET_PLAYER_CONTRACT,
  PLAYER_CONTRACT_ERROR,
  GET_ALL_LEAGUE,
  ALL_LEAGUE_ERROR
} from '../actions/types';
const INITIAL_STATE = {
  league: '',
  teamDetails: '',
  playerByTeam: '',
  playerDetails: '',
  playerHonours: '',
  playerFormer: '',
  playerContract: '',
  errorMessage: '',
  allLeagues: ''
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
    case GET_PLAYER:
      return { ...state, playerDetails: action.payload || false };
    case PLAYER_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_PLAYER_HONOURS:
      return { ...state, playerHonours: action.payload || false };
    case PLAYER_HONOURS_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_PLAYER_FORMER:
      return { ...state, playerFormer: action.payload || false };
    case PLAYER_FORMER_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_PLAYER_CONTRACT:
      return { ...state, playerContract: action.payload || false };
    case PLAYER_CONTRACT_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_TEAM:
      return { ...state, teamDetails: action.payload || false };
    case TEAM_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_ALL_LEAGUE:
      return { ...state, allLeagues: action.payload || false };
    case ALL_LEAGUE_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
}
