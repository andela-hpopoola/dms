import * as types from './actionTypes';

/**
 * setCurrentUser
 * @desc Sets details of current logged in user
 * @param {object} user details of current user
 * @returns {object} action
 */
export default function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}
