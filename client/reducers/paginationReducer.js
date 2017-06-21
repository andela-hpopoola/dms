import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Paginationn Reducer
 * @desc Handles All Pagination
 * @param {object} state the default pagination
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function pagination(state = initialState.pagination, action) {
  switch (action.type) {

    case types.SET_PAGINATION: {
      return { ...state, ...action.pagination };
    }

    default:
      return state;
  }
}
