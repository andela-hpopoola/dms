import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * @class Dashboard
 * @desc Class to display the dashboard
 * @extends React.Component
 */
class Dashboard extends Component {

  /**
   * @desc Set the Initial conditions for showing the Dashboard
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }

  /**
   * @desc Displays the Dashboard
   * @return {any} The Dashboard Content
   */
  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <h1>Welcome to the Dashboard {user.name} ({user.email})</h1>
      </div>
    );
  }
}

/**
 * Set the PropTypes for Dashboard
 */
Dashboard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
    documents: PropTypes.object
  })
};

/**
 * Sets default values for Dashboard Prototype
 */
Dashboard.defaultProps = {
  user: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.user
  };
}


export default connect(mapStateToProps)(Dashboard);

