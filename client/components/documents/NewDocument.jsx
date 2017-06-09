import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TinyMCE from 'react-tinymce';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { createDocument } from './../../actions/documentActions';
import { DOCUMENTS } from './../../../constants';


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
      content: '',
    };
    this.createNewDocument = this.createNewDocument.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   * @desc Handle Editor change
   * @param {object} event - the event of the editor
   * @return {string} the content
   */
  handleEditorChange(event) {
    const content = event.target.getContent();
    return this.setState({ content });
    // console.log('Content was updated:', e.target.getContent());
  }
  /**
   * @desc maps state to properties
   * @param {object} event - form event
   * @return {any} redirects document to dashboard or show error
   */
  createNewDocument(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const content = this.state.content || '';
    const access = event.target.access.value;
    const userId = this.props.userId;

    // Validation
    if (!this.state.content && (this.state.content.length < 6)) {
      toastr.error('Enter a valid document content');
    } else if (title.length < 6) {
      toastr.error('Your title must be more than 6 characters');
    } else {
      this.props.actions.createDocument({ title, content, access, userId });
    }
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
                  <TinyMCE
                    content=""
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
  actions: PropTypes.shape({
    createDocument: PropTypes.func,
  }),
};

/**
 * Sets default values for NewDocument Prototype
 */
NewDocument.defaultProps = {
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
    roleId: state.user.roleId,
    userId: state.user.id
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

