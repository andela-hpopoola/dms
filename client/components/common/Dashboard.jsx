import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-materialize';
import toastr from 'toastr';
import sweetAlert from 'sweetalert';
import DocumentList from './../documents/DocumentList';
import NewDocument from './../documents/NewDocument';
import EditDocument from './../documents/EditDocument';
import ProgressBar from './../../components/common/ProgressBar';
import { DOCUMENTS } from './../../../constants';
import { loginByToken } from './../../actions/userActions';
import SearchForm from './../common/SearchForm';
import AllUsers from './../users/AllUsers';
import AllRoles from './../roles/AllRoles';
import { getUsers, getRoles } from './../../actions/allActions';
import {
  createDocument,
  updateDocument,
  deleteDocument,
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
      id: 0,
      page: 'dashboard',
      search: false,
    };
    this.getDashboard = this.getDashboard.bind(this);
    this.getPublicDocuments = this.getPublicDocuments.bind(this);
    this.getRoleDocuments = this.getRoleDocuments.bind(this);
    this.getMyDocuments = this.getMyDocuments.bind(this);
    this.searchForDocuments = this.searchForDocuments.bind(this);
    this.filterSearchDocuments = this.filterSearchDocuments.bind(this);
    this.loadNewDocument = this.loadNewDocument.bind(this);
    this.createNewDocument = this.createNewDocument.bind(this);
    this.editExistingDocument = this.editExistingDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getAllRoles = this.getAllRoles.bind(this);

    this.props.actions.publicDocumentsDispatcher();
    this.props.actions.roleDocumentsDispatcher();
    this.props.actions.getUsers();
    this.props.actions.getRoles();
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
   * @desc Get dashboard
   * @param {event} event
   * @return {void} returns nothing
   */
  getDashboard(event) {
    event.preventDefault();
    this.setState({
      pageTitle: `Welcome back ${this.props.user.name}`,
      search: false,
      page: 'dashboard'
    });
  }

  /**
   * @desc Get all my Documents
   * @param {event} event
   * @return {void} returns nothing
   */
  getMyDocuments(event) {
    event.preventDefault();
    this.setState({
      search: false,
      page: 'my_documents',
      pageTitle: 'Personal Documents'
    });
  }

  /**
   * @desc Get all users
   * @param {event} event
   * @return {void} returns nothing
   */
  getAllUsers(event) {
    event.preventDefault();
    this.props.actions.getUsers();
    this.setState({
      search: false,
      page: 'all_users',
      pageTitle: 'All Users'
    });
  }

  /**
   * @desc Get all roles
   * @param {event} event
   * @return {void} returns nothing
   */
  getAllRoles(event) {
    event.preventDefault();
    this.props.actions.getRoles();
    this.setState({
      search: false,
      page: 'all_roles',
      pageTitle: 'All Roles'
    });
  }

  /**
   * @desc Get all public documents
   * @param {event} event
   * @return {void} returns nothing
   */
  getPublicDocuments(event) {
    event.preventDefault();
    this.props.actions.publicDocumentsDispatcher();
    this.setState({
      pageTitle: 'Public Document',
      search: false,
      page: 'public_documents'
    });
  }

  /**
   * @desc Get role documents
   * @param {event} event
   * @return {void} returns nothing
   */
  getRoleDocuments(event) {
    event.preventDefault();
    this.props.actions.roleDocumentsDispatcher();
    this.setState({
      pageTitle: 'Role Document',
      search: false,
      page: 'role_documents'
    });
  }

  /**
   * @desc Get role documents
   * @param {event} event
   * @return {void} returns nothing
   */
  loadNewDocument(event) {
    event.preventDefault();
    this.setState({
      page: 'new_document'
    });
  }

  /**
   * @desc maps state to properties
   * @param {object} data - the form data to create the document from
   * @return {any} redirects document to dashboard or show error
   */
  createNewDocument(data) {
    // console.log(data);
        // Validation
    if (data.content && (data.content.length < 6)) {
      toastr.error('Enter a valid document content');
    } else if (data.title.length < 6) {
      toastr.error('Your title must be more than 6 characters');
    } else {
      this.props.actions.createDocument(data);
      this.setState({ page: 'dashboard' });
    }
  }

  /**
   * @desc edit Document
   * @param {integer} id - the id of the page to edit
   * @return {void} returns nothing
   */
  editDocument(id) {
    this.setState({
      page: 'edit_document',
      id
    });
  }

  /**
   * @desc maps state to properties
   * @param {object} updatedDocument - the updated document
   * @param {object} currentDocument - the current document
   * @return {any} redirects document to dashboard or show error
   */
  editExistingDocument(updatedDocument, currentDocument) {
    // Validation
    if (updatedDocument.content && (updatedDocument.content.length < 6)) {
      toastr.error('Enter a valid document content');
    } else if (updatedDocument.title && updatedDocument.title.length < 6) {
      toastr.error('Your title must be more than 6 characters');
    } else {
      this.props.actions.updateDocument(updatedDocument, currentDocument);
      this.setState({ page: 'dashboard' });
    }
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
      pageTitle: 'Search Results',
      search: true,
      page: 'search_documents'
    });
  }

  /**
   * @desc Displays the ViewDocument Page
   * @param {integer} id - id of document to delete
   * @return {any} The ViewDocument form
   */
  deleteAlert(id) {
    this.state.id = id;
    sweetAlert({
      title: 'Delete Document',
      text: 'You are about to delete this document',
      type: 'error',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, this.delete);
  }

  /**
   * @desc Deletes a document
   * @param {booleam} isConfirm - Confirmation to delete
   * @return {any} The document to delete
   */
  delete(isConfirm) {
    if (isConfirm) {
      this.props.actions.deleteDocument(this.state.id);
    }
  }

  /**
   * @desc Displays the Dashboard
   * @return {any} The Dashboard Content
   */
  render() {
    const { user } = this.props;
    const myDocumentsCount = this.props.user.documents.length;
    const publicDocumentsCount = this.props.publicDocuments.length;
    const roleDocumentsCount = this.props.roleDocuments.length;

    const dashboard = (
      <div>
        <Col l={4} m={6} s={12} key="1">
          <a onClick={this.getMyDocuments} href="/!#" className="card white">
            <div className="card-content green-text">
              <span className="card-title dashboard__title">Personal</span>
              <strong className="dashboard__count">
                {myDocumentsCount} Documents
                <div className="right">
                  <i className="fa fa-file fa-3x dashboard__icon" />
                </div>
              </strong>
            </div>
          </a>
        </Col>
        <Col l={4} m={6} s={12}>
          <a onClick={this.getPublicDocuments} href="/!#" className="card white">
            <div className="card-content red-text">
              <span className="card-title dashboard__title">Public</span>
              <strong className="dashboard__count">
                {publicDocumentsCount} Documents
                <div className="right">
                  <i className="fa fa-file fa-3x dashboard__icon" />
                </div>
              </strong>
            </div>
          </a>
        </Col>
        <Col l={4} m={6} s={12} key="2">
          <a onClick={this.getRoleDocuments} href="/!#" className="card white">
            <div className="card-content blue-text">
              <span className="card-title dashboard__title">Role</span>
              <strong className="dashboard__count">
                {roleDocumentsCount} Documents
                <div className="right">
                  <i className="fa fa-file fa-3x dashboard__icon" />
                </div>
              </strong>
            </div>
          </a>
        </Col>
      </div>
    );

    const newDocument = (
      <div className="col s12">
        <NewDocument onSubmit={this.createNewDocument} />
      </div>
    );

    const editDocument = (
      <div className="col s12">
        <EditDocument onUpdate={this.editExistingDocument} id={this.state.id} />
      </div>
    );

    let content;
    switch (this.state.page) {
      case 'new_document':
        content = newDocument;
        break;
      case 'edit_document':
        content = editDocument;
        break;
      case 'public_documents':
        content = (<DocumentList
          onEdit={this.editDocument}
          onDelete={this.deleteAlert}
          userId={user.id}
          documents={this.props.publicDocuments}
        />);
        break;
      case 'role_documents':
        content = (<DocumentList
          onEdit={this.editDocument}
          onDelete={this.deleteAlert}
          userId={user.id}
          documents={this.props.roleDocuments}
        />);
        break;
      case 'my_documents':
        content = (<DocumentList
          onEdit={this.editDocument}
          onDelete={this.deleteAlert}
          userId={user.id}
          documents={this.props.user.documents}
        />);
        break;
      case 'search_documents':
        content = (<DocumentList
          onEdit={this.editDocument}
          onDelete={this.deleteAlert}
          userId={user.id}
          documents={this.props.searchDocuments}
        />);
        break;
      case 'all_users':
        content = (<AllUsers users={this.props.all.users} />);
        break;
      case 'all_roles':
        content = (<AllRoles roles={this.props.all.roles} />);
        break;
      case 'dashboard':
      default:
        content = dashboard;
    }

    return (
      <div className="main-container">
        <div className="row">
          <div className="col l3 top__space">

            <div className="card white">
              <ul className="collection with-header">
                <li className="collection-header"><h4>Menu</h4></li>
                <li className="collection-item">
                  <div>
                    <a onClick={this.getDashboard} href="/!#">
                      Dashboard
                    </a>
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    <a onClick={this.getMyDocuments} href="/!#">
                      My Documents
                    </a>
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    <a onClick={this.getPublicDocuments} href="/!#">
                      Public Documents
                    </a>
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    <a onClick={this.getRoleDocuments} href="/!#">
                      Role Documents
                    </a>
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    <a onClick={this.loadNewDocument} href="/!#">
                      New Documents
                    </a>
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    <a onClick={this.getAllUsers} href="/!#">
                      All Users
                    </a>
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    <a onClick={this.getAllRoles} href="/!#">
                      All Roles
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card white">
              <ul className="collection with-header">
                <li className="collection-header"><h4>Menu</h4></li>
                <li className="collection-item">
                  <div>
                    <SearchForm
                      onChange={this.searchForDocuments}
                      onSelect={this.filterSearchDocuments}
                      disableFilter={this.state.search}
                    />
                  </div>
                </li>
              </ul>
            </div>

            <div className="card white">
              <ul className="collection with-header">
                <li className="collection-header"><h4>Menu</h4></li>
                <li className="collection-item">
                  <div>
                    Name: {user.name}
                  </div>
                </li>
              </ul>
            </div>

            {/* End Sidebar */}
          </div>

          {/* main page */}
          <div className="col l9 top__space">
            <div className="row">
              <div className="col s12">
                <h3 className="document__number">
                  {this.state.pageTitle || `Welcome back ${this.props.user.name}`}
                </h3>
              </div>
            </div>
            <div className="row">
              <ProgressBar />
              { content }
            </div>
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
    createDocument: PropTypes.func,
    updateDocument: PropTypes.func,
    deleteDocument: PropTypes.func,
    getUsers: PropTypes.func,
    getRoles: PropTypes.func,
    publicDocumentsDispatcher: PropTypes.func.isRequired,
    roleDocumentsDispatcher: PropTypes.func.isRequired,
    searchDocumentsDispatcher: PropTypes.func.isRequired,
    filterDocuments: PropTypes.func.isRequired,
    loginByToken: PropTypes.func
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
    documents: PropTypes.array
  }),
  all: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.object),
    roles: PropTypes.arrayOf(PropTypes.object)
  }),
  publicDocuments: PropTypes.arrayOf(PropTypes.object),
  roleDocuments: PropTypes.arrayOf(PropTypes.object),
  searchDocuments: PropTypes.arrayOf(PropTypes.object),
  filteredDocuments: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Sets default values for Dashboard Prototype
 */
Dashboard.defaultProps = {
  user: {},
  all: [],
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
    all: state.all,
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
      createDocument,
      updateDocument,
      deleteDocument,
      getUsers,
      getRoles,
      publicDocumentsDispatcher,
      roleDocumentsDispatcher,
      searchDocumentsDispatcher,
      filterDocuments,
      loginByToken
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

