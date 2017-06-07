import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import { addNewDocument, updateExistingDocument, deleteExistingDocument } from './userActions';
import api from './../utils/api';
import * as toastr from '../utils/toastr';
import { ajaxCallStart, ajaxCallEnd } from './ajaxStatusActions';

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
        browserHistory.push('/dashboard');
      } else {
        toastr.error(result.data.msg);
      }
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      if (error.response) {
        // if the server responded with a status code
        // that falls out of the range of 2xx
        toastr.error(error.response);
      } else {
        toastr.error(error);
      }
      dispatch(ajaxCallEnd());
    });
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
 * Get Document
 * @desc View an existing document
 * @param {object} updatedDocument - updated document details
 * @param {object} currentDocument - current document details
 * @returns {object} action
 */
export function updateDocument(updatedDocument, currentDocument) {
  return (dispatch) => {
    const id = currentDocument.id;
    api.put(`/documents/${id}`, updatedDocument).then(() => {
      updatedDocument = { ...currentDocument, ...updatedDocument };
      dispatch(updateExistingDocument(updatedDocument));
      browserHistory.push('/dashboard');
      toastr.success('Document updated successfully');
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
 * Delete Document
 * @desc Deletes an existing document
 * @param {number} id - document id
 * @returns {object} action
 */
export function deleteDocument(id) {
  return (dispatch) => {
    api.delete(`/documents/${id}`).then(() => {
      dispatch(deleteExistingDocument(id));
      browserHistory.push('/dashboard');
      toastr.success('Document deleted successfully');
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
 * Get Public Documents
 * @param {array} documents - all returned public documents
 * @desc Get all public documents
 * @returns {object} action
 */
export function getPublicDocument(documents) {
  return {
    type: types.GET_PUBLIC_DOCUMENTS,
    documents
  };
}


/**
 * Public Documents Dispatcher
 * @desc Get all public documents
 * @returns {object} action
 */
export function publicDocumentDispatcher() {
  return (dispatch) => {
    dispatch(ajaxCallStart());
    api.get('/documents').then((result) => {
      dispatch(getPublicDocument(result.data));
      dispatch(ajaxCallEnd());
    }).catch((error) => {
      if (error.response) {
        // if the server responded with a status code
        // that falls out of the range of 2xx
        toastr.error(error.response);
      } else {
        toastr.error(error);
      }
      dispatch(ajaxCallEnd());
    });
  };
}