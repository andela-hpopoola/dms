import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Authentication  Reducer
 * @desc Handles Authentication Action
 * @param {boolean} state the current state of auth
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function authenticate(state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTHENTICATE_USER:
      return true;

    case types.DEAUTHENTICATE_USER:
      return false;

    default:
      return state;
  }
}
