import { DEFAULT } from './../../constants';

module.exports = {
   /**
   * @desc Gets all items from model
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {string} name - The name to use for messages
   * @param {object} Model - The model to perform action on
   * @param {object} where - Sequelize WHERE value to filter items
   * @return {object} json response
   */
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
      const limit = parseInt(req.query.limit, 10) || DEFAULT.LIMIT;
      const offset = parseInt(req.query.offset, 10) || DEFAULT.OFFSET;
      Model
        .findAndCountAll({ where, limit, offset, order: [['updatedAt', 'DESC']] })
        .then((result) => {
          const total = result.count;
          const data = result.rows;
          const totalPage = Math.ceil(total / limit);
          let currentPage = Math.floor((offset / limit) + 1);
          if (currentPage > totalPage) {
            currentPage = totalPage;
          }
          const pagination = { total, currentPage, totalPage, limit, offset };
          res.json({ data, pagination });
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

  /**
   * @desc Gets one item from model
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {string} name - The name to use for messages
   * @param {object} Model - The model to perform action on
   * @param {object} where - Sequelize WHERE value to filter items
   * @return {object} json response
   */
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

  /**
   * @desc Create item from model
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {string} name - The name to use for messages
   * @param {object} Model - The model to perform action on
   * @return {object} json response
   */
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

  /**
   * @desc Update item from model
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {string} name - The name to use for messages
   * @param {object} Model - The model to perform action on
   * @param {object} where - Sequelize WHERE value to filter items
   * @return {object} json response
   */
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

  /**
   * @desc Removes item from model
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {string} name - The name to use for messages
   * @param {object} Model - The model to perform action on
   * @param {object} where - Sequelize WHERE value to filter items
   * @return {object} json response
   */
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

  /**
   * @desc Gets one item from model
   * @param {object} Model - The model to perform action on
   * @param {object} where - Sequelize WHERE value to filter items
   * @return {boolean} Checks if data exists
   */
  exists(Model, where = {}) {
    return Model
      .count({ where })
      .then((count) => {
        if (count !== 0) {
          return true;
        }
        return false;
      }).catch(() => false);
  },

  paginate(total, limit, offset) {
    const totalPage = Math.ceil(total / limit);
    let currentPage = Math.floor((offset / limit) + 1);
    if (currentPage > totalPage) {
      currentPage = totalPage;
    }
    return { total, currentPage, totalPage, limit, offset };
  },
};
