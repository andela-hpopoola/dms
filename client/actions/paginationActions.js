import * as types from './actionTypes';

/**
 * Set Pagination
 * @desc Sets the current pagination
 * @param {array} pagination - list of all users
 * @returns {object} action
 */
export default function setPagination(pagination) {
  return {
    type: types.SET_PAGINATION,
    pagination
  };
}
