import expect from 'expect';
import roleReducer from '../../reducers/roleReducer';
import * as actions from '../../actions/roleActions';
import * as userActions from '../../actions/userActions';
import * as roleActions from '../../actions/roleActions';
import initialState from '../../reducers/initialState';

describe('Role Reducer', () => {
  it('should return default state when action is not handled', () => {
    const actionType = { type: 'DOES NOT EXIST' };
    const expected = roleReducer(initialState.role, actionType);
    const actual = initialState.roles;
    expect(actual).toEqual(expected);
  });

  it('should add a new role on ADD_NEW_ROLE', () => {
    const role = { title: 'New Role' };
    const actionType = roleActions.addNewRole(role);
    const newState = roleReducer(initialState.role, actionType);
    const expected = newState.title;
    const actual = role.title;
    expect(actual).toEqual(expected);
  });

  // it('should update an existing role on UPDATE_EXISTING_ROLE', () => {
  //   const initialRole = [
  //     { id: 1, name: 'Super Admin' },
  //     { id: 2, name: 'Admin' }
  //   ];
  //   const updateRole = { id: 2, name: 'User' };
  //   const actionType = roleActions.updateExistingRole(updateRole);
  //   const newState = roleReducer(initialRole, actionType);
  //   const expected = newState.length;
  //   const actual = initialRole.length;
  //   expect(actual).toEqual(expected);
  // });
});
