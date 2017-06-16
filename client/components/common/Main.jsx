import React from 'react';
import PropTypes from 'prop-types';
import Nav from './../layout/Nav';
import Footer from './../layout/Footer';

/**
 * @desc Set the PropTypes for Main
 * @param {object} props - default properties
 * @return {jsx} returns jsx page component
 */
const Main = props => (
  <div className="main">
    <Nav />
    { props.children }
    <Footer />
  </div>
);

/**
 * Set the PropTypes for Main
 */
Main.propTypes = {
  children: PropTypes.element
};

/**
 * Sets default values for Main Prototype
 */
Main.defaultProps = {
  children: null
};


export default Main;
