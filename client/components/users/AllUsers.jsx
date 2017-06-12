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
      key={user.id}
    />)
  );
  return (
    <div className="row">
      <table>
        { allUsers }
      </table>
    </div>
  );
};

/**
 * Set the PropTypes for UserList
 */
AllUsers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

/**
 * Set default values for UserList
 */
AllUsers.defaultProps = {
  users: []
};

export default AllUsers;
