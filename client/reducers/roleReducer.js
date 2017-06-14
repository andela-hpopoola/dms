import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Roles Reducer
 * @desc Handles Authentication Action
 * @param {object} state the role information
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function roles(state = initialState.roles, action) {
  switch (action.type) {

    case types.ADD_NEW_ROLE:
      return action.role;

    case types.UPDATE_EXISTING_ROLE:
      return action.role;

    default:
      return state;
  }
}
