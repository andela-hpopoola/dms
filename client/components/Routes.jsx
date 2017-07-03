import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from './users/Login';
import Dashboard from './common/Dashboard';
import Main from './common/Main';
import Logout from './users/Logout';
import Signup from './users/Signup';
import NewDocument from './documents/NewDocument';
import EditDocument from './documents/EditDocument';
import ViewDocuments from './documents/ViewDocuments';
import NewRole from './roles/NewRole';
import EditRole from './roles/EditRole';
import AllRoles from './roles/AllRoles';
import EditProfile from './users/EditProfile';
import AllUsers from './users/AllUsers';
import * as auth from './../utils/auth';
import { unauthorized } from './../actions/authActions';

/**
 * @class Routes
 * @desc Class to route all the pages
 * @extends React.Component
 */
class Routes extends Component {

  /**
   * @desc Set the Initial conditions for showing the Routes Page
   * @param {object} props - The property of the Routes Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  /**
   * @desc Check if the user is logged in
   * @param {string} nextState the next state to load
   * @param {string} replace the page to replace
   * @return {boolean} the login status
   */
  requireAuth(nextState, replace) {
    if (!auth.getToken()) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      });
      this.props.actions.unauthorized();
    }
  }

  /**
   * @desc Render the Routes of the News Page
   * @return {Page} the routes of the page
   */
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={Login} />
          <Route path="signup" component={Signup} />
          <Route onEnter={this.requireAuth}>
            <Route
              path="dashboard"
              component={Dashboard}
            />
            <Route
              path="new-document"
              component={NewDocument}
            />
            <Route
              path="document/edit/:id"
              component={EditDocument}
            />
            <Route
              path="role/edit/:id"
              component={EditRole}
            />
            <Route
              path="/document/:access"
              component={ViewDocuments}
            />
            <Route
              path="new-role"
              component={NewRole}
            />
            <Route
              path="all-roles"
              component={AllRoles}
            />
            <Route
              path="edit-profile"
              component={EditProfile}
            />
            <Route
              path="all-users"
              component={AllUsers}
            />
            <Route
              path="search"
              component={AllUsers}
            />
            <Route
              path="logout"
              component={Logout}
            />
          </Route>
        </Route>
      </Router>
    );
  }
}

/**
 * Set the PropTypes for Routes
 */
Routes.propTypes = {
  actions: PropTypes.shape({
    unauthorized: PropTypes.func,
  }),
};

/**
 * Sets default values for Routes Prototype
 */
Routes.defaultProps = {
  actions: {}
};

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ unauthorized }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Routes);
