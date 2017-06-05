import * as types from '../actions/actionTypes';

/**
 * Error Message  Reducer
 * @desc Handles Error Action
 * @param {string} state the error message to display
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function error(state = '', action) {
  switch (action.type) {
    case types.SET_ERROR_MESSAGE:
      return action.message;

    default:
      return state;
  }
}
