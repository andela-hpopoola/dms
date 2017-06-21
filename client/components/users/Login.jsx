import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ProgressBar from './../../components/common/ProgressBar';
import { login, loginByToken } from './../../actions/userActions';

/**
 * @class Login
 * @desc Class to display the Login Page
 * @extends React.Component
 */
class Login extends Component {

  /**
   * @desc Set the Initial conditions for showing the Login Page
   * @param {object} props - The property of the Login Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  componentDidMount() {
    if (this.props.userIsLoggedIn) {
      this.redirectToDashboard();
    }
  }

  /**
   * @desc Invoked immediately after a props is passed to document
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userIsLoggedIn) {
      browserHistory.push('/dashboard');
    }
  }

  /**
   * @desc Checks if a user is logged in or not
   * @return {any} redirects user to dashboard or show error
   */
  redirectToDashboard() {
    browserHistory.push('/dashboard');
  }

  /**
   * @desc Authenticate the user
   * @param {object} event - form event
   * @return {any} redirects user to dashboard or show error
   */
  authenticateUser(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    this.props.actions.login({ email, password });
  }

  /**
   * @desc Displays the Login Page
   * @return {any} The Login form
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div><br /><br /></div>
          <div className="card col s12 offset-l3 l6 offset-m2 m8">
            <div className="card-content">
              <span className="card-title">Login</span><br />
              <div className="row">
                <form className="col s12" onSubmit={this.authenticateUser}>
                  <ProgressBar />

                  {/* Email */}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="validate"
                        required="required"
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="validate"
                        required="required"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

/**
 * Set the PropTypes for Login
 */
Login.propTypes = {
  actions: PropTypes.shape({
    login: PropTypes.func,
    loginByToken: PropTypes.func,
  }),
  userIsLoggedIn: PropTypes.bool,
};

/**
 * Sets default values for Login Prototype
 */
Login.defaultProps = {
  actions: {},
  userIsLoggedIn: false,
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    userIsLoggedIn: state.auth,
    errorMessage: state.errorMessage
  };
}


/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ login }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

