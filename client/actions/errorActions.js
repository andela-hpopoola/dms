import * as types from './actionTypes';

/**
 * setErrorMessage
 * @desc Displays Error Message on all Pages
 * @param {string} message the error message to display
 * @returns {object} action
 */
export default function setErrorMessage(message) {
  return {
    type: types.SET_ERROR_MESSAGE,
    message
  };
}
