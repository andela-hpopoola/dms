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
    case types.GET_DOCUMENT_DETAILS:
      return Object.assign(
        {},
        state,
        {
          current: action.document
        }
      );

    case types.GET_PUBLIC_DOCUMENTS:
      return Object.assign(
        {},
        state,
        {
          public: action.documents
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

    case types.SEARCH_FOR_DOCUMENTS: {
      const filteredDocuments = action.documents.filter(
        searchDocument => searchDocument.access !== action.documentType
      );
      console.log(filteredDocuments, 'filter in reducer');
      return Object.assign(
        {},
        state,
        {
          search: [...filteredDocuments]
        }
      );
    }

    default:
      return state;
  }
}
