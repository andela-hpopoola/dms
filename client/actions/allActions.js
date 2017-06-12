import * as toastr from 'toastr';
import * as types from './actionTypes';
import api from './../utils/api';

/**
 * Get All Users
 * @desc Get all the users in the database
 * @param {array} users - list of all users
 * @returns {object} action
 */
export function getAllUsers(users) {
  return {
    type: types.GET_ALL_USERS,
    users
  };
}

/**
 * Get Users
 * @desc View an existing document
 * @param {number} id document id
 * @returns {object} action
 */
export function getUsers() {
  return (dispatch) => {
    api.get('/users').then((result) => {
      if (result.status === 200) {
        dispatch(getAllUsers(result.data));
      } else {
        toastr.error(result.data.msg);
      }
    }).catch((error) => {
      if (error.response) {
        // if the server responded with a status code
        // that falls out of the range of 2xx
        toastr.error(error.response);
      } else {
        toastr.error(error);
      }
    });
  };
}

/**
 * Get All Roles
 * @desc Get all the roles in the database
 * @param {array} roles - list of all roles
 * @returns {object} action
 */
export function getAllRoles(roles) {
  return {
    type: types.GET_ALL_ROLES,
    roles
  };
}

/**
 * Get Roles
 * @desc View an existing document
 * @param {number} id document id
 * @returns {object} action
 */
export function getRoles() {
  return (dispatch) => {
    api.get('/roles').then((result) => {
      if (result.status === 200) {
        dispatch(getAllRoles(result.data));
      } else {
        toastr.error(result.data.msg);
      }
    }).catch((error) => {
      if (error.response) {
        // if the server responded with a status code
        // that falls out of the range of 2xx
        toastr.error(error.response);
      } else {
        toastr.error(error);
      }
    });
  };
}
