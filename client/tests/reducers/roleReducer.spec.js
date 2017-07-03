import expect from 'expect';
import roleReducer from '../../reducers/roleReducer';
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
});
