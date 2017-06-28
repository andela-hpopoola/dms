import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from './../../actions/userActions';


/**
 * @class Logout
 * @desc Class to display the Logout Page
 * @extends React.Component
 */
export class Logout extends Component {

  /**
   * @desc Invoked before a component is mounted
   * @return {void} returns nothing
   */
  componentWillMount() {
    this.props.actions.logout();
  }

  /**
   * @desc Displays the Logout Page
   * @return {any} The Logout form
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col s12">
            <div className="card-content">
              <span className="card-title">Logging out...</span><br />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

/**
 * Set the PropTypes for Logout
 */
Logout.propTypes = {
  actions: PropTypes.shape({
    logout: PropTypes.func,
  }),
};

/**
 * Sets default values for Logout Prototype
 */
Logout.defaultProps = {
  actions: {}
};

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ logout }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Logout);

