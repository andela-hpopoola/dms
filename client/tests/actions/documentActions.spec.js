
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import initialState from './../../reducers/initialState';
import { MOCK_DOCUMENTS } from './../../../constants';
import * as documentActions from './../../actions/documentActions';
import * as types from './../../actions/actionTypes';
import api from './../../utils/api';


// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const document = MOCK_DOCUMENTS.PRIVATE;
const documents = [MOCK_DOCUMENTS.PUBLIC, MOCK_DOCUMENTS.ROLE];

describe('Document Actions', () => {
  beforeEach(() => {
    moxios.install(api);
  });

  afterEach(() => {
    moxios.uninstall(api);
  });

  describe('Set Add New Document', () => {
    it('should add a new document', () => {
      const expected = {
        type: types.ADD_NEW_DOCUMENT,
        document
      };

      const action = documentActions.addNewDocument(document);
      expect(action).toEqual(expected);
    });
  });

  describe('Create Document', () => {
    it('should create a new document', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.AUTHENTICATE_USER, document }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions.createDocument(document)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: document
        });
      });
    });
  });

  describe('Update Existing Document', () => {
    it('should update existing document', () => {
      const expected = {
        type: types.UPDATE_EXISTING_DOCUMENT,
        updatedDocument: document
      };

      const action = documentActions.updateExistingDocument(document);
      expect(action).toEqual(expected);
    });
  });

  describe('Delete Existing Document', () => {
    const id = 1;
    it('should delete existing document', () => {
      const expected = {
        type: types.DELETE_EXISTING_DOCUMENT,
        id
      };

      const action = documentActions.deleteExistingDocument(id);
      expect(action).toEqual(expected);
    });
  });

  describe('Get Document Details', () => {
    it('should get document details', () => {
      const expected = {
        type: types.GET_DOCUMENT_DETAILS,
        document
      };

      const action = documentActions.getDocumentDetails(document);
      expect(action).toEqual(expected);
    });
  });

  describe('Get Document', () => {
    it('should get a document details', (done) => {
      const expected = [
        { type: types.GET_DOCUMENT_DETAILS, document }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions.getDocument(document)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: document
        });
      });
    });
  });

  describe('Update Document', () => {
    it('should update a document details', (done) => {
      const currentDocument = { id: 1, title: 'Document 1' };
      const updatedDocument = { id: 1, title: 'Updated Document' };
      const expected = [
        { type: types.UPDATE_EXISTING_DOCUMENT, updatedDocument }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions
        .updateDocument(updatedDocument, currentDocument))
        .then(() => {
          const actual = store.getActions();
          expect(actual).toEqual(expected);
          done();
        }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: 'Document has been updated'
        });
      });
    });
  });

  describe('Delete Document', () => {
    it('should delete document', (done) => {
      const id = 1;
      const expected = [
        { type: types.DELETE_EXISTING_DOCUMENT, id }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions.deleteDocument(id)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: 'Document has been sucessfully deleted'
        });
      });
    });
  });

  describe('Get Private Documents', () => {
    it('should get all Private Documents', () => {
      const expected = {
        type: types.GET_PRIVATE_DOCUMENTS, documents
      };

      const action = documentActions.getPrivateDocuments(documents);
      expect(action).toEqual(expected);
    });
  });

  describe('Private Documents Dispatcher', () => {
    it('should get all private documents', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.GET_PRIVATE_DOCUMENTS, documents },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions.getAllPrivateDocuments()).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: documents
        });
      });
    });
  });


  describe('Get Public Documents', () => {
    it('should get all Public Documents', () => {
      const expected = {
        type: types.GET_PUBLIC_DOCUMENTS, documents
      };

      const action = documentActions.getPublicDocuments(documents);
      expect(action).toEqual(expected);
    });
  });

  describe('Public Documents Dispatcher', () => {
    it('should get all public documents', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.GET_PUBLIC_DOCUMENTS, documents },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions.getAllPublicDocuments()).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: documents
        });
      });
    });
  });

  describe('Get Role Documents', () => {
    it('should get all Role Documents', () => {
      const expected = {
        type: types.GET_ROLE_DOCUMENTS, documents
      };

      const action = documentActions.getRoleDocuments(documents);
      expect(action).toEqual(expected);
    });
  });

  describe('Role Documents Dispatcher', () => {
    it('should get all role documents', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.GET_ROLE_DOCUMENTS, documents },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions.getAllRoleDocuments(documents)).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: documents
        });
      });
    });
  });

  describe('Get Current Documents', () => {
    it('should get all Current Documents', () => {
      const expected = {
        type: types.GET_CURRENT_DOCUMENTS, documents
      };

      const action = documentActions.getCurrentDocuments(documents);
      expect(action).toEqual(expected);
    });
  });

  describe('Search for Documents', () => {
    it('should search for documents', () => {
      const expected = {
        type: types.SEARCH_FOR_DOCUMENTS, documents
      };

      const action = documentActions.searchForDocuments(documents);
      expect(action).toEqual(expected);
    });
  });

  describe('Search Documents Dispatcher', () => {
    it('should search for documents', (done) => {
      const expected = [
        { type: types.AJAX_CALL_START },
        { type: types.GET_CURRENT_DOCUMENTS, documents },
        { type: types.AJAX_CALL_END }
      ];

      const store = mockStore(initialState);

      store.dispatch(documentActions.searchDocumentsDispatcher('test')).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
        done();
      }).catch(() => { done(); });

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: documents
        });
      });
    });
  });
});
