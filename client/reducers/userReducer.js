import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Users Reducer
 * @desc Handles Authentication Action
 * @param {object} state the user information
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function user(state = initialState.user, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return Object.assign({}, state, action.user);

    case types.LOGOUT_CURRENT_USER:
      return Object.assign({}, state, {});

    case types.ADD_NEW_DOCUMENT:
      return Object.assign(
        {},
        state,
        {
          documents: state.documents.concat(
            [action.document]
          )
        }
      );

    case types.UPDATE_EXISTING_DOCUMENT:
      const filteredDocuments = state.documents.filter(
        document => document.id !== action.updatedDocument.id
      );
      console.log([action.updatedDocument, ...filteredDocuments]);
      console.log(action.updatedDocument, 'document');
      return Object.assign(
        {},
        state,
        {
          documents: [action.updatedDocument, ...filteredDocuments]
        },
      );

    default:
      return state;
  }
}