import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDocument } from './../../actions/documentActions';
import ProgressBar from './../../components/common/ProgressBar';
import { DOCUMENTS, EDITOR_CONFIG } from './../../../constants';

// Require Editor JS files.
require('./../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js');
// Require Editor CSS files.
require('./../../../node_modules/froala-editor/css/froala_style.min.css');
require('./../../../node_modules/froala-editor/css/froala_editor.pkgd.min.css');

// Require Font Awesome.
require('./../../../node_modules/font-awesome/css/font-awesome.css');

const FroalaEditor = require('react-froala-wysiwyg');

/**
 * @class EditDocument
 * @desc Class to display the EditDocument Page
 * @extends React.Component
 */
class EditDocument extends Component {

  /**
   * @desc Set the Initial conditions for showing the EditDocument Page
   * @param {object} props - The property of the EditDocument Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      form: {},
      model: 'starting text'
    };
    this.updateExistingDocument = this.updateExistingDocument.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
  }

  /**
   * @desc Invoked after a component is mounted
   * @return {void} returns nothing
   */
  componentDidMount() {
    this.props.actions.getDocument(this.state.id);
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
   * @desc Handle Editor change
   * @param {object} content - content from text editor
   * @return {string} the content
   */
  handleModelChange(content) {
    const form = this.state.form;
    form.content = content;
    return this.setState({ form });
  }
  /**
   * @desc maps state to properties
   * @param {object} event - form event
   * @return {any} redirects document to dashboard or show error
   */
  updateExistingDocument(event) {
    event.preventDefault();
    const form = this.state.form;
    if (typeof form.content !== 'undefined' &&
      (form.content.length < 6)) {
      toastr.error('Document content must be greater than 6');
    } else {
      this.props.onUpdate(form, this.props.currentDocument);
    }
  }

  /**
   * @desc Displays the EditDocument Page
   * @return {any} The EditDocument form
   */
  render() {
    const { currentDocument } = this.props;
    let access = 'Role';
    switch (currentDocument.access) {
      case DOCUMENTS.PRIVATE:
        access = 'Private';
        break;

      case DOCUMENTS.PUBLIC:
        access = 'Public';
        break;

      default:
        // no default
    }

    return (
      <div className="row">
        <div className="card col s12">
          <div className="card-content">
            <span className="card-title">EditDocument</span><br />
            <div className="row">
              <form className="col s12" onSubmit={this.updateExistingDocument}>

                <h4>{currentDocument.title}</h4>

                {/* Title */}
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="validate"
                      value={this.state.form.title || currentDocument.title}
                      required="required"
                      onChange={this.handleFormChange}
                      pattern=".{6,}"
                      title="6 characters minimum"
                    />
                    <label htmlFor="title" className="active">Title</label>
                  </div>
                </div>

                {/* Content */}
                <FroalaEditor
                  tag="textarea"
                  config={EDITOR_CONFIG}
                  model={this.state.form.content || currentDocument.content}
                  onModelChange={this.handleModelChange}
                />
                {/* Access */}
                <div className="row">
                  <div className="input-field col s12">
                    <h6><strong>Access</strong></h6>
                    <select
                      name="access"
                      className="browser-default"
                      onChange={this.handleFormChange}
                    >
                      <option value={currentDocument.access}>
                        Current Access Level ({access})
                      </option>
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

                <ProgressBar />

                {/* Submit Button */}
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="submit"
                >
                  Send
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for EditDocument
 */
EditDocument.propTypes = {
  id: PropTypes.string.isRequired,
  roleId: PropTypes.number,
  actions: PropTypes.shape({
    getDocument: PropTypes.func,
  }),
  onUpdate: PropTypes.func.isRequired,
  currentDocument: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    access: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

/**
 * Sets default values for EditDocument Prototype
 */
EditDocument.defaultProps = {
  actions: {},
  currentDocument: {},
  roleId: 0,
  ajaxStatus: false,
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    currentDocument: state.documents.current,
    roleId: state.user.roleId,
    userId: state.user.id,
    ajaxStatus: state.ajaxStatus,
  };
}


/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getDocument }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);

