const Roles = require('../models').Roles;

module.exports = {
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
        Roles.create(req.body)
          .then((role) => {
            if (role) {
              res.json(role);
            } else {
              res.status(412).json({ msg: 'Role cannot be created' });
            }
          })
          .catch((error) => {
            res.status(412).json({ msg: error.message });
          });
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  getAll(req, res) {
    return Roles
      .findAll()
      .then((roles) => {
        if (roles) {
          res.json(roles);
        } else {
          res.status(404).json({ msg: 'No role found' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  getOne(req, res) {
    return Roles
      .findById(req.params.id)
      .then((role) => {
        if (role) {
          res.json(role);
        } else {
          res.status(404).json({ msg: 'Role not Found' });
        }
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  update(req, res) {
    const id = req.params.id;
    return Roles
      .findOne({ where: { id } }).then((role) => {
        if (role) {
          role.update(req.body)
            .then(() => res.json({ msg: 'Role Updated' }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        } else {
          res.status(404).json({ msg: 'Role not found' });
        }
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },

  delete(req, res) {
    const id = req.params.id;
    return Roles
      .findOne({ where: { id } }).then((role) => {
        if (role) {
          return role
            .destroy()
            .then(() => res.status(204).json({ msg: 'Role Deleted' }))
            .catch((error) => {
              res.status(412).json({ msg: error.message });
            });
        }
        res.status(404).json({ msg: 'Role not found' });
      }).catch((error) => {
        res.status(412).json({ msg: error.message });
      });
  },
};
