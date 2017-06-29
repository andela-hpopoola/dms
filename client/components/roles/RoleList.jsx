import React, { PropTypes } from 'react';
import RoleRow from './RoleRow';

/**
 * All Roles
 * @desc List of Roles
 * @param {array} props current role documents
 * @returns {jsx} the listed document
 */
const RoleList = (props) => {
  let roleList = [];
  const { roles } = props;
  roleList = roles.map(
    (role, index) => (<RoleRow
      index={index + 1}
      role={role}
      key={role.id}
      onDelete={props.onDelete}
    />)
  );
  return (
    <div className="row card">
      <div className="card-content">
        <table className="bordered highlight responsive-table">
          <tr>
            <th>S/N</th>
            <th>Role Title</th>
            <th className="center-align">No of Users</th>
            <th>&nbsp;</th>
          </tr>
          { roleList }
        </table>
      </div>
    </div>
  );
};

/**
 * Set the PropTypes for RoleList
 */
RoleList.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired
};

/**
 * Set default values for RoleList
 */
RoleList.defaultProps = {
  roles: []
};

export default RoleList;
