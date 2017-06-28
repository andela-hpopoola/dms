import expect from 'expect';
import * as types from './../../actions/actionTypes';
import authReducer from './../../reducers/authReducer';
import initialState from './../../reducers/initialState';

describe('Ajax Status Reducer', () => {
  it('should return true for AUTHENTICATE_USER', () => {
    const actionType = { type: types.AUTHENTICATE_USER };
    const action = authReducer(initialState.auth, actionType);
    const expected = true;
    expect(action).toEqual(expected);
  });

  it('should return false for DEAUTHENTICATE', () => {
    const actionType = { type: types.DEAUTHENTICATE_USER };
    const action = authReducer(initialState.auth, actionType);
    const expected = false;
    expect(action).toEqual(expected);
  });

  it('should return default state when action is not handled', () => {
    const actionType = { type: 'DOES_NOT_EXIST' };
    const expected = authReducer(initialState.auth, actionType);
    const actual = initialState.auth;
    expect(actual).toEqual(expected);
  });
});
