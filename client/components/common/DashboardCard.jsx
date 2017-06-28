import React from 'react';
import { Link } from 'react-router';
import { Col } from 'react-materialize';

/**
 * DashboardCard
 * @desc Page DashboardCard
 * @param {object} props default properties
 * @returns {jsx} the page DashboardCard
 */
const DashboardCard = (props) => {
/**
 * @desc Displays the SearchForm Page
 * @return {any} The SearchForm form
 */
  const card = props;
  const cardTitle = card.title;
  const cardLink = card.link;
  const cardDetails = card.details;
  const cardClass = `card-content ${card.color}-text`;
  const cardIcon = `fa fa-${card.icon} fa-3x dashboard__icon`;
  return (
    <Col l={4} m={6} s={12} key="1">
      <Link
        name="card"
        className="card white"
        to={cardLink}
      >
        <div className={cardClass}>
          <span className="card-title dashboard__title">{cardTitle}</span>
          <strong className="dashboard__detail">
            {cardDetails}
            <div className="right">
              <i className={cardIcon} />
            </div>
          </strong>
        </div>
      </Link>
    </Col>
  );
};

export default DashboardCard;

