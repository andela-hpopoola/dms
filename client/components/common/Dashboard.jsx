import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from './../layout/Sidebar';
import ProgressBar from './../../components/common/ProgressBar'; // eslint-disable-line
import DashboardCard from './DashboardCard';
import {
  publicDocumentsDispatcher,
  roleDocumentsDispatcher,
  privateDocumentsDispatcher
 } from './../../actions/documentActions';
/**
 * @class Dashboard
 * @desc Class to display the dashboard
 * @extends React.Component
 */
export class Dashboard extends Component {

  /**
   * @desc Set the Initial conditions for showing the Dashboard
   * @param {object} props - The property of the News Class
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.name || '',
      documents: {
        private: props.documents.private.length,
        public: props.documents.public.length,
        role: props.documents.role.length
      }
    };

    this.props.actions.publicDocumentsDispatcher();
    this.props.actions.privateDocumentsDispatcher();
    this.props.actions.roleDocumentsDispatcher();
  }

  /**
   * @desc Invoked immediately after a props is passed to document
   * @param {object} nextProps - the next props the component receives
   * @return {void} returns nothing
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.user.name !== nextProps.user.name) {
      this.setState({ username: nextProps.user.name });
    }
    if (this.props.documents !== nextProps.documents) {
      this.setState({
        documents: {
          private: nextProps.documents.private.length,
          public: nextProps.documents.public.length,
          role: nextProps.documents.role.length,
        }
      });
    }
  }

  /**
   * @desc Displays the Dashboard
   * @return {any} The Dashboard Content
   */
  render() {
    return (
      <div className="main-container">
        <div className="row">

          <Sidebar />
          {/* main content */}
          <div className="col l9 top__space">
            <div className="row">
              <div className="col s12">
                <h3 id="dashboard" className="document__number">
                  Welcome back {this.state.username}
                </h3>
              </div>
            </div>
            <div className="row">
              <ProgressBar />
              <div>
                <DashboardCard
                  title="Private"
                  details={`${this.state.documents.private} Document(s)`}
                  color="red"
                  icon="file"
                  link="document/private"
                />
                <DashboardCard
                  title="Public"
                  details={`${this.state.documents.public} Document(s)`}
                  color="blue"
                  icon="file"
                  link="document/public"
                />
                <DashboardCard
                  title="Role"
                  details={`${this.state.documents.role} Document(s)`}
                  color="green"
                  icon="file"
                  link="document/role"
                />
              </div>
            </div>
          </div>
        </div>
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
    documents: PropTypes.array,
    roleId: PropTypes.number
  }),
  documents: PropTypes.shape({
    private: PropTypes.array,
    public: PropTypes.array,
    role: PropTypes.array
  }),
  actions: PropTypes.shape({
    publicDocumentsDispatcher: PropTypes.func.isRequired,
    roleDocumentsDispatcher: PropTypes.func.isRequired,
    privateDocumentsDispatcher: PropTypes.func.isRequired,
  }),
};

/**
 * Sets default values for Dashboard Prototype
 */
Dashboard.defaultProps = {
  user: {},
  actions: {},
  documents: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    user: state.user,
    documents: state.documents
  };
}

/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      privateDocumentsDispatcher,
      publicDocumentsDispatcher,
      roleDocumentsDispatcher,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
