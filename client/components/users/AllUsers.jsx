import React, { PropTypes } from 'react';
import UserRow from './UserRow';

/**
 * All Users
 * @desc List of Users
 * @param {array} props current user documents
 * @returns {jsx} the listed document
 */
const AllUsers = (props) => {
  let allUsers = [];
  const { users } = props;
  allUsers = users.map(
    (user, index) => (<UserRow
      index={index + 1}
      user={user}
      roleId={props.roleId}
      key={user.id}
      onDelete={props.onDelete}
    />)
  );

  return (
    <div className="row card">
      <div className="card-content">
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
              className="btn  red darken-2 waves-effect waves-light"
              type="submit"
            >
              Search Users
            </button>
          </div>
        </div>
        <table className="bordered highlight responsive-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
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
};

/**
 * Set the PropTypes for UserList
 */
AllUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired
};

/**
 * Set default values for UserList
 */
AllUsers.defaultProps = {
  users: []
};

export default AllUsers;
