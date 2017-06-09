module.exports = {
  getAll(req, res, name, Model, where = {}, limits = {}) {
    Model
      .findAll({ where, limits })
      .then((model) => {
        if (model) {
          res.json(model);
        } else {
          res.status(404).json({ msg: `No ${name.toLowerCase()} found` });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  findOne(req, res, name, Model, where = {}) {
    Model
      .findOne({ where })
      .then((model) => {
        if (model) {
          res.json(model);
        } else {
          res.status(404).json({ msg: `${name} not found` });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  get(req, res, name, Model, where = {}) {
    Model
      .find({ where })
      .then((model) => {
        if (model) {
          res.json(model);
        } else {
          res.status(404).json({ msg: `${name} not found` });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  create(req, res, name, Model) {
    Model
      .create(req.body)
      .then((model) => {
        if (model) {
          res.json(model);
        } else {
          res.status(412).json({ msg: `${name} cannot be created` });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  update(req, res, name, Model, where = {}) {
    Model
      .findOne({ where }).then((model) => {
        if (model) {
          model
            .update(req.body)
            .then(() => res.json({ msg: `${name} Updated` }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.status(404).json({ msg: `${name} not found` });
        }
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  remove(req, res, name, Model, where = {}) {
    Model
      .findOne({ where }).then((model) => {
        if (model) {
          model
            .destroy({ where })
            .then(() => res.status(202).json({ msg: `${name} Deleted` }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.status(404).json({ msg: `${name} not found` });
        }
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },
};
