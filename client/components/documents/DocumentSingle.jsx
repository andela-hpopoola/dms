import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/**
 * Document Single
 * @desc Formats a Single Document
 * @param {object} document an object of document details
 * @returns {jsx} the formatted document
 */
const DocumentSingle = ({ document }) => {
  const viewDocumentLink = `/view-document/${document.id}`;
  const editDocumentLink = `/edit-document/${document.id}`;
  const content = document.content.slice(0, 200);
  return (
    <div className="col l6">
      <div className="card white darken-1 document__card">
        <div className="card-content">
          <span className="card-title">{document.title}</span>
          <div
            className="document__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="document__date">Published: {document.createdAt.slice(0,10)}</div>
        </div>
        <div className="card-action">
          <Link to={viewDocumentLink} className="document__read">Read</Link>
          <div className="right">
            <Link to={editDocumentLink} className="document__edit">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Set the PropTypes for DocumentSingle
 */
DocumentSingle.propTypes = {
  document: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  })
};

/**
 * Set default values for DocumentSingle
 */
DocumentSingle.defaultProps = {
  document: {}
};


export default DocumentSingle;
