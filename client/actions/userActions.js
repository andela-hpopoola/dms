import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import { deauthenticateUser, authenticateUser } from './authActions';
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
 * Logout Current User
 * @desc Logs out the current user
 * @returns {object} action
 */
export function logoutCurrentUser() {
  return {
    type: types.LOGOUT_CURRENT_USER,
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
        dispatch(authenticateUser(result.data.token));
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
 * login by Token
 * @desc Logs a user into the application
 * @param {object} token saved token in LocalStorage
 * @returns {object} action
 */
export function loginByToken(token) {
  return (dispatch) => {
    api.get('/users/login/token', token).then((result) => {
      if (result.status === 200) {
        dispatch(setCurrentUser(result.data));
        dispatch(authenticateUser(result.data.token));
        browserHistory.push('/dashboard');
        // toastr.success('Authomatically logged in');
      } else {
        dispatch(deauthenticateUser());
      }
    }).catch((error) => {
      dispatch(deauthenticateUser());
      toastr.error(error);
    });
  };
}


/**
 * logout
 * @desc logs a user out
 * @returns {object} action
 */
export function logout() {
  return (dispatch) => {
    dispatch(logoutCurrentUser());
    dispatch(deauthenticateUser());
    browserHistory.push('/');
    toastr.info('You have successfully signed out');
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
        toastr.success('Your Account has been successfully created');
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
 * addNewDocument
 * @desc adds a new document to users list of document
 * @param {object} document details
 * @returns {object} action
 */
export function addNewDocument(document) {
  return {
    type: types.ADD_NEW_DOCUMENT,
    document
  };
}

/**
 * Update Existing Document
 * @desc Update a Single Document
 * @param {object} updatedDocument - the updated Document
 * @returns {object} action
 */
export function updateExistingDocument(updatedDocument) {
  console.log(updatedDocument, 'updatedDocument');
  return {
    type: types.UPDATE_EXISTING_DOCUMENT,
    updatedDocument
  };
}
