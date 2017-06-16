import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-materialize';

/**
 * DashboardCard
 * @desc Page DashboardCard
 * @param {object} props default properties
 * @returns {jsx} the page DashboardCard
 */
class DashboardCard extends Component {
  /**
   * @desc Set the Initial conditions for showing the SearchForm Page
   * @param {object} props - The property of the SearchForm Page
   * @constructor
   */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @desc Returns the clicked card
   * @param {function} event - event of the field
   * @return {event} event
   */
  handleClick(event) {
    event.preventDefault();
    this.props.onClick();
  }

  /**
   * @desc Displays the SearchForm Page
   * @return {any} The SearchForm form
   */
  render() {
    const card = this.props;
    const cardTitle = card.title;
    const cardCount = card.count;
    const cardClass = `card-content ${card.color}-text`;
    const cardIcon = `fa fa-${card.icon} fa-3x dashboard__icon`;
    return (
      <Col l={4} m={6} s={12} key="1">
        <a
          name="card"
          onClick={this.handleClick}
          className="card white"
          href="/#!"
        >
          <div className={cardClass}>
            <span className="card-title dashboard__title">{cardTitle}</span>
            <strong className="dashboard__count">
              {cardCount}
              <div className="right">
                <i className={cardIcon} />
              </div>
            </strong>
          </div>
        </a>
      </Col>
    );
  }
}

/**
 * Set the PropTypes for DashboardCard
 */
DashboardCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DashboardCard;

