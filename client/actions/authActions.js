import * as types from './actionTypes';

/**
 * loginSuccess
 * @desc Saves the token upon successful login
 * @param {string} token jwt encoded token to authentication
 * @returns {object} action
 */
export default function loginSuccess(token) {
  return {
    type: types.LOGIN_SUCCESS,
    token
  };
}
