
import { DEFAULT } from './../../constants';

module.exports = {
  getAll(req, res, name, Model, where = {}) {
    /**
     * Calculate the pagination
     * if the limits or offset is given in the request
     * calculate the pagination
     */
    if ((req.query.limit || req.query.offset) &&
      ((typeof parseInt(req.query.limit, 10) === 'number') ||
      typeof parseInt(req.query.limit, 10) === 'number')
    ) {
      const limit = req.query.limit || DEFAULT.LIMIT;
      const offset = req.query.offset || DEFAULT.OFFSET;
      Model
        .findAndCountAll({ where, limit, offset })
        .then((result) => {
          const total = result.count;
          const data = result.rows;
          const totalPage = Math.ceil(total / limit);
          let currentPage = Math.floor((offset / limit) + 1);
          if (currentPage > totalPage) {
            currentPage = totalPage;
          }
          res.json({ data, total, currentPage, totalPage, limit, offset });
        })
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    } else {
      Model
        .findAll({ where })
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          res.status(412).json({ msg: error.message });
        });
    }
  },

  getOne(req, res, name, Model, where = {}) {
    Model
      .findOne({ where })
      .then((result) => {
        if (result) {
          res.json(result);
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
      .then((result) => {
        if (result) {
          res.json(result);
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
      .then((result) => {
        if (result) {
          res.json(result);
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
      .findOne({ where }).then((result) => {
        if (result) {
          result
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
      .findOne({ where }).then((result) => {
        if (result) {
          result
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
