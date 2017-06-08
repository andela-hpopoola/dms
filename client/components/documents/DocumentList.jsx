import React, { PropTypes } from 'react';
import DocumentSingle from './DocumentSingle';

/**
 * Document List
 * @desc List of Documents
 * @param {array} documents current user documents
 * @returns {jsx} the listed document
 */
const DocumentList = ({ documents }) => {
  let allDocuments = [];
  allDocuments = documents.map(
    document => <DocumentSingle document={document} key={document.id} />
  );
  return (
    <div className="row">
      {
        documents ?
        allDocuments :
        <h3> You have no document </h3>
      }
    </div>
  );
};

/**
 * Set the PropTypes for DocumentList
 */
DocumentList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.object)
};

/**
 * Set default values for DocumentList
 */
DocumentList.defaultProps = {
  documents: []
};

export default DocumentList;
