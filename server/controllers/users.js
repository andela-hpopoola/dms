const jwt = require('jsonwebtoken');
const Users = require('../models').Users;
const Documents = require('../models').Documents;

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

module.exports = {
  create(req, res) {
    return Users
      .create(req.body)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(412).json({ msg: 'User cannot be created' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  getAll(req, res) {
    const limit = req.query.limit || DEFAULT_LIMIT;
    const offset = req.query.offset || DEFAULT_OFFSET;
    return Users
      .findAll({ offset, limit })
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

  getOne(req, res) {
    return Users
      .findById(req.params.id)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ msg: 'User not Found' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  update(req, res) {
    const id = req.params.id;
    return Users
      .findOne({ where: { id } }).then((user) => {
        if (user) {
          user
            .update(req.body)
            .then(() => res.json({ msg: 'User Updated' }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.status(404).json({ msg: 'User not found' });
        }
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  delete(req, res) {
    const id = req.params.id;
    return Users
      .findOne({ where: { id } }).then((user) => {
        if (user) {
          return user
            .destroy()
            .then(() => res.status(202).json({ msg: 'User Deleted' }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        }
        res.status(404).json({ msg: 'User not found' });
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
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
      Users.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            res.status(401).json({ msg: 'Invalid email or password' });
          }
          if (Users.isPassword(user.password, password)) {
            const payload = { email: user.email };
            user.token = jwt.sign(payload, 'secret');
            res.header('x-auth', user.token).json({
              name: user.name,
              email: user.email,
              token: user.token,
              role: user.roleId
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

  authenticate(req, res) {
    const token = req.header('x-auth');
    let decoded = { };
    try {
      decoded = jwt.verify(token, 'secret');
    } catch (e) {
      res.json({ msg: 'Invalid Token' });
    }
    return Users
      .findOne({ where: { email: decoded.email } })
      .then((user) => {
        if (!user) {
          res.json({ msg: 'User not found' });
        }
        res.json(user);
      }).catch(() => res.send('No Token was found'));
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
