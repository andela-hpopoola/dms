import React from 'react';
import { Link } from 'react-router';
/**
 * @desc Set the PropTypes for Main
 * @param {object} props - default properties
 * @return {jsx} returns jsx page component
 */
const Sidebar = () => (
  <div>
    <ul className="collection with-header">
      <li className="collection-header"><h4>Menu</h4></li>
      <li className="collection-item"><div><a href="#">My Documents</a></div></li>
      <li className="collection-item"><div><a href="/public-document">Public Documents</a></div></li>
      <li className="collection-item"><div><a href="#">View Documents</a></div></li>
      <li className="collection-item"><div><Link to="/new-document">New Document</Link></div></li>
    </ul>
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s10">
            <input id="icon_prefix" type="text" placeholder="Search..." className="validate" />
          </div>
          <div className="input-field col s2">
            <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">search</i></a>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default Sidebar;
