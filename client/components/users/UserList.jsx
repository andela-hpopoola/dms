import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserRow from './UserRow';

/**
 * All Users
 * @class
 * @desc List of Users
 * @param {array} props current user documents
 * @returns {jsx} the listed document
 */
class AllUsers extends Component {
  /**
   * @desc Set the Initial conditions for showing the SearchForm Page
   * @param {object} props - The property of the SearchForm Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * @desc Returns the value in the Search Field
   * @param {function} event - event of the field
   * @return {string} Value in String Field
   */
  handleSearch(event) {
    event.preventDefault();
    this.props.onChange(event.target.search.value);
  }

  /**
   * @desc Displays the SearchForm Page
   * @return {any} The SearchForm form
   */
  render() {
    let allUsers = [];
    const { users, count } = this.props;
    allUsers = users.map(
      (user, index) => (<UserRow
        index={count + index + 1}
        user={user}
        roleId={this.props.roleId}
        key={user.id}
        onDelete={this.props.onDelete}
      />)
    );
    return (
      <div className="row card">
        <div className="card-content">
          <form onSubmit={this.handleSearch}>
            <div className="col s12">
              <div className="input-field col s9">
                <input
                  name="search"
                  type="text"
                  className="validate white"
                  required="required"
                  pattern=".{3,}"
                  title="3 characters minimum"
                />
                <label htmlFor="search">Search for Users</label>
              </div>
              <div className="input-field col s3">
                <button
                  className="btn red darken-2 waves-effect waves-light"
                  type="submit"
                >
                  Search Users
                </button>
              </div>
            </div>
          </form>

          <table className="bordered highlight responsive-table">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              { allUsers }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for UserList
 */
AllUsers.propTypes = {
  roleId: PropTypes.number.isRequired,
  count: PropTypes.number,
  users: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

/**
 * Set default values for UserList
 */
AllUsers.defaultProps = {
  users: [],
  count: 0
};

export default AllUsers;
