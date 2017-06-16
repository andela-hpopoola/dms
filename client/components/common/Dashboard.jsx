import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-materialize';
import sweetAlert from 'sweetalert';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import DocumentList from './../documents/DocumentList';
import NewDocument from './../documents/NewDocument';
import EditDocument from './../documents/EditDocument'; // eslint-disable-line
import EditProfile from './../users/EditProfile';
import NewRole from './../roles/NewRole';
import EditRole from './../roles/EditRole';
import ProgressBar from './../../components/common/ProgressBar'; // eslint-disable-line
import { updateProfile, deleteUser, searchUsersDispatcher } from './../../actions/userActions';
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
  searchDocumentsDispatcher
 } from './../../actions/documentActions';
import { createRole, updateRole } from './../../actions/roleActions';
import { ROLES, LIMIT } from './../../../constants';

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
      username: '',
      search: false,
      offset: 0,
      total: {
        myDocuments: 0,
        publicDocuments: 0,
        roleDocuments: 0
      }
    };

    this.getDashboard = this.getDashboard.bind(this);
    this.getPublicDocuments = this.getPublicDocuments.bind(this);
    this.getRoleDocuments = this.getRoleDocuments.bind(this);
    this.getMyDocuments = this.getMyDocuments.bind(this);
    this.searchForDocuments = this.searchForDocuments.bind(this);
    this.searchForUsers = this.searchForUsers.bind(this);
    this.onPaginateChange = this.onPaginateChange.bind(this);
    this.loadNewDocument = this.loadNewDocument.bind(this);
    this.createNewDocument = this.createNewDocument.bind(this);
    this.createNewRole = this.createNewRole.bind(this);
    this.loadNewRole = this.loadNewRole.bind(this);
    this.editExistingDocument = this.editExistingDocument.bind(this);
    this.editDocument = this.editDocument.bind(this);
    this.editUserProfile = this.editUserProfile.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.editRole = this.editRole.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.deleteDocumentAlert = this.deleteDocumentAlert.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUserAlert = this.deleteUserAlert.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getAllRoles = this.getAllRoles.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);

    this.props.actions.getRoles();
  }

  /**
   * @desc Invoked immediately after a props is passed to document
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchItems.length !== 0) {
      if (this.props.searchItems !== nextProps.searchItems) {
        if (this.state.search) {
          this.setState({
            currentItems: nextProps.searchItems,
            search: false
          });
        }
      }
    }

    if (this.props.user.name !== nextProps.user.name) {
      this.setState({ username: nextProps.user.name });
    }
  }

  /**
   * @desc Get items when pagination change
   * @param {number} page - the current page
   * @return {void} returns nothing
   */
  onPaginateChange(page) {
    switch (this.state.page) {
      case 'all_users':
        this.props.actions.getUsers((page - 1) * LIMIT.USERS);
        break;
      case 'public_documents':
        this.props.actions.publicDocumentsDispatcher((page - 1) * LIMIT.DOCUMENTS);
        break;
      case 'role_documents':
        this.props.actions.roleDocumentsDispatcher((page - 1) * LIMIT.DOCUMENTS);
        break;
      default:
        // do nothing
    }
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
   * @desc Get the current page
   * @param {string} pageName - the current page
   * @return {void} returns nothing
   */
  getCurrentPage() {
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

    const editProfile = (
      <div className="col s12">
        <EditProfile onUpdate={this.editUserProfile} user={this.props.user} />
      </div>
    );

    const editRole = (
      <div className="col s12">
        <EditRole onUpdate={this.editExistingRole} id={this.state.id} />
      </div>
    );

    const newRole = (
      <div className="col s12">
        <NewRole onSubmit={this.createNewRole} />
      </div>
    );

    let content;
    const currentPage = this.props.pagination.currentPage;
    const total = this.props.pagination.total;
    const defaultPageSize = this.props.pagination.limit;

    switch (this.state.page) {
      case 'new_document':
        content = newDocument;
        break;
      case 'new_role':
        content = newRole;
        break;
      case 'edit_document':
        content = editDocument;
        break;
      case 'edit_profile':
        content = editProfile;
        break;
      case 'edit_role':
        content = editRole;
        break;
      case 'public_documents':
        content = (
          <div>
            <DocumentList
              onEdit={this.editDocument}
              onDelete={this.deleteDocumentAlert}
              userId={user.id}
              documents={this.props.publicDocuments}
            />
            <Pagination
              onChange={this.onPaginateChange}
              defaultPageSize={defaultPageSize}
              current={currentPage}
              total={total}
            />
          </div>
        );
        break;
      case 'role_documents':
        content = (
          <div>
            <DocumentList
              onEdit={this.editDocument}
              onDelete={this.deleteDocumentAlert}
              userId={user.id}
              documents={this.props.roleDocuments}
            />
            <Pagination
              onChange={this.onPaginateChange}
              defaultPageSize={defaultPageSize}
              current={currentPage}
              total={total}
            />
          </div>
        );
        break;
      case 'my_documents':
        content = (
          <div>
            <DocumentList
              onEdit={this.editDocument}
              onDelete={this.deleteDocumentAlert}
              userId={user.id}
              documents={this.props.user.documents}
            />
          </div>
        );
        break;
      case 'search_documents':
        content = (
          <div>
            <DocumentList
              onEdit={this.editDocument}
              onDelete={this.deleteDocumentAlert}
              userId={user.id}
              documents={this.props.searchItems}
            />
          </div>);
        break;
      case 'all_users':
        content = (
          <div>
            <AllUsers
              users={this.props.all.users}
              count={this.props.pagination.offset}
              roleId={this.props.user.roleId}
              onChange={this.searchForUsers}
              onDelete={this.deleteUserAlert}
            />
            <Pagination
              onChange={this.onPaginateChange}
              defaultPageSize={defaultPageSize}
              current={currentPage}
              total={total}
            />
          </div>
        );
        break;
      case 'search_users':
        content = (<AllUsers
          users={this.props.searchItems}
          roleId={this.props.user.roleId}
          onChange={this.searchForUsers}
          onDelete={this.deleteUserAlert}
        />);
        break;
      case 'all_roles':
        content = (<AllRoles roles={this.props.all.roles} />);
        break;
      case 'dashboard':
      default:
        content = dashboard;
    }

    return content;
  }

  /**
   * @desc Get dashboard
   * @param {event} event
   * @return {void} returns nothing
   */
  getDashboard(event) {
    event.preventDefault();
    this.props.actions.publicDocumentsDispatcher();
    this.props.actions.roleDocumentsDispatcher();
    this.setState({
      search: false,
      page: 'dashboard'
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
    this.props.actions.publicDocumentsDispatcher(0);
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
    this.props.actions.roleDocumentsDispatcher(0);
    this.setState({
      pageTitle: 'Role Document',
      search: false,
      page: 'role_documents'
    });
  }

  /**
   * @desc loads new document
   * @param {event} event
   * @return {void} returns nothing
   */
  loadNewDocument(event) {
    event.preventDefault();
    this.setState({
      page: 'new_document',
      pageTitle: 'New Document'
    });
  }

  /**
   * @desc Loads new role
   * @param {event} event
   * @return {void} returns nothing
   */
  loadNewRole(event) {
    event.preventDefault();
    this.setState({
      page: 'new_role'
    });
  }

  /**
   * @desc creates a new document once submitted
   * @param {object} data - the form data to create the document from
   * @return {any} redirects document to dashboard or show error
   */
  createNewDocument(data) {
    this.props.actions.createDocument(data);
    this.setState({
      page: 'dashboard'
    });
  }

  /**
   * @desc creates a new role once submitted
   * @param {object} data - the form data to create the role from
   * @return {any} redirects role to dashboard or show error
   */
  createNewRole(data) {
    this.props.actions.createRole(data);
    this.setState({
      page: 'dashboard'
    });
  }

  /**
   * @desc edit Document
   * @param {integer} id - the id of the page to edit
   * @return {void} returns nothing
   */
  editDocument(id) {
    this.setState({
      page: 'edit_document',
      pageTitle: 'Edit Document',
      id
    });
  }

  /**
   * @desc edit Profile
   * @param {event} event
   * @return {void} returns nothing
   */
  editProfile(event) {
    event.preventDefault();
    this.setState({
      page: 'edit_profile',
    });
  }

  /**
   * @desc edit Role
   * @param {integer} id - the id of the role to edit
   * @return {void} returns nothing
   */
  editRole(id) {
    this.setState({
      page: 'edit_role',
      id
    });
  }

  /**
   * @desc edit existing document
   * @param {object} updatedDocument - the updated document
   * @param {object} currentDocument - the current document
   * @return {any} redirects document to dashboard or show error
   */
  editExistingDocument(updatedDocument, currentDocument) {
    // Validation
    this.props.actions.updateDocument(updatedDocument, currentDocument);
    this.setState({
      page: 'dashboard'
    });
  }

  /**
   * @desc edit user profile
   * @param {object} updatedProfile - the updated profile
   * @param {object} currentProfile - the current profile
   * @return {any} redirects document to dashboard or show error
   */
  editUserProfile(updatedProfile, currentProfile) {
    this.props.actions.updateProfile(updatedProfile, currentProfile);
    this.setState({
      page: 'dashboard'
    });
  }

  /**
   * @desc Edit Existing Role
   * @param {object} updatedRole - the updated role
   * @param {object} currentRole - the current role
   * @return {any} redirects role to dashboard or show error
   */
  editExistingRole(updatedRole, currentRole) {
    this.props.actions.updateRole(updatedRole, currentRole);
    this.setState({
      page: 'dashboard',
    });
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
   * The method is used to search for users
   * @param {string} query - get the users to search
   * @param {string} filter - get the users access
   * @return {object} sets the state based on user
   */
  searchForUsers(query) {
    this.props.actions.searchUsersDispatcher(query);
    this.setState({
      pageTitle: 'Search Results',
      search: true,
      page: 'search_users'
    });
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
   * @desc Displays an alert to delete user
   * @param {integer} id - id of user to delete
   * @return {boolean} - cancel / confirmation
   */
  deleteUserAlert(id) {
    this.state.id = id;
    sweetAlert({
      title: 'Delete User',
      text: 'You are about to delete this user',
      type: 'error',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, this.deleteUser);
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
   * @desc Deletes a user
   * @param {booleam} isConfirm - Confirmation to  user
   * @return {any} The document to user
   */
  deleteUser(isConfirm) {
    if (isConfirm) {
      this.props.actions.deleteUser(this.state.id);
    }
  }

  /**
   * @desc Displays the Dashboard
   * @return {any} The Dashboard Content
   */
  render() {
    const { user } = this.props;
    if (this.state.page === 'dashboard') {
      if (this.state.username === '') {
        this.state.username = this.props.user.name;
      }
      this.state.pageTitle = `Welcome back ${this.state.username}`;
    }
    const content = this.getCurrentPage();

    return (
      <div className="main-container">
        <div className="row">
          <div className="col l3 top__space">

            <div className="card white">
              <ul className="collection with-header">
                <li className="collection-header"><h4>Quick Links</h4></li>
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
              </ul>
            </div>

            <div className="card white">
              <ul className="collection">
                <li className="collection-item">
                  <div>
                    <SearchForm
                      onChange={this.searchForDocuments}
                    />
                  </div>
                </li>
              </ul>
            </div>

            <div className="card white">
              <ul className="collection with-header">
                <li className="collection-header"><h4>User Profile</h4></li>
                <li className="collection-item">
                  <div>
                    Name: {user.name}
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    Email: {user.email}
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    Role: {user.roleName}
                  </div>
                </li>
                <li className="collection-item">
                  <div>
                    <button
                      onClick={this.editProfile}
                      className="waves-effect waves-light btn-flat"
                    >
                      Edit Profile
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            { user.roleId !== ROLES.USER ?
              <div className="card white">
                <ul className="collection with-header">
                  <li className="collection-header"><h4>ADMINISTRATOR</h4></li>
                  <li className="collection-item">
                    <div>
                      <a onClick={this.getAllUsers} href="/!#">
                        All Users
                      </a>
                    </div>
                  </li>
                </ul>
              </div> : ' '
            }

            { user.roleId === ROLES.SUPERADMIN ?
              <div className="card white">
                <ul className="collection with-header">
                  <li className="collection-header"><h4>SUPER ADMIN</h4></li>
                  <li className="collection-item">
                    <div>
                      <a onClick={this.loadNewRole} href="/!#">
                        New Roles
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
              </div> : ' '
            }
          </div>

          {/* main content */}
          <div className="col l9 top__space">
            <div className="row">
              <div className="col s12">
                <h3 className="document__number">
                  {this.state.pageTitle || `Welcome back ${this.state.username}`}
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
    createRole: PropTypes.func,
    updateProfile: PropTypes.func,
    deleteUser: PropTypes.func,
    updateRole: PropTypes.func,
    getRoles: PropTypes.func,
    publicDocumentsDispatcher: PropTypes.func.isRequired,
    roleDocumentsDispatcher: PropTypes.func.isRequired,
    searchDocumentsDispatcher: PropTypes.func.isRequired,
    searchUsersDispatcher: PropTypes.func.isRequired,
    loginByToken: PropTypes.func,
  }),
  pagination: PropTypes.shape({
    total: PropTypes.number,
    currentPage: PropTypes.number,
    offset: PropTypes.number,
    limit: PropTypes.number
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
    documents: PropTypes.array,
    roleId: PropTypes.number
  }),
  all: PropTypes.shape({
    users: PropTypes.arrayOf(PropTypes.object),
    roles: PropTypes.arrayOf(PropTypes.object)
  }),
  publicDocuments: PropTypes.arrayOf(PropTypes.object),
  roleDocuments: PropTypes.arrayOf(PropTypes.object),
  searchItems: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Sets default values for Dashboard Prototype
 */
Dashboard.defaultProps = {
  user: {},
  all: [],
  pagination: {},
  publicDocuments: [],
  roleDocuments: [],
  searchItems: [],
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
    roles: state.roles,
    publicDocuments: state.documents.public,
    roleDocuments: state.documents.role,
    searchItems: state.all.search,
    pagination: state.all.pagination,
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
      createRole,
      updateRole,
      updateProfile,
      deleteUser,
      getRoles,
      publicDocumentsDispatcher,
      roleDocumentsDispatcher,
      searchDocumentsDispatcher,
      searchUsersDispatcher,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

