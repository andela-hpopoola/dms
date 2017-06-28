import React from 'react';
import PropTypes from 'prop-types';
import strip from 'strip';
import { Link } from 'react-router';
import { Button, Modal } from 'react-materialize';
import { DOCUMENTS } from './../../../constants';

/**
 * Document Single
 * @desc Formats a Single Document
 * @param {object} props an object of document details
 * @returns {jsx} the formatted document
 */
const DocumentSingle = (props) => {
  const { document } = props;
  const documentExtract = strip(document.content.slice(0, 180));
  let access = 'Role';
  let color = 'blue role';
  let userDocument = false;
  if (document.userId === props.userId) {
    userDocument = true;
  }
  switch (document.access) {
    case DOCUMENTS.PRIVATE:
      access = 'Private';
      color = 'red private';
      break;

    case DOCUMENTS.PUBLIC:
      access = 'Public';
      color = 'green public darken-2';
      break;

    default:
      // no default
  }
  const accessClass = `card ${color} darken-2 card__top ${access}`;

  /**
   * @desc Sends back the delete document id
   * @param {event} event - event handler
   * @return {event} - event
   */
  const handleDelete = (event) => {
    props.onDelete(event.target.id);
  };
  return (
    <div className="col m6 l4 s12">
      <div className={accessClass}>
        <div className="card-content">
          <div className="document__access white-text">
            {access}
            <div className="right">
              {userDocument &&
                <Link
                  onClick={handleDelete}
                  className="white-text"
                >
                  <i
                    id={document.id}
                    className="fa fa-trash document__delete"
                  />
                </Link>
              }
            </div>
          </div>
          <span className="card-title white-text document__title">{document.title}</span>
        </div>
      </div>
      <div className="card white darken-1 card__bottom">
        <div className="card-content">
          <div className="document__content">
            {documentExtract}
          </div>
          <div className="document__dated">
            Published: {document.createdAt.slice(0, 10)}
          </div>
        </div>
        <div className="card-action">
          <div className="left">
            &nbsp;
            {userDocument &&
              <Link
                id={document.id}
                to={`/document/edit/${document.id}`}
                className="document__edit"
              >
                Edit
              </Link>
            }
          </div>
          <div className="right-align">
            <Modal
              header={document.title}
              trigger={<Button waves="light">Read</Button>}
            >
              <div
                className="document__content"
                dangerouslySetInnerHTML={{ __html: document.content }}
              />
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
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  onDelete: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
};

/**
 * Set default values for DocumentSingle
 */
DocumentSingle.defaultProps = {
  document: {}
};


export default DocumentSingle;
