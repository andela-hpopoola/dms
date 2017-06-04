import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * @class Nav
 * @desc Page Navigation
 * @returns {jsx} the page navigation
 */
class Nav extends Component{
  /**
   * @desc Renders the Top Navigation
   * @return {string} Navigation
   */
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <div className="container">
              <a href="#!" className="brand-logo">DMS</a>
              <ul className="right">
                <li>
                  <Link to="signup">
                    <i className="material-icons right">view_module</i>
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to="logout">
                    <i className="material-icons right">view_module</i>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;

