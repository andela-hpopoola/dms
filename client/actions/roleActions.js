import { browserHistory } from 'react-router';
import * as toastr from 'toastr';
import api from './../utils/api';
import * as types from './actionTypes';
import { ajaxCallStart, ajaxCallEnd } from './ajaxStatusActions';


/**
 * addNewRole
 * @desc adds a new role to users list of role
 * @param {object} role details
 * @returns {object} action
 */
export function addNewRole(role) {
  return {
    type: types.ADD_NEW_ROLE,
    role
  };
}

/**
 * create Role
 * @desc Create a new role
 * @param {object} role details
 * @returns {object} action
 */
export function createRole(role) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.post('/roles', role).then((result) => {
      if (result.status === 200) {
        dispatch(addNewRole(result.data));
        toastr.success('Role successfully created');
      } else {
        toastr.error(result.data.msg);
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}

/**
 * Update Existing Role
 * @desc Update a Single Role
 * @param {object} updatedRole - the updated Role
 * @returns {object} action
 */
export function updateExistingRole(updatedRole) {
  return {
    type: types.UPDATE_EXISTING_ROLE,
    updatedRole
  };
}

/**
 * Delete Existing Role
 * @desc Delete a Single Role
 * @param {number} id - the deleted Role
 * @returns {object} action
 */
export function deleteExistingRole(id) {
  return {
    type: types.DELETE_EXISTING_ROLE,
    id
  };
}

/**
 * Get Role Details
 * @desc View a Single Role
 * @param {object} role details
 * @returns {object} action
 */
export function getAllRoles(role) {
  return {
    type: types.GET_ALL_ROLES,
    role
  };
}

/**
 * Get Role
 * @desc View an existing role
 * @param {object} updatedRole - updated role details
 * @param {object} currentRole - current role details
 * @returns {object} action
 */
export function updateRole(updatedRole, currentRole) {
  return (dispatch) => {
    const id = currentRole.id;
    api.put(`/roles/${id}`, updatedRole).then(() => {
      updatedRole = { ...currentRole, ...updatedRole };
      dispatch(updateExistingRole(updatedRole));
      browserHistory.push('/dashboard');
      toastr.success('Role updated successfully');
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}

/**
 * Delete Role
 * @desc Deletes an existing role
 * @param {number} id - role id
 * @returns {object} action
 */
export function deleteRole(id) {
  return (dispatch) => {
    api.delete(`/roles/${id}`).then(() => {
      dispatch(deleteExistingRole(id));
      browserHistory.push('/dashboard');
      toastr.success('Role deleted successfully');
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}
