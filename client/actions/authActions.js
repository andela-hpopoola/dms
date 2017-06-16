import * as toastr from 'toastr';
import * as types from './actionTypes';
import * as auth from '../utils/auth';
import { publicDocumentsDispatcher, roleDocumentsDispatcher
 } from './../actions/documentActions';
/**
 * authenticateUser
 * @desc Saves the token upon successful login
 * @param {string} token jwt encoded token to authentication
 * @returns {object} action
 */
export function authenticateUser(token) {
  return (dispatch) => {
    auth.removeToken();
    auth.setToken(token);
    dispatch({
      type: types.AUTHENTICATE_USER,
      token
    });
    dispatch(publicDocumentsDispatcher());
    dispatch(roleDocumentsDispatcher());
  };
}

/**
 * deauthenticateUser
 * @desc Deletes token and Sets user authentication to false
 * @returns {object} action
 */
export function deauthenticateUser() {
  auth.removeToken();
  return {
    type: types.DEAUTHENTICATE_USER
  };
}


/**
 * unauthorized
 * @desc displays a message for authorized access
 * @returns {object} action
 */
export function unauthorized() {
  return () => {
    toastr.warning('Kindly login to access page');
  };
}
