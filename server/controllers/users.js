const Users = require('../models').Users;
const Documents = require('../models').Documents;
const jwt = require("jsonwebtoken");

module.exports = {
  createUser(req, res) {
    return Users
      .create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  getUsers(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    return Users
      .findAll({ offset, limit })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  getUser(req, res) {
    return Users
      .findById(req.params.id, {
        attributes: ["id", "name", "email"]
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  updateUser(req, res) {
    return Users
      .update(req.body, { where : { id: req.params.id }})
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  deleteUser(req, res) {
    return Users
      .destroy({where: {id: req.params.id} })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  searchUser(req, res) {
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
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },

  login(req, res) {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;
      Users.findOne({where: {email: email}})
        .then(user => {
          if (Users.isPassword(user.password, password)) {
            res.header('x-auth',user.token).json({
              email: user.email,
              token: user.token
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch(error => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  },

  authenticate(req,res) {
    const token = req.header('x-auth');
    try {
      decoded = jwt.verify(token, 'secret');
    } catch (e) {
      res.json({ msg: "Invalid Token"});
    }
    return Users
      .findOne({ where: { token }})
      .then((user) => {
        if (!user) {
          res.json({ msg: "User not found in db"});
        }
        res.json(user);
      }).catch(e => res.send("No Token was found"));
  },

  getDocuments(req, res) {
    return Users
      .find({
        where: { id: 1 }, 
        include: [{ model: Documents, as: 'Documents'}]
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  },
};
