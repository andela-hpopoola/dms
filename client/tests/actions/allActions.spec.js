
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

import * as allActions from './../../actions/allActions';
import * as types from './../../actions/actionTypes';
import api from './../../utils/api';
import { LIMIT } from './../../../constants';


// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const users = ['user1', 'user2'];

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

  // describe('Get Users Thunk', () => {
  //   it('should dispatch authenticateUser', (done) => {
  //     const limit = LIMIT.USERS;
  //     const offset = 0;
  //     moxios.stubRequest(`/users/?limit=${limit}&offset=${offset}`, {
  //       status: 200,
  //       response: { data: { data: 'result', pagination: '1' } }
  //     });

  //     const expected = [
  //       { type: types.GET_ALL_USERS, users },
  //       { type: types.SET_PAGINATION, pagination: '1' }
  //     ];

  //     const store = mockStore();

  //     return store.dispatch(allActions.getUsers())
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expected);
  //       });
  //   });
  // });
});
