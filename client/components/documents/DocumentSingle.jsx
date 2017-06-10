import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Modal } from 'react-materialize';
import { DOCUMENTS } from './../../../constants';

/**
 * Document Single
 * @desc Formats a Single Document
 * @param {object} document an object of document details
 * @returns {jsx} the formatted document
 */
const DocumentSingle = ({ document }) => {
  const editDocumentLink = `/edit-document/${document.id}`;
  const documentExtract = document.content.slice(0, 200);
  let access = 'Role';
  switch (document.access) {
    case DOCUMENTS.PRIVATE:
      access = 'Private';
      break;

    case DOCUMENTS.PUBLIC:
      access = 'Public';
      break;

    default:
      // no default
  }
  return (
    <div className="col m6 l4 s12">
      <div className="card red darken-1 card__top">
        <div className="card-content">
          <div className="document__access">{access}</div>
          <span className="card-title">{document.title}</span>
          <div className="document__date">
            Published: {document.createdAt.slice(0, 10)}
          </div>
        </div>
      </div>
      <div className="card white darken-1 card__bottom">
        <div className="card-content">
          <div
            className="document__content"
            dangerouslySetInnerHTML={{ __html: documentExtract }}
          />
        </div>
        <div className="card-action">
          <Link to={editDocumentLink} className="document__edit">Edit</Link>
          { /* <Link to={viewDocumentLink} className="document__read">Read</Link>*/ }
          <div className="right">
            <Modal
              header={document.title}
              trigger={<Button waves="light">Read</Button>}
            >
              <div>{document.content}</div>
            </Modal>
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
