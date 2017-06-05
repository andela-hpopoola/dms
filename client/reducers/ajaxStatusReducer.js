import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Ajax Status Reducer
 * @desc Handles Ajax Action
 * @param {boolean} state the current state of ajax
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function ajaxStatusReducer(
  state = initialState.ajaxCallsInProgress, action
) {
  switch (action.type) {
    case types.AJAX_CALL_START:
      return true;

    case types.AJAX_CALL_END:
      return false;

    default:
      return state;
  }
}
