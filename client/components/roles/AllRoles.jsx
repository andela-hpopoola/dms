import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sweetAlert from 'sweetalert';
import 'rc-pagination/assets/index.css';
import { createRole, updateProfile, deleteRole, searchRolesDispatcher } from './../../actions/roleActions';
import { getRoles } from './../../actions/allActions';
import ProgressBar from './../common/ProgressBar';
import Sidebar from './../layout/Sidebar';
import RoleList from './RoleList';
import NewRole from './../roles/NewRole';

/**
 * @class AllRoles
 * @desc Class to display the all roles
 * @extends React.Component
 */
class AllRoles extends Component {

  /**
   * @desc Set the Initial conditions for showing the AllRoles
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      model: '',
    };
    this.createNewRole = this.createNewRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
    this.deleteRoleAlert = this.deleteRoleAlert.bind(this);

    this.props.actions.getRoles();
  }


  /**
   * @desc creates a new role once submitted
   * @param {object} data - the form data to create the role from
   * @return {any} redirects role to dashboard or show error
   */
  createNewRole(data) {
    this.props.actions.createRole(data);
  }

  /**
   * @desc Displays an alert to delete role
   * @param {integer} id - id of role to delete
   * @return {boolean} - cancel / confirmation
   */
  deleteRoleAlert(id) {
    this.state.id = id;
    sweetAlert({
      title: 'Delete Role',
      text: 'You are about to delete this role',
      type: 'error',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, this.deleteRole);
  }

  /**
   * @desc Deletes a role
   * @param {booleam} isConfirm - Confirmation to  role
   * @return {any} The document to role
   */
  deleteRole(isConfirm) {
    if (isConfirm) {
      this.props.actions.deleteRole(this.state.id);
    }
  }

  /**
   * @desc Displays the AllRoles
   * @return {any} The AllRoles Content
   */
  render() {
    const roleList = this.props.all.roles;
    const roleCount = roleList.length || 0;

    return (
      <div className="main-container">
        <div className="row">
          <Sidebar />

          {/* main content */}
          <div className="col l9 top__space">
            <div className="row">
              <div className="col s12">
                <h3 className="document__number">
                  {roleCount} Role(s) Found
                </h3>
              </div>
            </div>
            <div className="row">
              <ProgressBar />
                                 
              <div className="col s12">
                <NewRole onSubmit={this.createNewRole} />
                <RoleList
                  roles={roleList}
                  roleId={this.props.role.roleId}
                  onChange={this.searchForRoles}
                  onDelete={this.deleteRoleAlert}
                />
              </div> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for AllRoles
 */
AllRoles.propTypes = {
  actions: PropTypes.shape({
    getRoles: PropTypes.func,
    createRole: PropTypes.func,
    updateProfile: PropTypes.func,
    deleteRole: PropTypes.func,
    searchRolesDispatcher: PropTypes.func.isRequired,
  }),
  pagination: PropTypes.shape({
    total: PropTypes.number,
    currentPage: PropTypes.number,
    offset: PropTypes.number,
    limit: PropTypes.number
  }),
  role: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
    documents: PropTypes.array,
    roleId: PropTypes.number
  }),
  all: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.object),
  }),
  searchItems: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Sets default values for AllRoles Prototype
 */
AllRoles.defaultProps = {
  role: {},
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
    role: state.role,
    roles: state.roles,
    searchItems: state.all.search,
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
      getRoles,
      updateProfile,
      deleteRole,
      createRole,
      searchRolesDispatcher,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRoles);

