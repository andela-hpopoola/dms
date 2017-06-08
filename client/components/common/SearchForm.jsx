import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DOCUMENTS } from './../../../constants';

/**
 * @class SearchForm
 * @desc Class to display the SearchForm Page
 * @extends React.Component
 */
class SearchForm extends Component {

  /**
   * @desc Set the Initial conditions for showing the SearchForm Page
   * @param {object} props - The property of the SearchForm Page
   * @constructor
   */
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }


  /**
   * @desc Returns the value in the Search Field
   * @param {function} event - event of the field
   * @return {string} Value in String Field
   */
  handleSearch(event) {
    event.preventDefault();
    this.props.onChange(event.target.search.value);
  }

  /**
   * @desc Returns the value in the Search Field
   * @param {function} event - event of the field
   * @return {string} Value in String Field
   */
  handleFilter(event) {
    event.preventDefault();
    this.props.onSelect(event.target.value);
  }

  /**
   * @desc Displays the SearchForm Page
   * @return {any} The SearchForm form
   */
  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <div className="row">
          <div className="input-field col m6 s5">
            <input name="search" type="text" className="validate white" />
            <label htmlFor="search">Search for Documents</label>
          </div>
          <div className="input-field col m4 s4">
            <select
              name="documentType"
              onChange={this.handleFilter}
              className="browser-default"
            >
              <option value={DOCUMENTS.ALL}>
                All Documents
              </option>
              <option value={DOCUMENTS.PRIVATE}>
                My Personal Documents
              </option>
              <option value={this.props.roleId}>
                Roles Documents
              </option>
              <option value={DOCUMENTS.PUBLIC}>
                Public Documents
              </option>
            </select>
          </div>
          <div className="input-field col m2 s3">
            <div className="col s12">
              <button
                className="btn cyan waves-effect waves-light"
                type="submit"
              >
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

/**
 * Set the PropTypes for SearchForm
 */
SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  roleId: PropTypes.number.isRequired,
};

/**
 * @desc maps state to properties
 * @param {object} state - the current state of application
 * @return {object} mapped properties
 */
function mapStateToProps(state) {
  return {
    roleId: state.user.roleId,
  };
}

export default connect(mapStateToProps)(SearchForm);

