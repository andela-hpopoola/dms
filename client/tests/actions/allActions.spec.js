
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import initialState from './../../reducers/initialState';

import * as allActions from './../../actions/allActions';
import * as types from './../../actions/actionTypes';
import api from './../../utils/api';


// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const users = ['user1', 'user2'];
const roles = ['roles1', 'roles2'];
describe('All Actions', () => {
  beforeEach(() => {
    moxios.install(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  describe('Get All Users', () => {
    it('should get all users', () => {
      const expected = {
        type: types.GET_ALL_USERS,
        users
      };

      const action = allActions.getAllUsers(users);
      expect(action).toEqual(expected);
    });
  });

  describe('Get All Roles', () => {
    it('should get all roles', () => {
      const expected = {
        type: types.GET_ALL_ROLES,
        roles
      };

      const action = allActions.getAllRoles(roles);
      expect(action).toEqual(expected);
    });
  });

  describe('Get Users', () => {
    it('should dispatch authenticate User', (done) => {
      const expected = [
        { type: types.GET_ALL_USERS, users },
        { type: types.SET_PAGINATION, pagination: '1' }
      ];

      const store = mockStore(initialState);

      store.dispatch(allActions.getUsers()).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { data: users, pagination: '1' }
        });
      });
    });
  });

  describe('Get Roles', () => {
    it('should dispatch Get All Roles', (done) => {
      const expected = [{
        type: types.GET_ALL_ROLES,
        roles
      }];

      const store = mockStore(initialState);

      store.dispatch(allActions.getRoles()).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: roles
        });
      });
    });
  });
});
