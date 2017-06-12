import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
   * @desc maps state to properties
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
      <div className="card col s12">
        <div className="card-content">
          <span className="card-title">NewRole</span><br />
          <div className="row">
            <form className="col s12" onSubmit={this.createNewRole}>

              {/* Title */}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="validate"
                    required="required"
                  />
                  <label htmlFor="title">Title</label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="submit"
              >
                Submit
                <i className="fa fa-right">send</i>
              </button>

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

export default NewRole;

