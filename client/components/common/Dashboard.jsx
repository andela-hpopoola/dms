import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import DocumentList from './../documents/DocumentList';
import SearchForm from './../common/SearchForm';
import ProgressBar from './../../components/common/ProgressBar';
import { DOCUMENTS } from './../../../constants';
import { loginByToken } from './../../actions/userActions';
import * as auth from './../../utils/auth';
import {
  publicDocumentsDispatcher,
  roleDocumentsDispatcher,
  searchDocumentsDispatcher,
  filterDocuments
 } from './../../actions/documentActions';
/**
 * @class Dashboard
 * @desc Class to display the dashboard
 * @extends React.Component
 */
class Dashboard extends Component {

  /**
   * @desc Set the Initial conditions for showing the Dashboard
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      currentDocuments: [],
      search: false,
    };
    this.getPublicDocuments = this.getPublicDocuments.bind(this);
    this.getRoleDocuments = this.getRoleDocuments.bind(this);
    this.getMyDocuments = this.getMyDocuments.bind(this);
    this.searchForDocuments = this.searchForDocuments.bind(this);
    this.filterSearchDocuments = this.filterSearchDocuments.bind(this);

    this.props.actions.publicDocumentsDispatcher();
    this.props.actions.roleDocumentsDispatcher();
  }

  /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  // componentWillMount() {
  //   if (auth.getToken()) {
  //     this.props.actions.loginByToken();
  //   }
  // }

  /**
   * @desc Invoked immediately after a props is passed to document
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchDocuments.length !== 0) {
      if (this.props.searchDocuments !== nextProps.searchDocuments) {
        if (this.state.search) {
          this.setState({
            currentDocuments: nextProps.searchDocuments,
            documentSource: 'Search Document',
            search: false
          });
        }
      }
    }
    if (this.props.filteredDocuments !== nextProps.filteredDocuments) {
      this.setState({
        currentDocuments: nextProps.filteredDocuments,
      });
    }
  }

  /**
   * @desc Get all my Documents
   * @return {void} returns nothing
   */
  getMyDocuments() {
    this.setState({
      currentDocuments: [],
      search: false
    });
    // console.log('public documents');
  }

  /**
   * @desc Get all public documents
   * @return {void} returns nothing
   */
  getPublicDocuments() {
    this.setState({
      currentDocuments: this.props.publicDocuments,
      documentSource: 'Public Document',
      search: false
    });
  }

  /**
   * @desc Get role documents
   * @return {void} returns nothing
   */
  getRoleDocuments() {
    this.setState({
      currentDocuments: this.props.roleDocuments,
      documentSource: 'Role Document',
      search: false
    });
  }

  /**
   * @desc Get all my Documents
   * @param {integer} filter - filtering for search page
   * @return {void} returns nothing
   */
  filterSearchDocuments(filter) {
    if (this.state.search) {
      const documents = this.state.currentDocuments;
      if (documents.length === 0) {
        this.getMyDocuments();
      }
      if (filter === DOCUMENTS.ALL) {
        this.setState({ currentDocuments: this.state.currentDocuments });
      } else {
        this.props.actions.filterDocuments(documents, filter);
      }
    }
  }

  /**
   * The method is used to search for documents
   * @param {string} query - get the documents to search
   * @param {string} filter - get the documents access
   * @return {object} sets the state based on document
   */
  searchForDocuments(query) {
    this.props.actions.searchDocumentsDispatcher(query);
    this.setState({
      search: true
    });
  }

  /**
   * @desc Displays the Dashboard
   * @return {any} The Dashboard Content
   */
  render() {
    const { user } = this.props;
    let documents = this.state.currentDocuments;
    let documentSource = this.state.documentSource;

    if (documents.length === 0) {
      documents = user.documents;
      documentSource = 'Personal Document';
    }

    const noOfDocuments = documents.length;

    return (
      <div className="main-container">
        <div className="row">
          <div className="col l4 top__space">
            <ul className="collection with-header">
              <li className="collection-header"><h4>Menu</h4></li>
              <li className="collection-item">
                <div>
                  <a onClick={this.getMyDocuments} href="#!my-documents">
                    My Documents
                  </a>
                </div>
              </li>
              <li className="collection-item">
                <div>
                  <a onClick={this.getPublicDocuments} href="#!public-documents">
                    Public Documents
                  </a>
                </div>
              </li>
              { /*<li className="collection-item">
                <div>
                  <a onClick={this.getRoleDocuments} href="#!public-documents">
                    Role Documents
                  </a>
                </div>
              </li>*/ }
              <li className="collection-item">
                <div>
                  <Link to="/new-document">
                    New Document
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="col l8 top__space">
            <h2 className="dashboard__welcome">
              Welcome to the Dashboard {user.name} ({user.email})
            </h2>
            <h3 className="document__number">
              You have {noOfDocuments} {documentSource}(s)
            </h3>
            <ProgressBar />
            <SearchForm
              onChange={this.searchForDocuments}
              onSelect={this.filterSearchDocuments}
              disableFilter={this.state.search}
            />
            <DocumentList documents={documents} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for Dashboard
 */
Dashboard.propTypes = {
  actions: PropTypes.shape({
    publicDocumentsDispatcher: PropTypes.func.isRequired,
    roleDocumentsDispatcher: PropTypes.func.isRequired,
    searchDocumentsDispatcher: PropTypes.func.isRequired,
    filterDocuments: PropTypes.func.isRequired,
    loginByToken: PropTypes.func,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
    documents: PropTypes.array,
  }),
  publicDocuments: PropTypes.arrayOf(PropTypes.object),
  roleDocuments: PropTypes.arrayOf(PropTypes.object),
  searchDocuments: PropTypes.arrayOf(PropTypes.object),
  filteredDocuments: PropTypes.arrayOf(PropTypes.object),
};

/**
 * Sets default values for Dashboard Prototype
 */
Dashboard.defaultProps = {
  user: {},
  publicDocuments: [],
  roleDocuments: [],
  searchDocuments: [],
  filteredDocuments: [],
  actions: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    publicDocuments: state.documents.public,
    roleDocuments: state.documents.role,
    searchDocuments: state.documents.search,
    filteredDocuments: state.documents.filter,
    ajaxStatus: state.ajaxStatus
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
      publicDocumentsDispatcher,
      roleDocumentsDispatcher,
      searchDocumentsDispatcher,
      filterDocuments,
      loginByToken
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

