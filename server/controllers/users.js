import jwt from 'jsonwebtoken';
import { Users, Documents } from '../models';
import model from './../utils/model';
import { ROLES, DEFAULT } from './../../constants';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  create(req, res) {
    return model.create(req, res, 'User', Users);
  },

  getAll(req, res) {
    const limit = req.query.limit || DEFAULT.LIMIT;
    const offset = req.query.offset || DEFAULT.OFFSET;
    return model.getAll(req, res, 'User', Users, {}, { limit, offset });
  },

  getOne(req, res) {
    const id = req.params.id;
    return model.findOne(req, res, 'User', Users, { id });
  },

  update(req, res) {
    const id = req.params.id;
    return model.update(req, res, 'User', Users, { id });
  },

  delete(req, res) {
    const id = req.params.id;
    return model.remove(req, res, 'User', Users, { id });
  },

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
        }
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

  logout(req, res) {
    return res.json({ msg: 'You have successfully logged out' });
  },

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
            res.status(404).json({ msg: 'User not found' });
          }
          res.locals.user = user;
          next();
        }).catch(() => res.status(404).json('No Token was found'));
    }
    return res.status(401).json({ msg: 'Invalid Token' });
  },

  isAdmin(req, res, next) {
    const roleId = parseInt(res.locals.user.roleId, 10);
    if ((roleId === ROLES.SUPERADMIN) || (roleId === ROLES.ADMIN)) {
      next();
    } else {
      return res.status(403).json({ msg: 'Unauthorized Access' });
    }
  },

  isSuperAdmin(req, res, next) {
    const roleId = parseInt(res.locals.user.roleId, 10);
    if (roleId === ROLES.SUPERADMIN) {
      next();
    } else {
      return res.status(403).json({ msg: 'Unauthorized Access' });
    }
  },

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
