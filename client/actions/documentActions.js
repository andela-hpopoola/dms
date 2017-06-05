import { browserHistory } from 'react-router';
import * as types from './actionTypes';
import { addNewDocument } from './userActions';
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
 * viewExistingDocument
 * @desc View a Single Document
 * @param {object} document details
 * @returns {object} action
 */
export function viewExistingDocument(document) {
  return {
    type: types.VIEW_EXISTING_DOCUMENT,
    document
  };
}

/**
 * view Document
 * @desc View an existing document
 * @param {number} id document id
 * @returns {object} action
 */
export function viewDocument(id) {
  return (dispatch) => {
    api.get(`/documents/${id}`).then((result) => {
      dispatch(viewExistingDocument(result.data));
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
