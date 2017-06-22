import React, { PropTypes } from 'react';
import DocumentSingle from './DocumentSingle';

/**
 * Document List
 * @desc List of Documents
 * @param {array} props current user documents
 * @returns {jsx} the listed document
 */
const DocumentList = (props) => {
  let allDocuments = [];
  const { documents } = props;
  if (documents.length > 0) {
    allDocuments = documents.map(
      document => (<DocumentSingle
        onDelete={props.onDelete}
        userId={props.userId}
        document={document}
        key={document.id}
      />)
    );
  } else {
    allDocuments = <h3 className="not-found"> No Document found </h3>;
  }

  return (
    <div className="row document__list">
      { allDocuments }
    </div>
  );
};

/**
 * Set the PropTypes for DocumentList
 */
DocumentList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.number.isRequired
};

/**
 * Set default values for DocumentList
 */
DocumentList.defaultProps = {
  documents: []
};

export default DocumentList;
