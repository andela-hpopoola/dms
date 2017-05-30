const Documents = require('../models').Documents;

module.exports = {
  createDocument(req, res) {
    return Documents
      .findOne({
        where: {
          title: req.body.title,
          userId: req.body.userId,
        }
      }).then(result => {
          if (result){
            return res.status(409)
              .json({msg: 'Document exists'});
          }
          Documents.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
              res.status(412).json({msg: error.message});
            });
      }).catch(error => {
          res.status(412).json({msg: error.message});
      });
  },

  getDocuments(req, res) {
    console.log(req.query);
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    return Documents
      .findAll({ offset, limit })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  getDocument(req, res) {
    return Documents
      .findById(req.params.id)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  updateDocument(req, res) {
    return Documents
      .update(req.body, { where : { id: req.params.id }})
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  deleteDocument(req, res) {
    return Documents
      .destroy({where: {id: req.params.id} })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
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
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },
};
