import expect from 'expect';
import { MOCK_DOCUMENTS } from './../../../constants';
import documentReducer from './../../reducers/documentReducer';
import * as documentActions from './../../actions/documentActions';
import initialState from './../../reducers/initialState';

describe('Document Reducer', () => {
  it('should add a new document on ADD_NEW_DOCUMENT', () => {
    const document = { id: 1, name: 'New Document' };
    const actionType = documentActions.addNewDocument(document);
    const newState = documentReducer(initialState.document, actionType);
    const expected = 1;
    const actual = newState.private.length;
    expect(actual).toEqual(expected);
  });

  it('should update an existing document on UPDATE_EXISTING_DOCUMENT', () => {
    const initialDocument = {
      current: {
        data: [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC],
        pagination: '123'
      }
    };
    const updateDocument = { id: 2, name: 'Document to Update' };
    const actionType = documentActions.updateExistingDocument(updateDocument);
    const newState = documentReducer(initialDocument, actionType);
    const expected = 2;
    const actual = newState.current.data.length;
    expect(actual).toEqual(expected);
  });

  it('should delete an existing document on DELETE_EXISTING_DOCUMENT', () => {
    const currentDocument = {
      current: {
        data: [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC],
        pagination: '123'
      }
    };
    const actionType = documentActions.deleteExistingDocument(1);

    const newState = documentReducer(currentDocument, actionType);
    const expected = 1;
    const actual = newState.current.data.length;
    expect(actual).toEqual(expected);
  });

  it('should get current documents with GET_CURRENT_DOCUMENTS', () => {
    const allDocuments = [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC];
    const actionType = documentActions.getCurrentDocuments(allDocuments);
    const newState = documentReducer(initialState.documents, actionType);
    const expected = 2;
    const actual = newState.current.length;
    expect(actual).toEqual(expected);
  });

  it('should get document details with GET_DOCUMENT_DETAILS', () => {
    const document = MOCK_DOCUMENTS.PRIVATE;
    const actionType = documentActions.getDocumentDetails(document);
    const newState = documentReducer(initialState.documents, actionType);
    const expected = document.name;
    const actual = newState.currentDocument.name;
    expect(actual).toEqual(expected);
  });

  it('should get searched documents with SEARCH_FOR_DOCUMENTS', () => {
    const searchedDocuments = [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC];
    const actionType = documentActions.getCurrentDocuments(searchedDocuments);
    const newState = documentReducer(initialState.documents, actionType);
    const expected = 2;
    const actual = newState.current.length;
    expect(actual).toEqual(expected);
  });

  it('should get public documents with GET_PUBLIC_DOCUMENTS', () => {
    const publicDocuments = [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC];
    const actionType = documentActions.getPublicDocuments(publicDocuments);
    const newState = documentReducer(initialState.documents, actionType);
    const expected = 2;
    const actual = newState.public.length;
    expect(actual).toEqual(expected);
  });

  it('should get private documents with GET_PRIVATE_DOCUMENTS', () => {
    const privateDocuments = [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC];
    const actionType = documentActions.getPrivateDocuments(privateDocuments);
    const newState = documentReducer(initialState.documents, actionType);
    const expected = 2;
    const actual = newState.private.length;
    expect(actual).toEqual(expected);
  });

  it('should get role documents with GET_ROLE_DOCUMENTS', () => {
    const roleDocuments = [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC];
    const actionType = documentActions.getRoleDocuments(roleDocuments);
    const newState = documentReducer(initialState.documents, actionType);
    const expected = 2;
    const actual = newState.role.length;
    expect(actual).toEqual(expected);
  });

  it('should return default state when action is not handled', () => {
    const actionType = { type: 'DOES_NOT_EXIST' };
    const expected = documentReducer(initialState.documents, actionType);
    const actual = initialState.documents;
    expect(actual).toEqual(expected);
  });
});
