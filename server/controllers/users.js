import jwt from 'jsonwebtoken';
import { Users, Documents, Roles } from '../models';
import model from './../utils/model';
import { ROLES, DEFAULT } from './../../constants';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  /**
   * @desc Create a new user
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    return model.create(req, res, 'User', Users);
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
    /**
     * Calculate the pagination
     * if the limits or offset is given in the request
     * calculate the pagination
     */
    Users
      .findAndCountAll({
        limit: Math.abs(limit),
        offset: Math.abs(offset),
        order: [['name', 'ASC']],
        include: [{ model: Roles }]
      })
      .then((result) => {
        const data = result.rows.map(user =>
          // tidy up user
          Object.assign(
            {},
            {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.Role.title,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            }
          )
        );
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
   * @desc Search for User
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  search(req, res) {
    const query = req.query.q;
    return Users
      .findAll({
        where: {
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
        },
      })
      .then((users) => {
        if (users) {
          return res.json(users);
        }
        return res.status(404).json({ msg: 'No user found' });
      })
      .catch(error =>
        res.status(412).json({ msg: error.message })
      );
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
        include: [{ model: Documents, as: 'Documents' }]
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
            documents: user.Documents
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
   * @desc Login User by JWT TOKEN
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  loginByToken(req, res) {
    const token = req.header('x-auth');
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const email = decoded.email;
    Users.findOne({
      where: { email },
      include: [{ model: Documents, as: 'Documents' }]
    })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ msg: 'Invalid email' });
        }
        return res.header('x-auth', token).json({
          id: user.id,
          name: user.name,
          email: user.email,
          token,
          roleId: user.roleId,
          documents: user.Documents
        });
      })
      .catch(error => res.status(404).json({ msg: error.message }));
  },

  /**
   * @desc Authenticates User by JWT Token
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  authenticate(req, res, next) {
    const token = req.header('x-auth');
    let decoded = { };
    let email = null;
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY);
      email = decoded.email;
    } catch (e) {
      return res.status(401).json({ msg: 'Invalid Token' });
    }

    if (email) {
      return Users
        .findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            res.status(404).json({ msg: 'Token cannot be verified' });
          }
          res.locals.user = user;
          next();
        }).catch(() => res.status(404).json('No Token was found'));
    }
    return res.status(401).json({ msg: 'Invalid Token' });
  },


  /**
   * @desc Checks if User is an Administrator
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  isAdmin(req, res, next) {
    const roleId = parseInt(res.locals.user.roleId, 10);
    if ((roleId === ROLES.SUPERADMIN) || (roleId === ROLES.ADMIN)) {
      next();
    } else {
      return res.status(403).json({ msg: 'Unauthorized Access' });
    }
  },


  /**
   * @desc Checks if User is a Super Administrator
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  isSuperAdmin(req, res, next) {
    const roleId = parseInt(res.locals.user.roleId, 10);
    if (roleId === ROLES.SUPERADMIN) {
      next();
    } else {
      return res.status(403).json({ msg: 'Unauthorized Access' });
    }
  },


  /**
   * @desc Check if User is the owner of accessed resources
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  isOwner(req, res, next) {
    const userId = parseInt(res.locals.user.id, 10);
    const requestId = parseInt(req.params.id, 10);
    if (userId === requestId) {
      next();
    } else {
      return res.status(403).json({ msg: 'Unauthorized Access' });
    }
    return res.status(403).json({ msg: 'Unauthorized Access ' });
  },


  /**
   * @desc Check if User is an Admin or Owner of resources
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  isAdminOrOwner(req, res, next) {
    const userId = parseInt(res.locals.user.id, 10);
    const requestId = parseInt(req.params.id, 10);
    const roleId = parseInt(res.locals.user.roleId, 10);
    if (userId === requestId) {
      next();
    } else if ((roleId === ROLES.SUPERADMIN) || (roleId === ROLES.ADMIN)) {
      next();
    } else {
      return res.status(403).json({ msg: 'Unauthorized Access' });
    }
  },


  /**
   * @desc Check if a User can manage a document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  canManageDocument(req, res, next) {
    const userId = parseInt(res.locals.user.id, 10);
    const roleId = parseInt(res.locals.user.roleId, 10);
    Documents
      .findById(req.params.id)
      .then((document) => {
        if (document) {
          if (userId === document.userId) {
            next();
          } else if (document.access === Documents.PUBLIC) {
            if ((roleId === ROLES.SUPERADMIN) || (roleId === ROLES.ADMIN)) {
              next();
            } else {
              return res.status(403).json({ msg: 'Unauthorized Access' });
            }
          }
        } else {
          return res.status(404).json({ msg: 'Document not Found' });
        }
      }).catch(error =>
        res.status(412).json({ msg: error.message })
      );
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
