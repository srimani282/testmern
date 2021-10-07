import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { Redirect } from 'react-router-dom';

// Load User
export const loadUser = () => async dispatch => {
  try {
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    const res = await api.get('/users/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };
  try {
    const res = await api.post('/auth', body);

    localStorage.setItem('token', res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logoutUser = () => ({ type: LOGOUT });
