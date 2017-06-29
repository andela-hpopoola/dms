import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sweetAlert from 'sweetalert';
import Pagination from 'rc-pagination';
import { updateProfile, deleteUser, getSearchedUsers } from './../../actions/userActions';
import { getUsers, getRoles } from './../../actions/allActions';
import { LIMIT } from './../../../constants';
import ProgressBar from './../common/ProgressBar';
import Sidebar from './../layout/Sidebar';
import UserList from './UserList';

/**
 * @class AllUsers
 * @desc Class to display the all users
 * @extends React.Component
 */
export class AllUsers extends Component {

  /**
   * @desc Set the Initial conditions for showing the AllUsers
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      search: false,
      offset: 0,
      pagination: {
        currentPage: 0,
        limit: 0,
        offset: 0,
        total: 0,
        totalPage: 0
      }
    };


    this.searchForUsers = this.searchForUsers.bind(this);
    this.viewAllUsers = this.viewAllUsers.bind(this);
    this.onPaginateChange = this.onPaginateChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteUserAlert = this.deleteUserAlert.bind(this);

    this.props.actions.getUsers();
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
            search: true
          });
        }
      }
    }
  }

  /**
   * @desc Get items when pagination change
   * @param {number} page - the current page
   * @return {void} returns nothing
   */
  onPaginateChange(page) {
    this.props.actions.getUsers((page - 1) * LIMIT.USERS);
  }

  /**
   * @desc View all users
   * @return {void} sets search state to false
   */
  viewAllUsers() {
    this.setState({ search: false });
  }

  /**
   * The method is used to search for users
   * @param {string} query - get the users to search
   * @param {string} filter - get the users access
   * @return {object} sets the state based on user
   */
  searchForUsers(query) {
    this.props.actions.getSearchedUsers(query);
    this.setState({
      pageTitle: 'Search Results',
      search: true,
      page: 'search_users'
    });
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
   * @desc Deletes a user
   * @param {booleam} isConfirm - Confirmation to  user
   * @return {any} The document to user
   */
  deleteUser(isConfirm) {
    if (isConfirm) {
      this.props.actions.deleteUser(this.state.id);
    }
    this.setState({ search: false });
  }

  /**
   * @desc Displays the AllUsers
   * @return {any} The AllUsers Content
   */
  render() {
    let userList = this.props.all.users;
    let offset = this.props.pagination.offset;
    let userCount = this.props.pagination.total;
    if (this.state.search) {
      userList = this.props.all.search.data;
      userCount = userList.length;
      offset = 0;
    }
    const pagination = this.props.pagination.total > 1 ?
      (
        <div className="col s12">
          <Pagination
            onChange={this.onPaginateChange}
            defaultPageSize={LIMIT.USERS}
            current={this.props.pagination.currentPage}
            total={this.props.pagination.total}
          />
        </div>
      )
    : '';
    const backToAllUsers = (
      <button
        onClick={this.viewAllUsers}
        className="btn blue waves-effect waves-light"
        type="submit"
      >
        Back to Users
      </button>
    );
    return (
      <div className="main-container">
        <div className="row">
          <Sidebar />
          {/* main content */}
          <div className="col l9 top__space">
            <div className="row">
              <div className="col s12">
                <h3 className="user__number">
                  {userCount} User(s) Found
                </h3>
              </div>
            </div>
            <div className="row">
              <ProgressBar />
              <div>
                {!this.state.search && pagination}
                <UserList
                  users={userList}
                  count={offset}
                  roleId={this.props.user.roleId}
                  onChange={this.searchForUsers}
                  onDelete={this.deleteUserAlert}
                />
                {!this.state.search && pagination}
                {this.state.search && backToAllUsers}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for AllUsers
 */
AllUsers.propTypes = {
  actions: PropTypes.shape({
    getUsers: PropTypes.func,
    deleteUser: PropTypes.func,
    getSearchedUsers: PropTypes.func.isRequired,
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
    search: PropTypes.object,
  }),
  searchItems: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Sets default values for AllUsers Prototype
 */
AllUsers.defaultProps = {
  user: {},
  all: [],
  pagination: {},
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
    searchItems: state.all.search.data,
    pagination: state.pagination,
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
      getUsers,
      updateProfile,
      deleteUser,
      getRoles,
      getSearchedUsers,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);

