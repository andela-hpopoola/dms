import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginByToken } from './../../actions/userActions';
import * as auth from './../../utils/auth';
import Login from './../users/Login';
import Dashboard from './../common/Dashboard';
/**
 * @desc Set the PropTypes for Homepage
 * @param {object} props - default properties
 * @return {jsx} returns jsx page component
 */
class Homepage extends Component {
    /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  componentWillMount() {
    if (auth.getToken()) {
      this.props.actions.loginByToken();
      this.loggedIn = true;
    }
  }

  /**
   * @desc Displays the Homepage Page
   * @return {any} The Homepage form
   */
  render() {
    return (
      <div className="Homepage">
        {
          this.loggedIn ?
            <Dashboard /> :
            <Login />
        }
      </div>
    );
  }
}

/**
 * Set the PropTypes for Homepage
 */
Homepage.propTypes = {
  actions: PropTypes.shape({
    loginByToken: PropTypes.func,
  }),
};

/**
 * Sets default values for Homepage Prototype
 */
Homepage.defaultProps = {
  actions: {}
};

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ loginByToken }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Homepage);

