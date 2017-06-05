import * as types from '../actions/actionTypes';

/**
 * Users Reducer
 * @desc Handles Authentication Action
 * @param {object} state the user information
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function user(state = {}, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return Object.assign({}, ...state, action.user);

    default:
      return state;
  }
}
