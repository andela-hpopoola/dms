import * as types from './actionTypes';

/**
 * Ajax Call Start
 * @export
 * @desc Signals the application that an ajax call is in progress
 * @returns {object} action
 */
export function ajaxCallStart() {
  return {
    type: types.AJAX_CALL_START
  };
}

/**
 * Ajax Call End
 * @export
 * @desc Signals the application that the ajax call has ended
 * @returns {object} action
 */
export function ajaxCallEnd() {
  return {
    type: types.AJAX_CALL_END
  };
}
