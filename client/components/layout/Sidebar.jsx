import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchForm from './../common/SearchForm';
import {
  searchDocumentsDispatcher
 } from './../../actions/documentActions';


/**
 * The method is used to search for documents
 * @param {string} query - get the documents to search
 * @return {object} redirects to the search page
 */
const searchForDocuments = (query) => {
  browserHistory.push(`/document/search?q=${query}`);
};

/**
 * Sidebar
 * @desc Page Sidebar
 * @param {object} props default properties
 * @returns {jsx} the page Sidebar
 */
class Sidebar extends Component {
  /**
   * @desc Set the Initial conditions for showing the Sidebar
   * @param {object} props - The property of the Sidebar
   * @constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * @desc Displays the Sidebar
   * @return {any} The Sidebar Content
   */
  render() {
    return (
      <div className="col l3 top__space">
        <div className="white">
          <ul className="collection with-header">
            <li className="collection-header"><h4>Quick Links</h4></li>
            <li className="collection-item">
              <Link to="/dashboard"> Dashboard </Link>
            </li>
            <li className="collection-item">
              <Link to="/document/new"> New Documents </Link>
            </li>
            <li className="collection-item">
              <Link to="/document/private"> Private Documents </Link>
            </li>
            <li className="collection-item">
              <Link to="/document/public"> Public Documents </Link>
            </li>
            <li className="collection-item">
              <Link to="/document/role"> Role Documents </Link>
            </li>
            <li className="collection-item">
              <Link to="/all-roles"> All Roles </Link>
            </li>
            <li className="collection-item">
              <Link to="/edit-profile"> Edit Profile </Link>
            </li>
            <li className="collection-item">
              <Link to="/all-users"> All Users </Link>
            </li>
          </ul>
        </div>
        <div className="white">
          <ul className="collection">
            <li className="collection-item">
              <div>
                <SearchForm
                  onChange={searchForDocuments}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for Sidebar
 */
Sidebar.propTypes = {
  actions: PropTypes.shape({
    searchDocumentsDispatcher: PropTypes.func.isRequired,
  }),
};


/**
 * Sets default values for Sidebar Prototype
 */
Sidebar.defaultProps = {
  actions: {}
};

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      searchDocumentsDispatcher
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Sidebar);
