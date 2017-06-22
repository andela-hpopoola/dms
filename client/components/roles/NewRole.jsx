import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from './../layout/Sidebar';
import { createRole } from './../../actions/roleActions';
import toastr from 'toastr';

/**
 * @class NewRole
 * @desc Class to display the NewRole Page
 * @extends React.Component
 */
class NewRole extends Component {

  /**
   * @desc Set the Initial conditions for showing the NewRole Page
  * @param {object} props - The property of the NewRole Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      model: '',
    };
    this.createNewRole = this.createNewRole.bind(this);
  }

  /**
   * @desc Create a new role
   * @param {object} event - form event
   * @return {any} redirects role to dashboard or show error
   */
  createNewRole(event) {
    event.preventDefault();
    const title = event.target.title.value;
    this.props.onSubmit({ title });
  }

  /**
   * @desc Displays the NewRole Page
   * @return {any} The NewRole form
   */
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="row">
            <form className="col s12" onSubmit={this.createNewRole}>

              {/* Title */}
              <div className="row">
                <div className="input-field col s9">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="validate"
                    required="required"
                    pattern=".{3,}"
                    title="3 characters minimum"
                  />
                  <label htmlFor="title">Add a New Role</label>
                </div>
                {/* Submit Button */}
                <div className="input-field col s3">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for NewRole
 */
NewRole.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

/**
 * Sets default values for Dashboard Prototype
 */
NewRole.defaultProps = {
  actions: {}
};


export default NewRole;
