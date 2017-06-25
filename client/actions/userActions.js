import { browserHistory } from 'react-router';
import * as toastr from 'toastr';
import api from './../utils/api';
import * as types from './actionTypes';
import { deauthenticateUser, authenticateUser } from './authActions';
import setAuthToken from './../utils/setAuthToken';
import { ajaxCallStart, ajaxCallEnd } from './ajaxStatusActions';

/**
 * setCurrentUser
 * @desc Sets details of current logged in user
 * @param {object} user details of current user
 * @returns {object} action
 */
export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  };
}

// /**
//  * setCurrentUser Role
//  * @desc Set the role of current user
//  * @param {number} roleName - the role id of current user
//  * @returns {object} action
//  */
// export function setCurrentUserRole(roleName) {
//   return {
//     type: types.SET_CURRENT_USER_ROLE,
//     roleName
//   };
// }
// /**
//  * setCurrentUser Role
//  * @desc Set the role of current user
//  * @param {number} roleId - the role id of current user
//  * @returns {object} action
//  */
// export function setCurrentRole(roleId) {
//   return (dispatch) => {
//     api.get(`/roles/${roleId}`).then((result) => {
//       if (result.status === 200) {
//         dispatch(setCurrentUserRole(result.data.title));
//       } else {
//         dispatch(setCurrentUserRole('User'));
//       }
//     }).catch(() => {
//       dispatch(setCurrentUserRole('Unknown'));
//     });
//   };
// }

/**
 * Logout Current User
 * @desc Logs out the current user
 * @returns {object} action
 */
export function logoutCurrentUser() {
  return {
    type: types.LOGOUT_CURRENT_USER,
  };
}

/**
 * Update User Profile
 * @desc Update the users profile
 * @param {object} updatedProfile - the updated Profile
 * @returns {object} action
 */
export function updateUserProfile(updatedProfile) {
  return {
    type: types.UPDATE_USER_PROFILE,
    updatedProfile
  };
}

/**
 * Update Profile
 * @desc Update an existing profile
 * @param {object} updatedProfile - updated profile details
 * @param {object} currentProfile - current profile details
 * @returns {object} action
 */
export function updateProfile(updatedProfile, currentProfile) {
  return (dispatch) => {
    const id = currentProfile.id;
    return api.put(`/users/${id}`, updatedProfile).then(() => {
      updatedProfile = { ...currentProfile, ...updatedProfile };
      dispatch(updateUserProfile(updatedProfile));
      toastr.info('Profile updated successfully');
      browserHistory.push('/dashboard');
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}

/**
 * login
 * @desc Logs a user into the application
 * @param {object} user details - email and password
 * @returns {object} action
 */
export function login(user) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    return api.post('/users/login', user).then((result) => {
      if (result.status === 200) {
        setAuthToken(result.data.token);
        dispatch(authenticateUser(result.data.token));
        dispatch(setCurrentUser(result.data));
        browserHistory.push('/dashboard');
      } else {
        toastr.error(result.data.msg);
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}

/**
 * logout
 * @desc logs a user out
 * @returns {object} action
 */
export function logout() {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    return api.get('/users/logout').then(() => {
      dispatch(logoutCurrentUser());
      dispatch(deauthenticateUser());
      browserHistory.push('/');
      toastr.info('You have successfully signed out');
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}


/**
 * signup
 * @desc Signs up a new user
 * @param {object} user details - name, email and password
 * @returns {object} action
 */
export function signup(user) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    return api.post('/users', user).then((result) => {
      if (result.status === 200) {
        dispatch(login(user));
        toastr.success('Your Account has been successfully created');
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
 * Delete Existing User
 * @desc Delete a Single User
 * @param {number} id - the deleted User
 * @returns {object} action
 */
export function deleteExistingUser(id) {
  return {
    type: types.DELETE_EXISTING_USER,
    id
  };
}

/**
 * Delete Document
 * @desc Deletes an existing document
 * @param {number} id - document id
 * @returns {object} action
 */
export function deleteUser(id) {
  return (dispatch) => {
    const url = `/users/${id}`;
    return api.delete(url).then(() => {
      dispatch(deleteExistingUser(id));
      toastr.success('User deleted successfully');
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}


/**
 * Search for Users
 * @param {array} users - all returned role users
 * @param {number} usersType type of user to search for
 * @desc Get all role users
 * @returns {object} action
 */
export function searchForUsers(users) {
  return {
    type: types.SEARCH_FOR_USERS,
    users
  };
}

/**
 * Search Users Dispatcher
 * @param {string} userTitle the title of the user to search for
 * @param {number} usersType type of user to search for
 * @desc Get all searched users
 * @returns {object} action
 */
export function getSearchedUsers(userTitle) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    return api.get(`/search/users/?q=${userTitle}`).then((result) => {
      if (result.data.data.length === 0) {
        toastr.info('No search result found');
      } else {
        dispatch(searchForUsers(result.data));
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}
