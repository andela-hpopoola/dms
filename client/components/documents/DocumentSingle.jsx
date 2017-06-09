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
  return (
    <div className="col l6">
      <div className="card white darken-1 document__card">
        <div className="card-content">
          <span className="card-title">{document.title}</span>
          <div
            dangerouslySetInnerHTML={{ __html: document.content }}
          />
        </div>
        <div className="card-action">
          <Link to={viewDocumentLink}>Read</Link>
          <div className="right">
            <Link to={editDocumentLink}>Edit</Link>
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
