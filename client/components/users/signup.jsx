import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signup } from './../../actions/userActions';


/**
 * @class Signup
 * @desc Class to display the Signup Page
 * @extends React.Component
 */
class Signup extends Component {

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
   * @desc maps state to properties
   * @param {object} event - form event
   * @return {any} redirects user to dashboard or show error
   */
  createUser(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    this.props.actions.signup({ name, email, password });
  }

  /**
   * @desc Displays the Signup Page
   * @return {any} The Signup form
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col s12">
            <div className="card-content">
              <span className="card-title">Signup</span><br />
              <div className="row">
                <form className="col s12" onSubmit={this.createUser}>

                  {/* Name */}
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="validate"
                        required="required"
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
 * Set the PropTypes for Signup
 */
Signup.propTypes = {
  ajaxStatus: PropTypes.bool,
  actions: PropTypes.shape({
    signup: PropTypes.func,
  }),
};

/**
 * Sets default values for Signup Prototype
 */
Signup.defaultProps = {
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
    actions: bindActionCreators({ signup }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

