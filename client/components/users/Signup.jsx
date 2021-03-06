import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as auth from './../../utils/auth';
import ProgressBar from './../../components/common/ProgressBar';
import { signup } from './../../actions/userActions';

/**
 * @class Signup
 * @desc Class to display the Signup Page
 * @extends React.Component
 */
export class Signup extends Component {

  /**
   * @desc Set the Initial conditions for showing the Signup Page
   * @param {object} props - The property of the Signup Page
   * @constructor
   */
  constructor(props) {
    super(props);

    this.createUser = this.createUser.bind(this);
  }

  /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  componentWillMount() {
    if (auth.getToken()) {
      auth.removeToken();
    }
  }

  /**
   * @desc Create a new user
   * @param {object} event - form event
   * @return {any} redirects user to dashboard or show error
   */
  createUser(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password === confirmPassword) {
      this.props.actions.signup({ name, email, password });
    } else {
      toastr.error('Password do not match');
    }
  }

  /**
   * @desc Displays the Signup Page
   * @return {any} The Signup form
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div><br /><br /></div>
          <div className="card col s12 offset-l3 l6 offset-m2 m8">
            <div className="card-content">
              <h4 className="card-title">Signup</h4>
              <div className="row">
                <form className="col s12" onSubmit={this.createUser}>
                  <ProgressBar />
                  {/* Name */}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="validate"
                        required="required"
                        pattern=".{3,}"
                        title="3 characters minimum"
                        oninvalid="this.setCustomValidity('Enter a valid Name')"
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                  </div>
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
                        pattern=".{6,}"
                        title="6 characters minimum"
                      />
                      <div className="help-text">
                        Password must have a minimum of 6 characters
                      </div>
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="validate"
                        required="required"
                        pattern=".{6,}"
                        title="6 characters minimum"
                      />
                      <div className="help-text">
                        Password must match the password given above
                      </div>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className="btn waves-effect waves-light"
                    id="signUpButton"
                    type="submit"
                    name="submit"
                  >
                    Create Account
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
 * Set the PropTypes for Signup
 */
Signup.propTypes = {
  actions: PropTypes.shape({
    signup: PropTypes.func,
  }),
};

/**
 * Sets default values for Signup Prototype
 */
Signup.defaultProps = {
  actions: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
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
    actions: bindActionCreators({ signup }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

