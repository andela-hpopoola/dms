import React from 'react';
import PropTypes from 'prop-types';
import { ROLES } from './../../../constants';

/**
 * User Single
 * @desc Formats a Single User
 * @param {object} props an object of user details
 * @returns {jsx} the formatted user
 */
const UserRow = (props) => {
  const { user, index } = props;

  let superAccess = false;
  if (props.roleId === ROLES.SUPERADMIN) {
    superAccess = true;
  }
  const handleDelete = (event) => {
    event.preventDefault();
    props.onDelete(event.target.id);
  };
  return (
    <tr className="user__row">
      <td>{index}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.createdAt.slice(0, 10)}</td>
      <td>
        {
          superAccess &&
          <a
            href="/#!"
            id={user.id}
            className="waves-effect waves-light btn-flat"
            onClick={handleDelete}
          >
            Delete
          </a>
        }
      </td>
    </tr>
  );
};

/**
 * Set the PropTypes for UserRow
 */
UserRow.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  roleId: PropTypes.number.isRequired
};

/**
 * Set default values for UserRow
 */
UserRow.defaultProps = {
  user: {}
};


export default UserRow;
