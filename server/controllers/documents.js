import { Documents, Roles } from '../models';
import model from './../utils/model';
import { DOCUMENTS } from './../../constants';

module.exports = {

  /**
   * @desc Create a new document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    const access = parseInt(req.body.access, 10);
    req.body.userId = res.locals.user.id;
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
        if ((access !== DOCUMENTS.PRIVATE) &&
          (access !== DOCUMENTS.PUBLIC)) {
          model.exists(Roles, { id: req.body.access }).then((roleExists) => {
            if (!roleExists) {
              return res.status(409)
                .json({ msg: 'Invalid Document Access' });
            }
            return model.create(req, res, 'Document', Documents);
          });
        } else {
          return model.create(req, res, 'Document', Documents);
        }
      }).catch(error =>
        res.status(412).json({ msg: error.message })
      );
  },

  /**
   * @desc Get all documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getAll(req, res) {
    const whereQuery = {
      access: {
        // Not equal to private documents
        $ne: DOCUMENTS.PRIVATE
      }
    };
    return model.getAll(req, res, 'Document', Documents, whereQuery);
  },

  /**
   * @desc Get one document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getOne(req, res) {
    const id = req.params.id;
    return model.getOne(req, res, 'Document', Documents, { id });
  },

  /**
   * @desc Gets all private documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  private(req, res) {
    const userId = res.locals.user.id;
    const whereQuery = {
      userId: {
        $eq: userId
      }
    };
    return model.getAll(req, res, 'Document', Documents, whereQuery);
  },

  /**
   * @desc Gets all public documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  public(req, res) {
    const whereQuery = {
      access: {
        $eq: DOCUMENTS.PUBLIC
      }
    };
    return model.getAll(req, res, 'Document', Documents, whereQuery);
  },

  /**
   * @desc Gets all role documents
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  role(req, res) {
    const roleId = parseInt(res.locals.user.roleId, 10);
    const whereQuery = {
      access: {
        $eq: roleId
      },
    };
    return model.getAll(req, res, 'Document', Documents, whereQuery);
  },

  /**
   * @desc Updates document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  update(req, res) {
    const id = req.params.id;
    const access = parseInt(req.body.access, 10);
    req.body.userId = res.locals.user.id;
    return Documents
      .findOne({
        where: {
          title: req.body.title,
          userId: req.body.userId,
          $and: [
            { id: { $ne: id } },
          ]
        }
      }).then((result) => {
        if (result) {
          return res.status(409)
            .json({ msg: 'Document name exists' });
        }
        if ((access !== DOCUMENTS.PRIVATE) &&
          (access !== DOCUMENTS.PUBLIC)) {
          model.exists(Roles, { id: req.body.access }).then((roleExists) => {
            if (!roleExists) {
              return res.status(409)
                .json({ msg: 'Invalid Document Access' });
            }
            return model.update(req, res, 'Document', Documents, { id });
          });
        } else {
          return model.update(req, res, 'Document', Documents, { id });
        }
      }).catch(error =>
        res.status(412).json({ msg: error.message })
      );
  },


  /**
   * @desc Deletes document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  delete(req, res) {
    const id = req.params.id;
    return model.remove(req, res, 'Document', Documents, { id });
  },

  /**
   * @desc Search for document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  search(req, res) {
    const query = req.query.q;
    const userId = res.locals.user.id;
    const roleId = res.locals.user.roleId;
    if (query.length <= 2) {
      return res.status(401).send(
        { msg: 'Your search term must exceed 2 characters' }
      );
    }
    const whereQuery = {
      title: { $iLike: `%${query}%` },
      $or: [
        { userId: { $eq: userId } },
        { access: { $eq: roleId } },
        { access: { $eq: DOCUMENTS.PUBLIC } },
      ]
    };
    return model.getAll(req, res, 'Search Result(s)', Documents, whereQuery);
  },
};
