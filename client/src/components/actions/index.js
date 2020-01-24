import keys from '../../config/keys';
import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  EDIT_USER,
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
  EVENT_DETAILS_ERROR,
  GET_ARTICLE,
  ARTICLE_ERROR
} from './types';
import * as JWT from 'jwt-decode';

///////////////////////////////// User Authentification ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// Signup with Passport JWT
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signup`, formProps);
    localStorage.setItem('token', response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
      callback(); /* history callback */
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

// Signin with Passport JWT
export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signin`, formProps);
    localStorage.setItem('token', response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
      callback(); /* history callback */
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

// Signout User by Auth or Passport JWT
export const signout = () => async dispatch => {
  // Signout for Auth(Google, insta, linkedin, facebook)
  await axios.get('/api/logout');
  dispatch({ type: AUTH_USER, payload: '' });
  localStorage.removeItem('token');
  dispatch({ type: AUTH_ERROR, payload: '' });
};

// Fetch the user by Passport JWT
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  let token = localStorage.token;
  if (token) {
    // Decode token
    token = JWT(token);
    // let token to variable data
    let data = token;
    data = {
      id: data.sub,
      email: data.email
    };
    const response = await axios.get(`/api/user/${data.id}`);
    dispatch({ type: AUTH_USER, payload: response.data });
  } else {
    token = null;
    dispatch({ type: AUTH_USER, payload: res.data });
  }
};

// Edit User
export const editUser = (id, formValues, callback) => async dispatch => {
  try {
    dispatch({ type: AUTH_ERROR, payload: '' });
    const response = await axios.post(`/api/user/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

// Edit delete
export const deleteUser = (id, callback) => async dispatch => {
  await axios.delete(`/api/user/${id}`);
  dispatch({ type: EDIT_USER, payload: '' });
  localStorage.removeItem('token');
  callback(); /* history callback */
};

///////////////////////////////////////////API Soccer/////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Get  All Team by League
export const competition = (league, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${league}`
    );
    dispatch({ type: GET_LEAGUE, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: LEAGUE_ERROR, payload: 'cannot find the league' });
  }
};

//Get League Details
export const leagueDetails = id => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`
    );
    dispatch({ type: GET_LEAGUE_DETAILS, payload: response.data });
  } catch (e) {
    dispatch({
      type: LEAGUE_DETAILS_ERROR,
      payload: 'cannot find the league details'
    });
  }
};

// Get Team
export const teamDetail = (id, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`
    );
    dispatch({ type: GET_TEAM, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: TEAM_ERROR, payload: 'cannot find the team' });
  }
};

//Get Player by Team
export const playersByTeam = (team, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=${team}`
    );
    dispatch({ type: GET_PLAYERS, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: PLAYERS_ERROR, payload: 'cannot find the players' });
  }
};

// Get player details
export const playerDetails = (id, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${id}`
    );
    dispatch({ type: GET_PLAYER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: PLAYER_ERROR, payload: 'cannot find the player' });
  }
};

// Get Player Honours
export const PlayerHonours = (id, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookuphonors.php?id=${id}`
    );
    dispatch({ type: GET_PLAYER_HONOURS, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({
      type: PLAYER_HONOURS_ERROR,
      payload: 'cannot find the Honours'
    });
  }
};

// Get player Former Team
export const playerFormer = (id, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookupformerteams.php?id=${id}`
    );
    dispatch({ type: GET_PLAYER_FORMER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({
      type: PLAYER_FORMER_ERROR,
      payload: 'cannot find the Former Team'
    });
  }
};

// Get Player Contract
export const playerContract = (id, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookupcontracts.php?id=${id}`
    );
    dispatch({ type: GET_PLAYER_CONTRACT, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({
      type: PLAYER_CONTRACT_ERROR,
      payload: 'cannot find the Contract'
    });
  }
};

// Get All League
export const allLeagues = () => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/all_leagues.php`
    );
    dispatch({ type: GET_ALL_LEAGUE, payload: response.data });
  } catch (e) {
    dispatch({
      type: ALL_LEAGUE_ERROR,
      payload: 'cannot find the leagues'
    });
  }
};

// Get Next 5 Events by Team Id
export const next5EventsByTeam = id => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${id}`
    );
    dispatch({ type: GET_NEXT_EVENT_TEAM, payload: response.data });
  } catch (e) {
    dispatch({
      type: NEXT_EVENT_TEAM_ERROR,
      payload: 'cannot find the leagues'
    });
  }
};

// Last 5 Events by Team Id
export const last5EventsByTeam = id => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${id}`
    );
    dispatch({ type: GET_LAST_EVENT_TEAM, payload: response.data });
  } catch (e) {
    dispatch({
      type: LAST_EVENT_TEAM_ERROR,
      payload: 'cannot find the leagues'
    });
  }
};

// Get Table League by Season
export const tableLeague = id => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${id}`
    );
    dispatch({ type: GET_TABLE_LEAGUE, payload: response.data });
  } catch (e) {
    dispatch({
      type: TABLE_LEAGUE_ERROR,
      payload: 'cannot find the table league'
    });
  }
};

// Get Event by league Season
export const eventByLeague = id => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=${id}`
    );
    dispatch({ type: GET_EVENT_LEAGUE, payload: response.data });
  } catch (e) {
    dispatch({
      type: EVENT_LEAGUE_ERROR,
      payload: 'cannot find the event leagues'
    });
  }
};

//Get Event Details
export const eventDetails = id => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=${id}`
    );
    dispatch({ type: GET_EVENT_DETAILS, payload: response.data });
  } catch (e) {
    dispatch({
      type: EVENT_DETAILS_ERROR,
      payload: 'cannot find the event details'
    });
  }
};

//Get player by name
export const playerByName = name => async dispatch => {
  try {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${name}`
    );
    dispatch({ type: GET_PLAYER, payload: response.data });
  } catch (e) {
    dispatch({
      type: PLAYER_ERROR,
      payload: 'cannot find the player'
    });
  }
};

///////////////////////////////////////// Scrapping Ohohoh //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

export const scrapNews = id => async dispatch => {
  try {
    const response = await axios.get(`${keys.siteUrl}/api/league/${id}`);
    dispatch({ type: GET_ARTICLE, payload: response.data });
  } catch (e) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: 'cannot find Article'
    });
  }
};
