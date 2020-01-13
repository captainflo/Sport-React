import keys from '../../config/keys';
import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  EDIT_USER,
  GET_LEAGUE,
  LEAGUE_ERROR,
  GET_PLAYERS,
  PLAYERS_ERROR
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

///////////////////////////////// Sport IO ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// Get League
export const competition = (league, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.sportsdata.io/v3/soccer/scores/json/CompetitionDetails/${league}?key=${keys.api}`
    );
    dispatch({ type: GET_LEAGUE, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: LEAGUE_ERROR, payload: 'cannot find the league' });
  }
};

//Get Player by Team
export const PlayersByTeam = (id, callback) => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.sportsdata.io/v3/soccer/scores/json/PlayersByTeam/${id}?key=${keys.api}`
    );
    dispatch({ type: GET_PLAYERS, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: PLAYERS_ERROR, payload: 'cannot find the players' });
  }
};
