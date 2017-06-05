import React, { Component } from 'react';
import { Link } from 'react-router';

/**
 * @class Nav
 * @desc Page Navigation
 * @returns {jsx} the page navigation
 */
const Nav = () => {

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <a href="#!" className="brand-logo">DMS</a>
            <ul className="right">
              <li>
                <a href="#!">
                  <i className="material-icons left">search</i>
                  Link with Left Icon
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="material-icons right">view_module</i>
                  Link with Right Icon
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

