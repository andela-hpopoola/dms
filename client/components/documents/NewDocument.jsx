import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createDocument } from './../../actions/documentActions';


/**
 * @class NewDocument
 * @desc Class to display the NewDocument Page
 * @extends React.Component
 */
class NewDocument extends Component {

  /**
   * @desc Set the Initial conditions for showing the NewDocument Page
   * @param {object} props - The property of the NewDocument Page
   * @constructor
   */
  constructor(props) {
    super(props);

    this.createNewDocument = this.createNewDocument.bind(this);
  }

  /**
   * @desc maps state to properties
   * @param {object} event - form event
   * @return {any} redirects document to dashboard or show error
   */
  createNewDocument(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;
    const access = event.target.access.value;
    const userId = this.props.userId;
    console.log({ title, content, access });
    this.props.actions.createDocument({ title, content, access, userId });
  }

  /**
   * @desc Displays the NewDocument Page
   * @return {any} The NewDocument form
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col s12">
            <div className="card-content">
              <span className="card-title">NewDocument</span><br />
              <div className="row">
                <form className="col s12" onSubmit={this.createNewDocument}>

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

                  {/* Content */}
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        id="content"
                        name="content"
                        type="text"
                        className="materialize-textarea"
                        required="required"
                      />
                      <label htmlFor="content">Content</label>
                    </div>
                  </div>

                  {/* Access */}
                  <div className="row">
                    <div className="input-field col s12">
                      <h6><strong>Access</strong></h6>
                      <select name="access" className="browser-default">
                        <option value="0">
                          Document can be viewed by only me (Private)
                        </option>
                        <option value="-1">
                          Document can be viewed by everyone (Public)
                        </option>
                        <option value={this.props.roleId}>
                          Document can be viewed by same role (Role)
                        </option>
                      </select>
                    </div>
                  </div>


                  {/* Submit Button */}
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="submit"
                  >
                    {this.props.ajaxCallsInProgress ? 'Submitting...' : 'Submit'}
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
 * Set the PropTypes for NewDocument
 */
NewDocument.propTypes = {
  roleId: PropTypes.number,
  userId: PropTypes.number,
  ajaxCallsInProgress: PropTypes.bool,
  actions: PropTypes.shape({
    createDocument: PropTypes.func,
  }),
};

/**
 * Sets default values for NewDocument Prototype
 */
NewDocument.defaultProps = {
  ajaxCallsInProgress: false,
  actions: {},
  roleId: 0,
  userId: 0,
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    ajaxCallsInProgress: state.ajaxCallsInProgress,
    roleId: state.user.roleId
  };
}


/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createDocument }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDocument);

