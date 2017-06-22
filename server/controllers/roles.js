import { Users, Roles } from '../models';
import model from './../utils/model';

const Sequelize = require('sequelize');

module.exports = {
  /**
   * @desc Create a new role
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    return Roles
      .findOne({
        where: {
          title: req.body.title
        }
      }).then((result) => {
        if (result) {
          return res.status(409)
            .json({ msg: 'Role exists' });
        }
        return model.create(req, res, 'Role', Roles);
      }).catch(error =>
        res.status(412).json({ msg: error.message })
      );
  },

  /**
   * @desc Gets all roles
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAll(req, res) {
    // return model.getAll(req, res, 'Role', Roles);
    Roles.findAll({
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('Users.id')), 'usersCount']]
      },
      include: [
        {
          model: Users,
          attributes: []
        }
      ],
      order: [['title', 'ASC']],
      group: ['Roles.id']
    }).then((roles) => {
      res.json(roles);
    }).catch((error) => {
      res.status(412).json({ msg: error.message });
    });
  },

  /**
   * @desc Get one role
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getOne(req, res) {
    const id = req.params.id;
    return model.getOne(req, res, 'Role', Roles, { id });
  },

  /**
   * @desc Updates role
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  update(req, res) {
    const id = req.params.id;
    return model.update(req, res, 'Role', Roles, { id });
  },

  /**
   * @desc Deletes role
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  delete(req, res) {
    const id = req.params.id;
    return model.remove(req, res, 'Role', Roles, { id });
  },
};
