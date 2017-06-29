import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * Role Single
 * @desc Formats a Single Role
 * @param {object} props an object of role details
 * @returns {jsx} the formatted role
 */
const RoleRow = (props) => {
  const { role } = props;
  const { index } = props;
  const usersCount = role.usersCount || 0;
  const handleDelete = (event) => {
    event.preventDefault();
    props.onDelete(event.target.id);
  };
  return (
    <tbody>
      <tr className="role__list">
        <td>{index}</td>
        <td>{role.title}</td>
        <td className="center-align">{usersCount}</td>
        <td>
          {usersCount < 1 ?
            <Link
              id={role.id}
              className="waves-effect waves-light btn-flat"
              onClick={handleDelete}
            >
              Delete
            </Link>
          : '' }
        </td>
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
  onDelete: PropTypes.func.isRequired
};

/**
 * Set default values for RoleRow
 */
RoleRow.defaultProps = {
  role: {}
};


export default RoleRow;
