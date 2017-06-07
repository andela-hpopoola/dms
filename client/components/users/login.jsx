import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, loginByToken } from './../../actions/userActions';
import * as auth from './../../utils/auth';

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


  /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  componentWillMount() {
    if (auth.getToken()) {
      this.props.actions.loginByToken(auth.getToken());
    }
  }

  /**
   * @desc maps state to properties
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
          <div className="card col s12">
            <div className="card-content">
              <span className="card-title">Login</span><br />
              <div className="row">
                <form className="col s12" onSubmit={this.authenticateUser}>

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
                    {this.props.ajaxStatus ? 'Submitting...' : 'Submit'}
                    <i className="material-icons right">send</i>
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
  ajaxStatus: PropTypes.bool,
  actions: PropTypes.shape({
    login: PropTypes.func,
    loginByToken: PropTypes.func,
  }),
};

/**
 * Sets default values for Login Prototype
 */
Login.defaultProps = {
  ajaxStatus: false,
  actions: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
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
    actions: bindActionCreators({ login, loginByToken }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

