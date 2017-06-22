import { browserHistory } from 'react-router';
import * as toastr from 'toastr';
import api from './../utils/api';
import * as types from './actionTypes';
import { ajaxCallStart, ajaxCallEnd } from './ajaxStatusActions';
import setPagination from './paginationActions';
import { LIMIT } from './../../constants';
import setAuthToken from './../utils/setAuthToken';
import * as auth from './../utils/auth';

// Set the Authentication Token
setAuthToken(auth.getToken());

/**
 * addNewDocument
 * @desc adds a new document to users list of document
 * @param {object} document details
 * @returns {object} action
 */
export function addNewDocument(document) {
  return {
    type: types.ADD_NEW_DOCUMENT,
    document
  };
}


/**
 * create Document
 * @desc Create a new document
 * @param {object} document details
 * @returns {object} action
 */
export function createDocument(document) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.post('/documents', document).then((result) => {
      if (result.status === 200) {
        dispatch(addNewDocument(result.data));
        toastr.success('Document successfully created');
        browserHistory.push('/document/private');
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
 * Update Existing Document
 * @desc Update a Single Document
 * @param {object} updatedDocument - the updated Document
 * @returns {object} action
 */
export function updateExistingDocument(updatedDocument) {
  return {
    type: types.UPDATE_EXISTING_DOCUMENT,
    updatedDocument
  };
}

/**
 * Delete Existing Document
 * @desc Delete a Single Document
 * @param {number} id - the deleted Document
 * @returns {object} action
 */
export function deleteExistingDocument(id) {
  return {
    type: types.DELETE_EXISTING_DOCUMENT,
    id
  };
}


/**
 * Get Document Details
 * @desc View a Single Document
 * @param {object} document details
 * @returns {object} action
 */
export function getDocumentDetails(document) {
  return {
    type: types.GET_DOCUMENT_DETAILS,
    document
  };
}


/**
 * Get Document
 * @desc View an existing document
 * @param {number} id document id
 * @returns {object} action
 */
export function getDocument(id) {
  return (dispatch) => {
    api.get(`/documents/${id}`).then((result) => {
      dispatch(getDocumentDetails(result.data));
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}

/**
 * Update Document
 * @desc Update an existing document
 * @param {object} updatedDocument - updated document details
 * @param {object} currentDocument - current document details
 * @returns {object} action
 */
export function updateDocument(updatedDocument, currentDocument) {
  return (dispatch) => {
    const id = currentDocument.id;
    api.put(`/documents/${id}`, updatedDocument).then((result) => {
      if (result.status === 200) {
        updatedDocument = { ...currentDocument, ...updatedDocument };
        dispatch(updateExistingDocument(updatedDocument));
        browserHistory.push('/document/private');
        toastr.success('Document updated successfully');
      } else {
        toastr.error(result.data.msg);
      }
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}

/**
 * Delete Document
 * @desc Deletes an existing document
 * @param {number} id - document id
 * @returns {object} action
 */
export function deleteDocument(id) {
  return (dispatch) => {
    api.delete(`/documents/${id}`).then(() => {
      dispatch(deleteExistingDocument(id));
      toastr.success('Document deleted successfully');
    }).catch((error) => {
      toastr.error(error.response || error);
    });
  };
}


/**
 * Get Private Documents
 * @param {array} documents - all returned private documents
 * @desc Get all private documents
 * @returns {object} action
 */
export function getPrivateDocuments(documents) {
  return {
    type: types.GET_PRIVATE_DOCUMENTS,
    documents
  };
}


/**
 * Private Documents Dispatcher
 * @desc Get all private documents
 * @param {number} offset - the starting point for pagination
 * @returns {object} action
 */
export function privateDocumentsDispatcher(offset = null) {
  let paginate = false;
  const limit = LIMIT.DOCUMENTS;
  let privateURL = '/documents/private';
  if (offset !== null) {
    paginate = true;
    privateURL = `/documents/private/?limit=${limit}&offset=${offset}`;
  }

  return (dispatch) => {
    dispatch(ajaxCallStart());
    return api.get(privateURL).then((result) => {
      if (result.status === 200) {
        const documents = result.data;
        if (paginate) {
          dispatch(getPrivateDocuments(documents.data));
          dispatch(setPagination(documents.pagination));
        } else {
          dispatch(getPrivateDocuments(documents));
        }
      } else {
        dispatch(getPrivateDocuments([]));
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}

/**
 * Get Public Documents
 * @param {array} documents - all returned public documents
 * @desc Get all public documents
 * @returns {object} action
 */
export function getPublicDocuments(documents) {
  return {
    type: types.GET_PUBLIC_DOCUMENTS,
    documents
  };
}


/**
 * Get Role Documents
 * @param {array} documents - all returned role documents
 * @desc Get all role documents
 * @returns {object} action
 */
export function getRoleDocuments(documents) {
  return {
    type: types.GET_ROLE_DOCUMENTS,
    documents
  };
}

/**
 * Get Role Documents
 * @param {array} documents - all returned role documents
 * @desc Get all role documents
 * @returns {object} action
 */
export function getCurrentDocuments(documents) {
  return {
    type: types.GET_CURRENT_DOCUMENTS,
    documents
  };
}


/**
 * Public Documents Dispatcher
 * @desc Get all public documents
 * @param {string} access - the access type
 * @param {string} query - the search query
 * @param {number} offset - the starting point for pagination
 * @returns {object} action
 */
export function getDocuments(access, query = '', offset = 0) {
  const limit = LIMIT.DOCUMENTS;
  let URL = `/documents/private/?limit=${limit}&offset=${offset}`;

  if (access === 'public') {
    URL = `/documents/public/?limit=${limit}&offset=${offset}`;
  } else if (access === 'role') {
    URL = `/documents/role/?limit=${limit}&offset=${offset}`;
  } else if (access === 'search') {
    URL = `/search/documents/?q=${query}&limit=${limit}&offset=${offset}`;
  }

  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.get(URL).then((result) => {
      if (result.status === 200) {
        dispatch(getCurrentDocuments(result.data));
      } else {
        toastr.info(`No ${access} documents found`);
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}

/**
 * Public Documents Dispatcher
 * @desc Get all public documents
 * @param {number} offset - the starting point for pagination
 * @returns {object} action
 */
export function publicDocumentsDispatcher(offset = null) {
  let paginate = false;
  const limit = LIMIT.DOCUMENTS;
  let publicURL = '/documents/public';
  if (offset !== null) {
    paginate = true;
    publicURL = `/documents/public/?limit=${limit}&offset=${offset}`;
  }

  return (dispatch) => {
    dispatch(ajaxCallStart());
    return api.get(publicURL).then((result) => {
      if (result.status === 200) {
        const documents = result.data;
        if (paginate) {
          dispatch(getPublicDocuments(documents));
        } else {
          dispatch(getPublicDocuments(documents));
        }
      } else {
        dispatch(getPublicDocuments([]));
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}

/**
 * Role Documents Dispatcher
 * @desc Get all role documents
 * @param {number} offset - the starting point for pagination
 * @returns {object} action
 */
export function roleDocumentsDispatcher(offset = null) {
  let paginate = false;
  const limit = LIMIT.DOCUMENTS;
  let roleURL = '/documents/role';
  if (offset !== null) {
    paginate = true;
    roleURL = `/documents/role/?limit=${limit}&offset=${offset}`;
  }

  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.get(roleURL).then((result) => {
      if (result.status === 200) {
        const documents = result.data;
        if (paginate) {
          dispatch(getRoleDocuments(documents.data));
          dispatch(setPagination(documents.pagination));
        } else {
          dispatch(getRoleDocuments(documents));
        }
      } else {
        dispatch(getRoleDocuments([]));
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}

/**
 * Search for Documents
 * @param {array} documents - all returned role documents
 * @param {number} documentsType type of document to search for
 * @desc Get all role documents
 * @returns {object} action
 */
export function searchForDocuments(documents) {
  return {
    type: types.SEARCH_FOR_DOCUMENTS,
    documents
  };
}

/**
 * Search Documents Dispatcher
 * @param {string} documentTitle the title of the document to search for
 * @param {number} documentsType type of document to search for
 * @desc Get all documents
 * @returns {object} action
 */
export function searchDocumentsDispatcher(documentTitle) {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.get(`/search/documents/?q=${documentTitle}`).then((result) => {
      if (result.data.length === 0) {
        toastr.info('No search result found');
        dispatch(ajaxCallEnd());
      } else {
        dispatch(searchForDocuments(result.data));
        dispatch(ajaxCallEnd());
      }
    }).catch((error) => {
      toastr.error(error.response || error);
      dispatch(ajaxCallEnd());
    });
  };
}
