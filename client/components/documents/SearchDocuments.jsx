import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from 'rc-pagination';
import sweetAlert from 'sweetalert';
import 'rc-pagination/assets/index.css';
import Sidebar from './../layout/Sidebar';
import ProgressBar from './../../components/common/ProgressBar'; // eslint-disable-line
import DocumentList from './../documents/DocumentList';
import { LIMIT } from './../../../constants';
import {
  searchDocumentsDispatcher,
 } from './../../actions/documentActions';
/**
 * @class SearchDocuments
 * @desc Class to display the SearchDocuments
 * @extends React.Component
 */
class SearchDocuments extends Component {

  /**
   * @desc Set the Initial conditions for showing the SearchDocuments
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: {
        private: [],
        public: [],
        role: []
      },
      pagination: {
        currentPage: 0,
        limit: 0,
        offset: 0,
        total: 0,
        totalPage: 0
      }
    };

    this.access = props.params.access;
    this.getDocumentAccess = this.getDocumentAccess.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.deleteDocumentAlert = this.deleteDocumentAlert.bind(this);
    this.onPaginateChange = this.onPaginateChange.bind(this);
    this.getDocumentAccess();
  }

  /**
   * @desc Invoked immediately after a props is passed to document
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.params.access !== nextProps.params.access) {
      this.access = nextProps.params.access;
      this.getDocumentAccess();
    }
  }

  /**
   * @desc Get items when pagination change
   * @param {number} page - the current page
   * @return {void} returns nothing
   */
  onPaginateChange(page) {
    const offset = (page - 1) * LIMIT.DOCUMENTS;
    this.props.actions.getDocuments(this.access, offset);
  }

  /**
   * @desc Process the document to display
   * @return {object} Document to display
   */
  getDocumentAccess() {
    this.props.actions.getDocuments(this.access);
  }

  /**
   * @desc Deletes a document
   * @param {booleam} isConfirm - Confirmation to delete
   * @return {any} The document to delete
   */
  deleteDocument(isConfirm) {
    if (isConfirm) {
      this.props.actions.deleteDocument(this.state.id);
    }
  }

 /**
   * @desc Displays an alert to delete a documeant
   * @param {integer} id - id of document to delete
   * @return {boolean} - cancel / confirmation
   */
  deleteDocumentAlert(id) {
    this.state.id = id;
    sweetAlert({
      title: 'Delete Document',
      text: 'You are about to delete this document',
      type: 'error',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, this.deleteDocument);
  }

  /**
   * @desc Displays the SearchDocuments
   * @return {any} The SearchDocuments Content
   */
  render() {
    const documents = this.props.documents.current;
    const currentDocuments = documents.data;
    const pagination = documents.pagination.totalPage > 1 ?
      (
        <div className="col s12">
          <Pagination
            onChange={this.onPaginateChange}
            defaultPageSize={LIMIT.DOCUMENTS}
            current={documents.pagination.currentPage}
            total={documents.pagination.total}
          />
        </div>
      )
    : '';
    return (
      <div className="main-container">
        <div className="row">

          <Sidebar />
          {/* main content */}
          <div className="col l9 top__space">
            <div className="row">
              <div className="col s12">
                <h3 className="document__number">
                  {this.access} Document
                </h3>
              </div>
            </div>
            <div className="row">
              <ProgressBar />
              {pagination}
              <DocumentList
                onEdit={this.editDocument}
                onDelete={this.deleteDocumentAlert}
                userId={this.props.user.id}
                documents={currentDocuments}
              />
              {pagination}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for SearchDocuments
 */
SearchDocuments.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
  actions: PropTypes.shape({
    deleteDocument: PropTypes.func,
    getDocuments: PropTypes.func.isRequired,
  }),
  params: PropTypes.shape({
    access: PropTypes.string,
  }),
  documents: PropTypes.shape({
    current: PropTypes.object,
    pagination: PropTypes.object,
  }),
};

/**
 * Sets default values for SearchDocuments Prototype
 */
SearchDocuments.defaultProps = {
  user: {},
  actions: {},
  documents: {},
  params: { access: 'private' }
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    documents: state.documents,
    pagination: state.pagination
  };
}

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getDocuments,
      deleteDocument,
      privateDocumentsDispatcher,
      publicDocumentsDispatcher,
      roleDocumentsDispatcher,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDocuments);

