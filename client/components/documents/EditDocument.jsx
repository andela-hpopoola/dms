import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TinyMCE from 'react-tinymce';
import { getDocument, updateDocument } from './../../actions/documentActions';
import ProgressBar from './../../components/common/ProgressBar';


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
      form: {},
    };
    this.updateExistingDocument = this.updateExistingDocument.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   * @desc Invoked after a component is mounted
   * @return {void} returns nothing
   */
  componentDidMount() {
    this.props.actions.getDocument(this.props.params.id);
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
   * @param {object} event - the event of the editor
   * @return {string} the content
   */
  handleEditorChange(event) {
    const form = this.state;
    form.content = event.target.getContent();
    return this.setState({ form });
    // console.log('Content was updated:', e.target.getContent());
  }

  /**
   * @desc maps state to properties
   * @param {object} event - form event
   * @return {any} redirects document to dashboard or show error
   */
  updateExistingDocument(event) {
    event.preventDefault();
    this.props.actions.updateDocument(this.state.form, this.props.currentDocument);
  }

  /**
   * @desc Displays the EditDocument Page
   * @return {any} The EditDocument form
   */
  render() {
    const { currentDocument } = this.props;
    const access = currentDocument.access;
    return (
      <div className="container">
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
                      />
                      <label htmlFor="title" className="active">Title</label>
                    </div>
                  </div>

                  {/* Content */}
                  <TinyMCE
                    content={this.state.form.content || currentDocument.content}
                    config={{
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    onChange={this.handleEditorChange}
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
                        <option value={access}>
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
 * Set the PropTypes for EditDocument
 */
EditDocument.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string
  }),
  roleId: PropTypes.number,
  actions: PropTypes.shape({
    getDocument: PropTypes.func,
    updateDocument: PropTypes.func,
  }),
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
  params: 1,
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
    actions: bindActionCreators({ updateDocument, getDocument }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDocument);

