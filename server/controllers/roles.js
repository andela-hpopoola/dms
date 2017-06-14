import { Roles } from '../models';
import model from './../utils/model';

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
        return model.create(req, res, 'Role', Roles);
      }).catch(error =>
        res.status(412).json({ msg: error.message })
      );
  },

  getAll(req, res) {
    return model.getAll(req, res, 'Role', Roles);
  },

  getOne(req, res) {
    const id = req.params.id;
    return model.getOne(req, res, 'Role', Roles, { id });
  },

  update(req, res) {
    const id = req.params.id;
    return model.update(req, res, 'Role', Roles, { id });
  },

  delete(req, res) {
    const id = req.params.id;
    return model.remove(req, res, 'Role', Roles, { id });
  },
};
