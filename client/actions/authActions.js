import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import setCurrentUser from './userActions';
import api from './../utils/api';
import * as toastr from '../utils/toastr';
import { ajaxCallStart, ajaxCallEnd } from './ajaxStatusActions';

/**
 * loginSuccess
 * @desc Saves the token upon successful login
 * @param {string} token jwt encoded token to authentication
 * @returns {object} action
 */
export function loginSuccess(token) {
  return {
    type: types.LOGIN_SUCCESS,
    token
  };
}

/**
 * login
 * @desc Logs a user into the application
 * @param {object} user details - email and password
 * @returns {object} action
 */
export function login(user) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.post('/users/login', user).then((result) => {
      if (result.status === 200) {
        dispatch(setCurrentUser(result.data));
        dispatch(loginSuccess(result.data.token));
        browserHistory.push('/dashboard');
      } else {
        toastr.error('Invalid UserName or Password');
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        toastr.error(error.response);
      } else {
        toastr.error(error);
      }
      dispatch(ajaxCallEnd());
    });
  };
}
