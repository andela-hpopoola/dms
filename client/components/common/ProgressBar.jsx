import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// show the progress bar
const progressBarContainer = (
  <div className="progress">
    <div className="indeterminate" />
  </div>
);

/**
 * ProgressBar
 * @desc Page ProgressBar
 * @param {object} props default properties
 * @returns {jsx} the page ProgressBar
 */
const ProgressBar = (props) => {
  const { showProgressBar } = props;
  return (
    <div className="progressBarContainer">
      { showProgressBar && progressBarContainer }
    </div>
  );
};


/**
 * Set the PropTypes for ProgressBar
 */
ProgressBar.propTypes = {
  showProgressBar: PropTypes.bool,
};

/**
 * Sets default values for ProgressBar Prototype
 */
ProgressBar.defaultProps = {
  showProgressBar: false,
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    showProgressBar: state.ajaxStatus
  };
}

export default connect(mapStateToProps)(ProgressBar);

