import * as types from '../actions/actionTypes';
import * as auth from '../utils/auth';

/**
 * Authentication  Reducer
 * @desc Handles Authentication Action
 * @param {boolean} state the current state of auth
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function authenticate(state = false, action) {
  switch (action.type) {
    case types.AUTHENTICATE_USER:
      auth.setToken(action.token);
      return true;

    case types.DEAUTHENTICATE_USER:
      auth.removeToken();
      return false;

    default:
      return state;
  }
}
