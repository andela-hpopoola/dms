const Documents = require('../models').Documents;

module.exports = {
  createDocument(req, res) {
    return Documents
      .findOne({
        where: {
          title: req.body.title,
          userId: req.body.userId,
        }
      }).then((result) => {
        if (result) {
          return res.status(409)
            .json({ msg: 'Document exists' });
        }
        Documents.create(req.body)
          .then(output => res.json(output))
          .catch((error) => {
            res.status(412).json({ msg: error.message });
          });
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  getDocuments(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    return Documents
      .findAll({ offset, limit })
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  getDocument(req, res) {
    return Documents
      .findById(req.params.id)
      .then((document) => {
        if (document) res.json(document);
        else res.status(404).json({ msg: 'Document not found' });
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  updateDocument(req, res) {
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

  deleteDocument(req, res) {
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

  searchDocument(req, res) {
    const query = req.query.q;
    return Documents
      .findAll({
        where: {
          title: {
            $iLike: `%${query}%`
          }
        }
      })
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },
};
