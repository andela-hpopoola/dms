import jwt from 'jsonwebtoken';
import { Users, Documents, Roles } from '../models';
import model from './../utils/model';
import { DEFAULT } from './../../constants';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  /**
   * @desc Create a new user
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    Users
      .create(req.body)
      .then((user) => {
        if (user) {
          res.json({
            id: user.id,
            name: user.name,
            email: user.email
          });
        } else {
          res.status(412).json({ msg: 'User cannot be created' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  /**
   * @desc Get all Users
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAll(req, res) {
    const limit = parseInt(req.query.limit, 10) || DEFAULT.LIMIT;
    const offset = parseInt(req.query.offset, 10) || DEFAULT.OFFSET;
    let whereQuery = {};

    // if a search term is given
    if (req.query.q) {
      const query = req.query.q;
      if (query.length <= 2) {
        return res.status(412).send(
          { msg: 'Your search term must exceed 2 characters' }
        );
      }
      whereQuery = {
        $or: [
          {
            email: {
              $iLike: `%${query}%`
            }
          },
          {
            name: {
              $iLike: `%${query}%`,
            }
          }
        ]
      };
    }
    Users
      .findAndCountAll({
        where: whereQuery,
        limit: Math.abs(limit),
        offset: Math.abs(offset),
        order: [['name', 'ASC']],
        include: [{ model: Roles }]
      })
      .then((result) => {
        const data = result.rows.map((user) => {
          let roleName;
          if (!user.Role || typeof user.Role.title === 'undefined') {
            roleName = 'Unknown';
          } else {
            roleName = user.Role.title;
          }

          return Object.assign(
            {},
            {
              id: user.id,
              name: user.name,
              email: user.email,
              role: roleName,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            }
          );
        });
        const total = result.count;
        const pagination = model.paginate(total, limit, offset);
        res.json({ data, pagination });
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  /**
   * @desc Get one user
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getOne(req, res) {
    const id = req.params.id;
    return model.getOne(req, res, 'User', Users, { id });
  },

  /**
   * @desc Updates User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  update(req, res) {
    const id = req.params.id;
    return model.update(req, res, 'User', Users, { id });
  },

  /**
   * @desc Deletes User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  delete(req, res) {
    const id = req.params.id;
    return model.remove(req, res, 'User', Users, { id });
  },

  /**
   * @desc Login User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  login(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({
        where: { email },
      }).then((user) => {
        if (!user) {
          return res.status(401).json({ msg: 'Invalid email or password' });
        }
        if (Users.isPassword(user.password, password)) {
          const payload = { email: user.email };
          user.token = jwt.sign(payload, JWT_SECRET_KEY);
          return res.header('x-auth', user.token).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: user.token,
            roleId: user.roleId,
          });
        }
        return res.status(401).json({ msg: 'Invalid email or password' });
      })
      .catch(error => res.status(401).json({ msg: error.message }));
    } else {
      return res.status(401).json({ msg: 'Enter your registered email and password' });
    }
  },

  /**
   * @desc Logout User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  logout(req, res) {
    return res.header('x-auth', '').json({ msg: 'You have successfully logged out' });
  },

  /**
   * @desc Gets all User Documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getDocuments(req, res) {
    return Users
      .find({
        where: { id: req.params.id },
        include: [{ model: Documents, as: 'Documents' }]
      })
      .then(result => res.json(result))
      .catch(error =>
        res.status(412).json({ msg: error.message })
      );
  },
};
