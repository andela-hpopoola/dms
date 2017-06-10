import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Sidebar from './../layout/Sidebar';

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
 * Nav
 * @desc Page Navigation
 * @param {object} props default properties
 * @returns {jsx} the page navigation
 */
const Nav = (props) => {
  const { userIsLoggedIn } = props;
  return (
    <div className="navbar-fixed">
      <nav className="row  red darken-2">
        <div className="nav-wrapper col s12">
          <div className="main-container">
            { userIsLoggedIn && <Sidebar /> }
            <a href="#!" className="brand-logo">DMS</a>
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

/* <div className="col l4 top__space">
  <ul className="collection with-header">
    <li className="collection-header"><h4>Menu</h4></li>
    <li className="collection-item">
      <div>
        <a onClick={this.getMyDocuments} href="#!my-documents">
          My Documents
        </a>
      </div>
    </li>
    <li className="collection-item">
      <div>
        <a onClick={this.getPublicDocuments} href="#!public-documents">
          Public Documents
        </a>
      </div>
    </li>
    <li className="collection-item">
      <div>
        <a onClick={this.getRoleDocuments} href="#!public-documents">
          Role Documents
        </a>
      </div>
    </li>
    <li className="collection-item">
      <div>
        <Link to="/new-document">
          New Document
        </Link>
      </div>
    </li>
  </ul>
</div> */
