import React from 'react';
import PropTypes from 'prop-types';
import Nav from './../layout/Nav';

/**
 * @desc Set the PropTypes for Main
 * @param {object} props - default properties
 * @return {jsx} returns jsx page component
 */
const Main = props => (
  <div className="main">
    <Nav />
    { props.children }
  </div>
);

/**
 * Set the PropTypes for Main
 */
Main.propTypes = {
  children: PropTypes.element.isRequired
};

export default Main;
