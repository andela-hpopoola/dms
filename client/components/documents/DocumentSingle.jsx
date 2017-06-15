import React from 'react';
import PropTypes from 'prop-types';
import strip from 'strip';
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
  const documentExtract = strip(document.content.slice(0, 200));
  let access = 'Role';
  let color = 'blue';
  let userDocument = false;

  if (document.userId === props.userId) {
    userDocument = true;
  }
  switch (document.access) {
    case DOCUMENTS.PRIVATE:
      access = 'Private';
      color = 'red';
      break;

    case DOCUMENTS.PUBLIC:
      access = 'Public';
      color = 'green darken-2';
      break;

    default:
      // no default
  }
  const accessClass = `card ${color} darken-2 card__top ${access}`;
  const handleClick = (event) => {
    event.preventDefault();
    props.onEdit(event.target.id);
  };
  const handleDelete = (event) => {
    event.preventDefault();
    props.onDelete(event.target.id, 'Document');
  };
  return (
    <div className="col m6 l4 s12">
      <div className={accessClass}>
        <div className="card-content">
          <div className="document__access white-text">
            {access}
            <div className="right">
              {userDocument &&
                <a
                  onClick={handleDelete}
                  id={document.id}
                  href="/#!"
                  className="document__delete white-text"
                >
                  <i className="fa fa-trash" />
                </a>
              }
            </div>
          </div>
          <span className="card-title white-text document__title  truncate">{document.title}</span>
          <div className="document__dated white-text">
            Published: {document.createdAt.slice(0, 10)}
          </div>
        </div>
      </div>
      <div className="card white darken-1 card__bottom">
        <div className="card-content">
          <div className="document__content truncate">
            {documentExtract}
          </div>
        </div>
        <div className="card-action">
          <div className="left">
            &nbsp;
            {userDocument &&
              <a
                onClick={handleClick}
                id={document.id}
                href="/#!"
                className="document__edit waves-effect waves-teal btn-flat"
              >
                Edit
              </a>
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
