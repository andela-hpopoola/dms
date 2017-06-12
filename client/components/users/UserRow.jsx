import React from 'react';
import PropTypes from 'prop-types';

/**
 * User Single
 * @desc Formats a Single User
 * @param {object} props an object of user details
 * @returns {jsx} the formatted user
 */
const UserRow = (props) => {
  const { user } = props;
  const { index } = props;

  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    </tbody>
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
};

/**
 * Set default values for UserRow
 */
UserRow.defaultProps = {
  user: {}
};


export default UserRow;
