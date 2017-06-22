import jwt from 'jsonwebtoken';
import { Users, Documents } from '../models';
import { ROLES } from './../../constants';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticate = {
  /**
   * @desc Authenticates User by JWT Token
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  verify(req, res, next) {
    const token = req.header('x-auth');
    let decoded = { };
    let email = null;
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY);
      email = decoded.email;
    } catch (error) {
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
    res.status(401).json({ msg: 'Invalid Token' });
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
  },

  /**
   * @desc Check if User is the owner of accessed resources
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @param {object} next - Move to the next action
   * @return {object} json response
   */
  ownsDocument(req, res, next) {
    const userId = parseInt(res.locals.user.id, 10);
    Documents
      .findById(req.params.id)
      .then((document) => {
        if (document) {
          if (userId === document.userId) {
            next();
          } else {
            return res.status(403).json({ msg: 'Unauthorized Access' });
          }
        } else {
          return res.status(404).json({ msg: 'Document not Found' });
        }
      }).catch(error =>
        res.status(412).json({ msg: error.message })
      );
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
  }
};

export default authenticate;
