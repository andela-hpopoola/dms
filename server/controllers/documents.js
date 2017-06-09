import { Documents } from '../models';
import model from './../utils/model';
import { DEFAULT, DOCUMENTS } from './../../constants';

module.exports = {
  create(req, res) {
    return Documents
      .findOne({
        where: {
          title: req.body.title,
          userId: req.body.userId,
        }
      }).then((result) => {
        if (result) {
          return res.status(409)
            .json({ msg: 'Document name exists' });
        }
        return model.create(req, res, 'Document', Documents);
      }).catch(error =>
        res.status(412).json({ msg: error.message })
      );
  },

  getAll(req, res) {
    const limit = req.query.limit || DEFAULT.LIMIT;
    const offset = req.query.offset || DEFAULT.OFFSET;
    const whereQuery = {
      access: {
        // Not equal to private documents
        $ne: DOCUMENTS.PRIVATE
      }
    };
    return model.getAll(req, res, 'Document', Documents, whereQuery, { limit, offset });
  },

  getOne(req, res) {
    const id = req.params.id;
    return model.findOne(req, res, 'Document', Documents, { id });
  },

  update(req, res) {
    const id = req.params.id;
    return model.update(req, res, 'Document', Documents, { id });
  },

  delete(req, res) {
    const id = req.params.id;
    return model.remove(req, res, 'Document', Documents, { id });
  },

  search(req, res) {
    const query = req.query.q;
    const userId = res.locals.user.id;
    const roleId = res.locals.user.roleId;
    if (query.length <= 2) {
      return res.status(401).send(
        { msg: 'Your search term must exceed 2 characters' }
      );
    }
    return Documents
      .findAll({
        where: {
          title: { $iLike: `%${query}%` },
          $or: [
            { userId: { $eq: userId } },
            { access: { $eq: roleId } },
            { access: { $eq: DOCUMENTS.PUBLIC } },
          ]
        }
      })
      .then((documents) => {
        if (documents) {
          return res.json(documents);
        }
        return res.status(404).json({ msg: 'No document found' });
      })
      .catch(error =>
        res.status(412).json({ msg: error.message })
      );
  },
};
