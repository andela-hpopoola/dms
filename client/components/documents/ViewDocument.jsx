import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetAlert from 'sweetalert';
import { getDocument, deleteDocument } from './../../actions/documentActions';


/**
 * @class ViewDocument
 * @desc Class to display the ViewDocument Page
 * @extends React.Component
 */
class ViewDocument extends Component {

  /**
   * @desc Set the Initial conditions for showing the EditDocument Page
   * @param {object} props - The property of the EditDocument Page
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      openAlert: false
    };

    this.delete = this.delete.bind(this);
    this.deleteAlert = this.deleteAlert.bind(this);
  }
  /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  componentWillMount() {
    this.props.actions.getDocument(this.props.params.id);
  }

  /**
   * @desc Displays the ViewDocument Page
   * @return {any} The ViewDocument form
   */
  deleteAlert() {
    sweetAlert({
      title: 'Delete Document',
      text: 'You are about to delete this document',
      type: 'error',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, this.delete);
  }

  /**
   * @desc Deletes a document
   * @param {booleam} isConfirm - Confirmation to delete
   * @return {any} The document to delete
   */
  delete(isConfirm) {
    if (isConfirm) {
      this.props.actions.deleteDocument(this.props.params.id);
    }
  }

  /**
   * @desc Displays the ViewDocument Page
   * @return {any} The ViewDocument form
   */
  render() {
    const { currentDocument } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="card col s12">
            <div className="card-content">
              <span className="card-title">ViewDocument</span><br />
              <button
                onClick={this.deleteAlert}
                className="waves-effect waves-light btn right"
              >
                <i className="fa fa-cloud" />
                Delete
              </button>
              <div className="row">
                <div className="col s12">
                  <h4>{currentDocument.title}</h4>
                  <div>{currentDocument.content}</div>
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
 * Set the PropTypes for ViewDocument
 */
ViewDocument.propTypes = {
  actions: PropTypes.shape({
    getDocument: PropTypes.func,
    deleteDocument: PropTypes.func,
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
  params: PropTypes.shape({
    id: PropTypes.string,
  })
};

/**
 * Sets default values for ViewDocument Prototype
 */
ViewDocument.defaultProps = {
  actions: {},
  currentDocument: {},
  params: 0
};


/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    currentDocument: state.documents.current
  };
}


/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getDocument, deleteDocument }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDocument);

