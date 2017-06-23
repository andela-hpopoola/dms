import expect from 'expect';
import * as types from './../../actions/actionTypes';
import ajaxStatusReducer from './../../reducers/ajaxStatusReducer';
import initialState from './../../reducers/initialState';

describe('Ajax Status Reducer', () => {
  it('should return true for AJAX_CALL_START', () => {
    const actionType = { type: types.AJAX_CALL_START };
    const action = ajaxStatusReducer(initialState.ajaxStatus, actionType);
    const expected = true;
    expect(action).toEqual(expected);
  });

  it('should return false for AJAX_CALL_END', () => {
    const actionType = { type: types.AJAX_CALL_END };
    const action = ajaxStatusReducer(initialState.ajaxStatus, actionType);
    const expected = false;
    expect(action).toEqual(expected);
  });

  it('should return default state when action is not handled', () => {
    const actionType = { type: 'DOES_NOT_EXIST' };
    const expected = ajaxStatusReducer(initialState.ajaxStatus, actionType);
    const actual = initialState.ajaxStatus;
    expect(actual).toEqual(expected);
  });
});
