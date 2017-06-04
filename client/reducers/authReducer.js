import * as types from '../actions/actionTypes';
import { setToken } from '../utils/auth';

/**
 * Authentication  Reducer
 * @desc Handles Authentication Action
 * @param {boolean} state the current state of auth
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function auth(state = false, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      setToken(action.token);
      return true;

    case types.LOGIN_ERROR:
      return false;

    default:
      return state;
  }
}
