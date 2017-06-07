import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from './../layout/Sidebar';
import DocumentList from './../documents/DocumentList';
import { publicDocumentDispatcher } from './../../actions/documentActions';


/**
 * @class PublicDocuments
 * @desc Class to display the dashboard
 * @extends React.Component
 */
class PublicDocuments extends Component {

  /**
   * @desc Set the Initial conditions for showing the PublicDocuments
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }

  /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  componentWillMount() {
      this.props.actions.publicDocumentDispatcher();
  }

  /**
   * @desc Displays the PublicDocuments
   * @return {any} The PublicDocuments Content
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col l4">
            <Sidebar />
          </div>
          <div className="col l8">
            <h1>Public Documents</h1>
            <DocumentList documents={this.props.documents.public} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for PublicDocuments
 */
PublicDocuments.propTypes = {
  documents: PropTypes.shape({
    public: PropTypes.array,
  })
};

/**
 * Sets default values for PublicDocuments Prototype
 */
PublicDocuments.defaultProps = {
  documents: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ publicDocumentDispatcher }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicDocuments);
