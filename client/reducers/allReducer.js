import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Users Reducer
 * @desc Handles Authentication Action
 * @param {object} state the user information
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function user(state = initialState.user, action) {
  switch (action.type) {

    case types.GET_ALL_USERS:
      return Object.assign(
        {},
        state,
        { users: action.users }
      );

    case types.GET_ALL_ROLES:
      return Object.assign(
        {},
        state,
        { roles: action.roles }
      );

    default:
      return state;
  }
}
