import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import loginSuccess from './authActions';
import api from './../utils/api';
import * as toastr from '../utils/toastr';
import { ajaxCallStart, ajaxCallEnd } from './ajaxStatusActions';

/**
 * setCurrentUser
 * @desc Sets details of current logged in user
 * @param {object} user details of current user
 * @returns {object} action
 */
export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
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
        toastr.error(result.data.msg);
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      if (error.response) {
        // if the server responded with a status code
        // that falls out of the range of 2xx
        toastr.error(error.response);
      } else {
        toastr.error(error);
      }
      dispatch(ajaxCallEnd());
    });
  };
}


/**
 * signup
 * @desc Signs up a new user
 * @param {object} user details - name, email and password
 * @returns {object} action
 */
export function signup(user) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.post('/users', user).then((result) => {
      if (result.status === 200) {
        dispatch(login(user));
      } else {
        toastr.error(result.data.msg);
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      if (error.response) {
        // if the server responded with a status code
        // that falls out of the range of 2xx
        toastr.error(error.response);
      } else {
        toastr.error(error);
      }
      dispatch(ajaxCallEnd());
    });
  };
}
