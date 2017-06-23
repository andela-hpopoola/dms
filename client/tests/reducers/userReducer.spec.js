import expect from 'expect';
import userReducer from './../../reducers/userReducer';
import * as userActions from './../../actions/userActions';
import initialState from './../../reducers/initialState';

describe('User Reducer', () => {
  it('should set current user with SET_CURRENT_USER', () => {
    const user = { id: 1, name: 'New User' };
    const actionType = userActions.setCurrentUser(user);
    const newState = userReducer(initialState.user, actionType);
    const expected = newState.id;
    const actual = user.id;
    expect(actual).toEqual(expected);
  });

  it('should update an existing user on UPDATE_USER_PROFILE', () => {
    const initialUser = {
      id: 1, name: 'Initial User'
    };
    const updateUser = { name: 'Updated Name' };
    const actionType = userActions.updateUserProfile(updateUser);
    const newState = userReducer(initialUser, actionType);
    const expected = newState.name;
    const actual = updateUser.name;
    expect(actual).toEqual(expected);
  });

  it('should remove user information with LOGOUT_CURRENT_USER', () => {
    const initialUser = {
      id: 1, name: 'Initial User'
    };
    const actionType = userActions.logoutCurrentUser();
    const newState = userReducer(initialUser, actionType);
    const expected = {};
    const actual = newState;
    expect(actual).toEqual(expected);
  });

  it('should return default state when action is not handled', () => {
    const actionType = { type: 'DOES_NOT_EXIST' };
    const expected = userReducer(initialState.user, actionType);
    const actual = initialState.user;
    expect(actual).toEqual(expected);
  });
});
