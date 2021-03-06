import expect from 'expect';
import allReducer from '../../reducers/allReducer';
import * as actions from '../../actions/allActions';
import * as userActions from '../../actions/userActions';
import * as roleActions from '../../actions/roleActions';
import initialState from '../../reducers/initialState';
import { MOCK_USER } from './../../../constants';

describe('All Reducer', () => {
  it('should return default state when action is not handled', () => {
    const actionType = { type: 'DOES NOT EXIST' };
    const expected = allReducer(initialState.all, actionType);
    const actual = initialState.all;
    expect(actual).toEqual(expected);
  });

  it('should get all users for GET_ALL_USERS', () => {
    const allUsers = [MOCK_USER.SUPERADMIN, MOCK_USER.ADMIN];
    const actionType = actions.getAllUsers(allUsers);
    const newState = allReducer(initialState.all, actionType);
    const expected = 2;
    const actual = newState.users.length;
    expect(actual).toEqual(expected);
  });

  it('should get all users for DELETE_EXISTING_USER', () => {
    const allUsers = {
      users: [MOCK_USER.ADMIN, MOCK_USER.USER]
    };
    const actionType = userActions.deleteExistingUser(2);
    const newState = allReducer(allUsers, actionType);
    const expected = 1;
    const actual = newState.users.length;
    expect(actual).toEqual(expected);
  });

  it('should get all users for GET_ALL_ROLES', () => {
    const allRoles = [MOCK_USER.SUPERADMIN, MOCK_USER.ADMIN, MOCK_USER.USER];
    const actionType = actions.getAllRoles(allRoles);
    const newState = allReducer(initialState.all, actionType);
    const expected = 3;
    const actual = newState.roles.length;
    expect(actual).toEqual(expected);
  });

  it('should get all users for ADD_NEW_ROLES', () => {
    const Roles = {
      roles: [MOCK_USER.SUPERADMIN, MOCK_USER.ADMIN, MOCK_USER.USER]
    };
    const newRole = 'New Role';
    const actionType = roleActions.addNewRole(newRole);
    const newState = allReducer(Roles, actionType);
    const expected = 4;
    const actual = newState.roles.length;
    expect(actual).toEqual(expected);
  });

  it('should get all roles for DELETE_EXISTING_ROLE', () => {
    const allRoles = {
      roles: [MOCK_USER.SUPERADMIN, MOCK_USER.ADMIN, MOCK_USER.USER]
    };
    const actionType = roleActions.deleteExistingRole(2);
    const newState = allReducer(allRoles, actionType);
    const expected = 2;
    const actual = newState.roles.length;
    expect(actual).toEqual(expected);
  });

  it('should get all search result for SEARCH_FOR_USERS', () => {
    const searchResults = [MOCK_USER.SUPERADMIN, MOCK_USER.ADMIN, MOCK_USER.USER];
    const actionType = userActions.searchForUsers(searchResults);
    const newState = allReducer(searchResults, actionType);
    const expected = 3;
    const actual = newState.search.length;
    expect(actual).toEqual(expected);
  });
});
