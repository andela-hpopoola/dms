const jwt = require('jsonwebtoken');
const Users = require('../models').Users;
const Documents = require('../models').Documents;
const model = require('./../utils/model');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;


module.exports = {
  create(req, res) {
    return model.create(req, res, 'User', Users);
  },


  getAll(req, res) {
    const limit = req.query.limit || DEFAULT_LIMIT;
    const offset = req.query.offset || DEFAULT_OFFSET;
    return model.getAll(req, res, 'User', Users, { limit, offset });
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
          res.json(users);
        } else {
          res.status(404).json({ msg: 'No user found' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
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
          res.status(401).json({ msg: 'Invalid email or password' });
        }
        if (Users.isPassword(user.password, password)) {
          const payload = { email: user.email };
          user.token = jwt.sign(payload, JWT_SECRET_KEY);
          res.header('x-auth', user.token).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: user.token,
            roleId: user.roleId,
            documents: user.Documents
          });
        } else {
          res.status(401).json({ msg: 'Invalid email or password' });
        }
      })
      .catch(error => res.status(401).json({ msg: error.message }));
    } else {
      res.status(401).json({ msg: 'Enter your registered email and password' });
    }
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
          res.status(401).json({ msg: 'Invalid email' });
        }
        res.header('x-auth', token).json({
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
    try {
      decoded = jwt.verify(token, JWT_SECRET_KEY);
    } catch (e) {
      res.status(401).json({ msg: 'Invalid Token' });
    }
    return Users
      .findOne({ where: { email: decoded.email } })
      .then((user) => {
        if (!user) {
          res.status(404).json({ msg: 'User not found' });
        }
        next();
      }).catch(() => res.status(404).json('No Token was found'));
  },

  getDocuments(req, res) {
    return Users
      .find({
        where: { id: req.params.id },
        include: [{ model: Documents, as: 'Documents' }]
      })
      .then(result => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },
};
