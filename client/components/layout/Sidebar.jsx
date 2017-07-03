import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import SearchForm from './../common/SearchForm';


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
    this.searchForDocuments = this.searchForDocuments.bind(this);
  }


  /**
   * The method is used to search for documents
   * @param {string} query - get the documents to search
   * @return {object} redirects to the search page
   */
  searchForDocuments(query) {
    this.query = query;
    if (this.query) {
      browserHistory.push(`/document/search?q=${query}`);
    }
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
              <Link to="/dashboard" className="sidebar__link" activeClassName="sidebar__link-active">
                <i className="fa fa-dashboard" />
                  &nbsp; Dashboard
              </Link>
            </li>
            <li className="collection-item">
              <Link to="/new-document" className="sidebar__link" activeClassName="sidebar__link-active">
                <i className="fa fa-file-text" />
                &nbsp; Create New Document
              </Link>
            </li>
            <li className="collection-item">
              <Link to="/document/private" className="sidebar__link" activeClassName="sidebar__link-active">
                <i className="fa fa-file" />
                &nbsp; Personal Documents
              </Link>
            </li>
            <li className="collection-item">
              <Link to="/document/public" className="sidebar__link" activeClassName="sidebar__link-active">
                <i className="fa fa-file" />
                &nbsp; Public Documents
              </Link>
            </li>
            <li className="collection-item">
              <Link to="/document/role" className="sidebar__link" activeClassName="sidebar__link-active">
                <i className="fa fa-file" />
                &nbsp; Role Documents
              </Link>
            </li>
            <li className="collection-item">
              <Link to="/edit-profile" className="sidebar__link" activeClassName="sidebar__link-active">
                <i className="fa fa-user" />
                &nbsp;  Edit Profile
              </Link>
            </li>
            <li className="collection-item">
              <Link to="/logout" className="sidebar__link" activeClassName="sidebar__link-active">
                <i className="fa fa-sign-out" />
                &nbsp; Log Out
              </Link>
            </li>
          </ul>
        </div>
        <div className="white">
          <ul className="collection">
            <li className="collection-item">
              <div>
                <SearchForm
                  onChange={this.searchForDocuments}
                  searchTerm={this.props.searchTerm}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  searchTerm: PropTypes.string,
};

Sidebar.defaultProps = {
  searchTerm: '',
};

export default Sidebar;
