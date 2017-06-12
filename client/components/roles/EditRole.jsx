import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getRole } from './../../actions/roleActions';
import ProgressBar from './../../components/common/ProgressBar';

/**
 * @class EditRole
 * @desc Class to display the EditRole Page
 * @extends React.Component
 */
class EditRole extends Component {

  /**
   * @desc Set the Initial conditions for showing the EditRole Page
   * @param {object} props - The property of the EditRole Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      form: {},
    };
    this.updateExistingRole = this.updateExistingRole.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  /**
   * @desc Invoked after a component is mounted
   * @return {void} returns nothing
   */
  componentDidMount() {
    this.props.actions.getRole(this.state.id);
  }

  /**
   * @desc Get the values of form fields
   * @param {object} event - the event of the form
   * @return {void} returns state
   */
  handleFormChange(event) {
    const field = event.target.name;
    const form = this.state.form;
    form[field] = event.target.value;
    return this.setState({ form });
  }

  /**
   * @desc maps state to properties
   * @param {object} event - form event
   * @return {any} redirects role to dashboard or show error
   */
  updateExistingRole(event) {
    event.preventDefault();
    const form = this.state.form;
    this.props.onUpdate(form, this.props.currentRole);
  }

  /**
   * @desc Displays the EditRole Page
   * @return {any} The EditRole form
   */
  render() {
    const { currentRole } = this.props;
    return (
      <div className="row">
        <div className="card col s12">
          <div className="card-content">
            <span className="card-title">EditRole</span><br />
            <div className="row">
              <form className="col s12" onSubmit={this.updateExistingRole}>

                <h4>{currentRole.title}</h4>

                {/* Title */}
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="validate"
                      value={this.state.form.title || currentRole.title}
                      required="required"
                      onChange={this.handleFormChange}
                    />
                    <label htmlFor="title" className="active">Title</label>
                  </div>
                </div>

                <ProgressBar />

                {/* Submit Button */}
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="submit"
                >
                  Update Role
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Set the PropTypes for EditRole
 */
EditRole.propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    getRole: PropTypes.func,
  }),
  onUpdate: PropTypes.func.isRequired,
  currentRole: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
};

/**
 * Sets default values for EditRole Prototype
 */
EditRole.defaultProps = {
  actions: {},
  currentRole: {}
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    currentRole: state.roles.current,
    roleId: state.user.roleId
  };
}


/**
 * @desc maps dispatch to actions
 * @param {object} dispatch - the action to dispatch
 * @return {object} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getRole }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRole);

