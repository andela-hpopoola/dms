const Documents = require('../models').Documents;

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

module.exports = {
  create(req, res) {
    return Documents
      .findOne({
        where: {
          title: req.body.title,
          userId: req.body.userId,
        }
      }).then((result) => {
        if (result) {
          return res.status(409)
            .json({ msg: 'Document name exists' });
        }
        Documents.create(req.body)
          .then((document) => {
            if (document) {
              res.json(document);
            } else {
              res.status(412).json({ msg: 'Document cannot be created' });
            }
          })
          .catch((error) => {
            res.status(412).json({ msg: error.message });
          });
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  getAll(req, res) {
    const limit = req.query.limit || DEFAULT_LIMIT;
    const offset = req.query.offset || DEFAULT_OFFSET;
    return Documents
      .findAll({ offset, limit })
      .then((documents) => {
        if (documents) {
          res.json(documents);
        } else {
          res.status(412).json({ msg: 'No document found' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  getOne(req, res) {
    return Documents
      .findById(req.params.id)
      .then((document) => {
        if (document) {
          res.json(document);
        } else {
          res.status(404).json({ msg: 'Document not Found' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  update(req, res) {
    const id = req.params.id;
    return Documents
      .findOne({ where: { id } }).then((document) => {
        if (document) {
          document
            .update(req.body)
            .then(() => res.json({ msg: 'Document Updated' }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.status(404).json({ msg: 'Document not found' });
        }
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  delete(req, res) {
    const id = req.params.id;
    return Documents
      .findOne({ where: { id } }).then((document) => {
        if (document) {
          return document
            .destroy()
            .then(output => res.status(204).json({ msg: 'Document Deleted', output }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        }
        res.status(404).json({ msg: 'Document not found' });
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  search(req, res) {
    const query = req.query.q;
    return Documents
      .findAll({
        where: {
          title: {
            $iLike: `%${query}%`
          }
        }
      })
      .then((documents) => {
        if (documents) {
          res.json(documents);
        } else {
          res.status(404).json({ msg: 'No document found' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },
};
