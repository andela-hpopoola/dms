import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Users Reducer
 * @desc Handles Authentication Action
 * @param {object} state the user information
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function document(state = initialState.documents, action) {
  switch (action.type) {
    case types.VIEW_EXISTING_DOCUMENT:
      return Object.assign(
        {},
        state,
        {
          current: action.document
        }
      );

    default:
      return state;
  }
}
