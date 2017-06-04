import React from 'react';

/**
 * @desc Set the PropTypes for Main
 * @param {object} props - default properties
 * @return {jsx} returns jsx page component
 */
const Sidebar = () => (
  <ul className="collection with-header">
    <li className="collection-header"><h4>Menu</h4></li>
    <li className="collection-item"><div><a href="#">My Documents</a></div></li>
    <li className="collection-item"><div><a href="#">Public Documents</a></div></li>
    <li className="collection-item"><div><a href="#">View Documents</a></div></li>
    <li className="collection-item"><div><a href="#">New Document</a></div></li>
  </ul>
);

export default Sidebar;
