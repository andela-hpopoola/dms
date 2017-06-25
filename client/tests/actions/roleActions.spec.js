
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import initialState from './../../reducers/initialState';

import * as roleActions from './../../actions/roleActions';
import * as types from './../../actions/actionTypes';
import api from './../../utils/api';


// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const role = 'SuperAdmin';

describe('User Actions', () => {
  beforeEach(() => {
    moxios.install(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  describe('Add New Role', () => {
    it('should add a new role', () => {
      const expected = {
        type: types.ADD_NEW_ROLE,
        role
      };

      const action = roleActions.addNewRole(role);
      expect(action).toEqual(expected);
    });
  });

  describe('Create Role', () => {
    it('should create a new role', (done) => {
      const expected = [{
        type: types.ADD_NEW_ROLE,
        role
      }];

      const store = mockStore(initialState);

      store.dispatch(roleActions.createRole(role)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { role }
        });
      });
    });
  });

  describe('Update Existing Role', () => {
    it('should update an existing role', () => {
      const expected = {
        type: types.UPDATE_EXISTING_ROLE,
        updatedRole: role
      };

      const action = roleActions.updateExistingRole(role);
      expect(action).toEqual(expected);
    });
  });

  describe('Delete Existing Role', () => {
    const id = 1;
    it('should delete an existing role', () => {
      const expected = {
        type: types.DELETE_EXISTING_ROLE,
        id
      };

      const action = roleActions.deleteExistingRole(id);
      expect(action).toEqual(expected);
    });
  });

  describe('Get All Roles', () => {
    it('should get all available roles', () => {
      const expected = {
        type: types.GET_ALL_ROLES,
        role
      };

      const action = roleActions.getAllRoles(role);
      expect(action).toEqual(expected);
    });
  });

  describe('Update Role', () => {
    const currentRole = { id: 1, name: 'SuperAdmin' };
    const updatedRole = { id: 1, name: 'PowerfulAdmin' };
    it('should update an existing role', (done) => {
      const expected = [
        { type: types.UPDATE_EXISTING_ROLES, updatedRole },
      ];

      const store = mockStore(initialState);

      store.dispatch(roleActions.updateRole(updatedRole, currentRole)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { updatedRole }
        });
      });
    });
  });

  describe('Delete Role', () => {
    const id = 1;
    it('should delete an existing role', (done) => {
      const expected = [
        { type: types.DELETE_EXISTING_ROLES, id },
      ];

      const store = mockStore(initialState);

      store.dispatch(roleActions.deleteRole()).then(() => {
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
