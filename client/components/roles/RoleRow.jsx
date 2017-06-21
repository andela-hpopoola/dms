import React from 'react';
import PropTypes from 'prop-types';

/**
 * Role Single
 * @desc Formats a Single Role
 * @param {object} props an object of role details
 * @returns {jsx} the formatted role
 */
const RoleRow = (props) => {
  const { role } = props;
  const { index } = props;

  return (
    <tbody>
      <tr>
        <td>{index}</td>
        <td>{role.title}</td>
        <td>{role.usersCount || 0}</td>
      </tr>
    </tbody>
  );
};

/**
 * Set the PropTypes for RoleRow
 */
RoleRow.propTypes = {
  role: PropTypes.shape({
    title: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

/**
 * Set default values for RoleRow
 */
RoleRow.defaultProps = {
  role: {}
};


export default RoleRow;
