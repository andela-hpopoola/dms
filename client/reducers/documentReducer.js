import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Users Reducer
 * @desc Handles Authentication Action
 * @param {object} state the user information
 * @param {function} action the action to check
 * @returns {any} any
 */
export default function document(state = initialState.documents, action) {
  switch (action.type) {
    case types.ADD_NEW_DOCUMENT:
      return Object.assign(
        {},
        state,
        {
          private: state.private.concat(
            [action.document]
          )
        }
      );

    case types.UPDATE_EXISTING_DOCUMENT: {
      const filteredDocuments = state.private.filter(
        updatedDocument => updatedDocument.id !== action.updatedDocument.id
      );
      return Object.assign(
        {},
        state,
        {
          private: [action.updatedDocument, ...filteredDocuments]
        },
      );
    }

    case types.DELETE_EXISTING_DOCUMENT: {
      const filteredDocuments = state.private.filter(
        deletedDocument => deletedDocument.id !== parseInt(action.id, 10)
      );
      return Object.assign(
        {},
        state,
        {
          private: filteredDocuments
        },
      );
    }

    case types.GET_DOCUMENT_DETAILS:
      return Object.assign(
        {},
        state,
        {
          current: action.document
        }
      );

    case types.GET_CURRENT_DOCUMENTS:
      return Object.assign(
        {},
        state,
        {
          current: action.documents
        }
      );

    case types.SEARCH_FOR_DOCUMENTS: {
      return Object.assign(
        {},
        state,
        {
          current: action.documents
        }
      );
    }

    case types.GET_PUBLIC_DOCUMENTS:
      return Object.assign(
        {},
        state,
        {
          public: action.documents
        }
      );

    case types.GET_PRIVATE_DOCUMENTS:
      return Object.assign(
        {},
        state,
        {
          private: action.documents
        }
      );

    case types.GET_ROLE_DOCUMENTS:
      return Object.assign(
        {},
        state,
        {
          role: action.documents
        }
      );

    default:
      return state;
  }
}
