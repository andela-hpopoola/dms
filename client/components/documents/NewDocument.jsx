import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from './../layout/Sidebar';
import { DOCUMENTS, EDITOR_CONFIG } from './../../../constants';
import { createDocument } from './../../actions/documentActions';
// Require Editor JS files.
require('./../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js');
// Require Editor CSS files.
require('./../../../node_modules/froala-editor/css/froala_style.min.css');
require('./../../../node_modules/froala-editor/css/froala_editor.pkgd.min.css');

// Require Font Awesome.
require('./../../../node_modules/font-awesome/css/font-awesome.css');

const FroalaEditor = require('react-froala-wysiwyg');

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
    this.state = {
      model: '',
    };
    this.createNewDocument = this.createNewDocument.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }

 /**
   * @desc Handle Editor change
   * @param {object} content - the content of the editor
   * @return {string} the content
   */
  handleModelChange(content) {
    return this.setState({ content });
  }

  /**
   * @desc Create a New Document
   * @param {object} event - form event
   * @return {any} redirects document to dashboard or show error
   */
  createNewDocument(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const content = this.state.content || '';
    const access = event.target.access.value;
    if (typeof content === 'undefined' || (content.length < 6)) {
      toastr.error('Enter a valid document content');
    } else {
      this.props.actions.createDocument({ title, content, access });
    }
  }

  /**
   * @desc Displays the NewDocument Page
   * @return {any} The NewDocument form
   */
  render() {
    return (
      <div className="main-container">
        <div className="row">
          <Sidebar />

          <div className="col l9 top__space">
            <div className="row">
              <div className="card col s12">
                <div className="card-content">
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
                            pattern=".{6,}"
                            title="6 characters minimum"
                          />
                          <label htmlFor="title">Title</label>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="col s12">
                        <FroalaEditor
                          tag="textarea"
                          config={EDITOR_CONFIG}
                          model={this.state.content}
                          onModelChange={this.handleModelChange}
                        />
                      </div>

                      {/* Access */}
                      <div className="row">
                        <div className="input-field col s12">
                          <h6><strong>Access</strong></h6>
                          <select name="access" className="browser-default">
                            <option value={DOCUMENTS.PRIVATE}>
                              Document can be viewed by only me (Private)
                            </option>
                            <option value={DOCUMENTS.PUBLIC}>
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
                        Submit
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
 * Set the PropTypes for NewDocument
 */
NewDocument.propTypes = {
  actions: PropTypes.shape({
    createDocument: PropTypes.func,
  }),
  roleId: PropTypes.number
};

/**
 * Sets default values for NewDocument Prototype
 */
NewDocument.defaultProps = {
  roleId: 0,
  actions: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
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

