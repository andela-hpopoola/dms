import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import Sidebar from './../layout/Sidebar';
import { updateProfile } from './../../actions/userActions';

/**
 * @class EditProfile
 * @desc Class to display the EditProfile Page
 * @extends React.Component
 */
class EditProfile extends Component {
  /**
   * @desc Set the Initial conditions for showing the EditProfile Page
   * @param {object} props - The property of the EditProfile Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
    this.updateProfile = this.updateProfile.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  /**
   * @desc Get the values of form fields
   * @param {object} event - the event of the form
   * @return {void} returns state
   */
  handleFormChange(event) {
    const field = event.target.name;
    const form = this.state.form;
    form[field] = event.target.value;
    return this.setState({ form });
  }

  /**
   * @desc Update user profile
   * @param {object} event - form event
   * @return {any} redirects document to dashboard or show error
   */
  updateProfile(event) {
    event.preventDefault();
    const form = this.state.form;
    if ((typeof form.password !== 'undefined') &&
      (typeof form.confirmPassword !== 'undefined') &&
      (form.password !== form.confirmPassword)) {
      toastr.error('Password do not match');
    } else {
      this.props.actions.updateProfile(form, this.props.user);
    }
  }

  /**
   * @desc Displays the EditProfile Page
   * @return {any} The EditProfile form
   */
  render() {
    const user = this.props.user;

    return (
      <div className="main-container">
        <div className="row">
          <Sidebar />

          <div className="col l9 top__space">
            <div className="row">
              <div className="card col s12">
                <div className="card-content">
                  <div className="row">
                    <form className="col s12" onSubmit={this.updateProfile}>

                      <h4>Edit Profile</h4>

                      {/* Name */}
                      <div className="row">
                        <div className="input-field col s12">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            className="validate"
                            value={this.state.form.name || user.name}
                            required="required"
                            onChange={this.handleFormChange}
                            pattern=".{3,}"
                            title="3 characters minimum"
                          />
                          <label htmlFor="name" className="active">Name</label>
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
                            value={this.state.form.email || user.email}
                            required="required"
                            onChange={this.handleFormChange}
                          />
                          <label htmlFor="email" className="active">Email</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12">
                          <h5>Leave password field blank to retain current password</h5>
                        </div>
                      </div>
                      {/* New Password */}
                      <div className="row">
                        <div className="input-field col s12">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            className="validate"
                            onChange={this.handleFormChange}
                            pattern=".{0}|.{6,}"
                            title="Either 0 OR (6 chars minimum)"
                          />
                          <label htmlFor="password">New Password</label>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div className="row">
                        <div className="input-field col s12">
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className="validate"
                            onChange={this.handleFormChange}
                            pattern=".{0}|.{6,}"
                            title="Either 0 OR (6 chars minimum)"
                          />
                          <label htmlFor="password">Confirm New Password</label>
                        </div>
                      </div>


                      {/* Submit Button */}
                      <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="submit"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for EditProfile
 */
EditProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  actions: PropTypes.shape({
    updateProfile: PropTypes.func.isRequired, 
  }),

};

/**
 * Sets default values for EditProfile Prototype
 */
EditProfile.defaultProps = {
  user: {},
  actions: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.user,
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
      updateProfile
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

