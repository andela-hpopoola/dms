
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import initialState from './../../reducers/initialState';
import { MOCK_USER } from './../../../constants';
import * as userActions from './../../actions/userActions';
import * as types from './../../actions/actionTypes';
import api from './../../utils/api';


// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const user = MOCK_USER.SUPERADMIN;
const users = [MOCK_USER.ADMIN, MOCK_USER.USER];

describe('User Actions', () => {
  beforeEach(() => {
    moxios.install(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  describe('Set Current User', () => {
    it('should set current user', () => {
      const expected = {
        type: types.SET_CURRENT_USER,
        user
      };

      const action = userActions.setCurrentUser(user);
      expect(action).toEqual(expected);
    });
  });

  describe('Logout current user', () => {
    it('should log out current user', () => {
      const expected = {
        type: types.LOGOUT_CURRENT_USER
      };

      const action = userActions.logoutCurrentUser(user);
      expect(action).toEqual(expected);
    });
  });

  describe('Update User Profile', () => {
    it('should update a user profile', () => {
      const updatedProfile = { id: 1, name: 'Mark' };
      const expected = {
        type: types.UPDATE_USER_PROFILE,
        updatedProfile
      };

      const action = userActions.updateUserProfile(updatedProfile);
      expect(action).toEqual(expected);
    });
  });

  describe('Update Profile', () => {
    it('should update a user profile', (done) => {
      const currentProfile = { id: 1, name: 'Haruna' };
      const updatedProfile = { id: 1, name: 'Mark' };
      const expected = [{
        type: types.UPDATE_USER_PROFILE,
        updatedProfile
      }];

      const store = mockStore(initialState);

      store.dispatch(userActions.updateProfile(updatedProfile, currentProfile)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: 'User has been updated'
        });
      });
    });
  });

  describe('Login', () => {
    it('should login a user', (done) => {
      const token = '123456';
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.AUTHENTICATE_USER, token },
        { type: types.SET_CURRENT_USER, user },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(userActions.login(user)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });
    });
  });

  describe('Logout', () => {
    it('should logout a user', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.LOGOUT_CURRENT_USER },
        { type: types.DEAUTHENTICATE_USER },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(userActions.logout()).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });
    });
  });

  describe('Signup', () => {
    it('should sign up a new user', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.LOGOUT_CURRENT_USER },
        { type: types.DEAUTHENTICATE_USER },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(userActions.signup(user)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });
    });
  });

  describe('Delete existing user', () => {
    it('should delete existing user', () => {
      const id = 1;
      const expected = {
        type: types.DELETE_EXISTING_USER, id
      };

      const action = userActions.deleteExistingUser(id);
      expect(action).toEqual(expected);
    });
  });

  describe('Delete User', () => {
    const id = 1;
    it('should delete user', (done) => {
      const expected = [
        { type: types.DELETE_EXISTING_USER, id }
      ];

      const store = mockStore(initialState);

      store.dispatch(userActions.deleteUser(id)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: 'User has been sucessfully deleted'
        });
      });
    });
  });

  describe('Search For Users', () => {
    it('should search for Users', () => {
      const expected = {
        type: types.SEARCH_FOR_USERS, users
      };

      const action = userActions.searchForUsers(users);
      expect(action).toEqual(expected);
    });
  });

  describe('Search Users Dispatcher', () => {
    it('should search for users', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.SEARCH_FOR_USERS, users },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(userActions.getSearchedUsers('test')).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });
    });
  });
});
