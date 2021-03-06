import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// list to show when user is logged in
const loggedInList = (
  <li>
    <Link to="/logout" id="logout">
      Logout &nbsp;
      <i className="fa fa-sign-out" />
    </Link>
  </li>
);

// list to show when user is not logged in
const notloggedInList = (
  <li>
    <Link to="/signup">
      Signup &nbsp;
      <i className="fa fa-user" />
    </Link>
  </li>
);

/**
 * Nav
 * @desc Page Navigation
 * @param {object} props default properties
 * @returns {jsx} the page navigation
 */
export const Nav = (props) => {
  const { userIsLoggedIn } = props;
  return (
    <div className="navbar-fixed">
      <nav className="row red darken-2">
        <div className="nav-wrapper col s12">
          <div className="main-container">
            { userIsLoggedIn }
            <Link to="/" className="brand-logo">DMS</Link>
            <ul className="right">
              { userIsLoggedIn ? loggedInList : notloggedInList }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};


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
