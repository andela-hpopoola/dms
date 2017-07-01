import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
   * @desc Displays the SearchForm Page
   * @return {any} The SearchForm form
   */
  render() {
    return (
      <form className="searchForm" onSubmit={this.handleSearch}>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="search"
              type="text"
              className="validate white input__search"
              required="required"
              pattern=".{3,}"
              title="3 characters minimum"
              defaultValue={this.props.searchTerm}
            />
            <div className="help-text">
              Search term must be more than 2 characters
            </div>
            <label htmlFor="search" className="active">Search for Documents</label>
          </div>
          <div className="col s12">
            <button
              className="btn btn-search white-text red darken-2 waves-effect waves-light btn-flat"
              type="submit"
            >
              Search
            </button>
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
  searchTerm: PropTypes.string
};

SearchForm.defaultProps = {
  searchTerm: '',
};

export default SearchForm;

