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
  ALL_LEAGUE_ERROR,
  GET_NEXT_EVENT_TEAM,
  NEXT_EVENT_TEAM_ERROR,
  GET_LAST_EVENT_TEAM,
  LAST_EVENT_TEAM_ERROR,
  GET_LEAGUE_DETAILS,
  LEAGUE_DETAILS_ERROR,
  GET_EVENT_LEAGUE,
  EVENT_LEAGUE_ERROR,
  GET_TABLE_LEAGUE,
  TABLE_LEAGUE_ERROR,
  GET_EVENT_DETAILS,
  EVENT_DETAILS_ERROR
} from '../actions/types';
const INITIAL_STATE = {
  league: '',
  leagueDetails: '',
  teamDetails: '',
  nextEventTeam: '',
  lastEventTeam: '',
  playerByTeam: '',
  playerDetails: '',
  playerHonours: '',
  playerFormer: '',
  playerContract: '',
  errorMessage: '',
  allLeagues: '',
  eventLeague: '',
  tableLeague: '',
  eventDetails: ''
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
    case GET_NEXT_EVENT_TEAM:
      return { ...state, nextEventTeam: action.payload || false };
    case NEXT_EVENT_TEAM_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_LAST_EVENT_TEAM:
      return { ...state, lastEventTeam: action.payload || false };
    case LAST_EVENT_TEAM_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_ALL_LEAGUE:
      return { ...state, allLeagues: action.payload || false };
    case ALL_LEAGUE_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_LEAGUE_DETAILS:
      return { ...state, leagueDetails: action.payload || false };
    case LEAGUE_DETAILS_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_EVENT_LEAGUE:
      return { ...state, eventLeague: action.payload || false };
    case EVENT_LEAGUE_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_TABLE_LEAGUE:
      return { ...state, tableLeague: action.payload || false };
    case TABLE_LEAGUE_ERROR:
      return { ...state, errorMessage: action.payload };
    case GET_EVENT_DETAILS:
      return { ...state, eventDetails: action.payload || false };
    case EVENT_DETAILS_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
}
