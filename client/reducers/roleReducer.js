import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Roles Reducer
 * @desc Handles Authentication Action
 * @param {object} state the role information
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function role(state = initialState.role, action) {
  switch (action.type) {

    case types.ADD_NEW_ROLE:
      return state.roles.concat([action.role]);

    case types.UPDATE_EXISTING_ROLE: {
      const filteredRoles = state.roles.filter(
        updatedRole => updatedRole.id !== action.updatedRole.id
      );
      return filteredRoles;
    }
    case types.DELETE_EXISTING_ROLE: {
      const filteredRoles = state.roles.filter(
        deletedRole => deletedRole.id !== parseInt(action.id, 10)
      );
      return filteredRoles;
    }

    default:
      return state;
  }
}
