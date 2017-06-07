import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from './../layout/Sidebar';
import { Link } from 'react-router';
import DocumentList from './../documents/DocumentList';
import { publicDocumentDispatcher } from './../../actions/documentActions';
/**
 * @class Dashboard
 * @desc Class to display the dashboard
 * @extends React.Component
 */
class Dashboard extends Component {

  /**
   * @desc Set the Initial conditions for showing the Dashboard
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      currentDocuments: []
    };
    this.getPublicDocuments = this.getPublicDocuments.bind(this);
    this.getMyDocuments = this.getMyDocuments.bind(this);

    this.props.actions.publicDocumentDispatcher();
  }


  /**
   * @desc Get all my Documents
   * @return {void} returns nothing
   */
  getMyDocuments() {
    this.setState({ currentDocuments: [] });
    // console.log('public documents');
  }

  /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  getPublicDocuments() {
    console.log(this.props);
    this.setState({ 
      currentDocuments: this.props.publicDocuments,
      documentSource: 'Public Documents'
    });
  }

  /**
   * @desc Displays the Dashboard
   * @return {any} The Dashboard Content
   */
  render() {
    const { user } = this.props;
    console.log(user);
    let documents = this.state.currentDocuments;
    let documentSource = this.state.documentSource;
    console.log(documents);
    if (documents.length === 0) {
      documents = user.documents;
      documentSource = 'Personal Documents';
    }

    const noOfDocuments = documents.length;

    return (
      <div className="container">
        <div className="row">
          <div className="col l4">
            <ul className="collection with-header">
              <li className="collection-header"><h4>Menu</h4></li>
              <li className="collection-item"><div><Link onClick={this.getMyDocuments} href="#!my-documents">My Documents</Link></div></li>
              <li className="collection-item"><div><a onClick={this.getPublicDocuments} href="#!public-documents">Public Documents</a></div></li>
              <li className="collection-item"><div><Link to="/new-document">New Document</Link></div></li>
            </ul>
          </div>
          <div className="col l8">
            <h1>Welcome to the Dashboard {user.name} ({user.email})</h1>
            <h3> {noOfDocuments} {documentSource}</h3>
            <DocumentList documents={documents} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for Dashboard
 */
Dashboard.propTypes = {
  ajaxStatus: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
    documents: PropTypes.array,
  })
};

/**
 * Sets default values for Dashboard Prototype
 */
Dashboard.defaultProps = {
  ajaxStatus: false,
  user: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    publicDocuments: state.documents.public,
    ajaxStatus: state.ajaxStatus
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



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

