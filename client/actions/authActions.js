import * as types from './actionTypes';
import * as toastr from '../utils/toastr';

/**
 * authenticateUser
 * @desc Saves the token upon successful login
 * @param {string} token jwt encoded token to authentication
 * @returns {object} action
 */
export function authenticateUser(token) {
  return {
    type: types.AUTHENTICATE_USER,
    token
  };
}

/**
 * deauthenticateUser
 * @desc Sets user authentication to false
 * @returns {object} action
 */
export function deauthenticateUser() {
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
