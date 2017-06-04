import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// list to show when user is logged in
const loggedInList = (
  <li>
    <Link to="logout">
      <i className="material-icons right">view_module</i>
      Logout
    </Link>
  </li>
);

// list to show when user is not logged in
const notloggedInList = (
  <li>
    <Link to="signup">
      <i className="material-icons right">view_module</i>
      Signup
    </Link>
  </li>
);

/**
 * @class Nav
 * @desc Page Navigation
 * @returns {jsx} the page navigation
 */
const Nav = (props) => {
  const { userIsLoggedIn } = props;
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <a href="#!" className="brand-logo">DMS</a>
            <ul className="right">
              { userIsLoggedIn ? loggedInList : notloggedInList }
            </ul>
          </div>
        </div>
      </nav>
    </div>
    );
}


/**
 * Set the PropTypes for Nav
 */
Nav.propTypes = {
  userIsLoggedIn: PropTypes.bool,
};

/**
 * Sets default values for Nav Prototype
 */
Nav.defaultProps = {
  userIsLoggedIn: false,
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    userIsLoggedIn: state.auth
  };
}

export default connect(mapStateToProps)(Nav);

