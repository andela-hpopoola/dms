import { Documents, Users, Roles } from '../models';
import model from './../utils/model';
import { DOCUMENTS, DEFAULT } from './../../constants';

module.exports = {

  /**
   * @desc Create a new document
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  create(req, res) {
    const access = parseInt(req.body.access, 10) || DOCUMENTS.PRIVATE;
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
    const limit = parseInt(req.query.limit, 10) || DEFAULT.LIMIT;
    const offset = parseInt(req.query.offset, 10) || DEFAULT.OFFSET;
    let whereQuery = {};

    // if a search term is given
    if (req.query.q) {
      const query = req.query.q;
      const userId = res.locals.user.id;
      const roleId = res.locals.user.roleId;
      if (query.length <= 2) {
        return res.status(412).send(
          { msg: 'Your search term must exceed 2 characters' }
        );
      }
      whereQuery = {
        title: { $iLike: `%${query}%` },
        $or: [
          { userId: { $eq: userId } },
          { access: { $eq: roleId } },
          { access: { $eq: DOCUMENTS.PUBLIC } },
        ]
      };
    } else {
      // Ignore Private Documents
      whereQuery.access = {
        $ne: DOCUMENTS.PRIVATE
      };
    }

    Documents
      .findAndCountAll({
        where: whereQuery,
        limit: Math.abs(limit),
        offset: Math.abs(offset),
        order: [['updatedAt', 'DESC']],
        include: [{ model: Users }]
      })
      .then((result) => {
        if (!result) {
          res.status(401).json({ msg: 'No document found' });
        }
        const data = result.rows.map((document) => {
          let username;
          if (!document.User || typeof document.User.name === 'undefined') {
            username = 'Unknown';
          } else {
            username = document.User.name;
          }

          return Object.assign(
            {},
            {
              id: document.id,
              title: document.title,
              content: document.content,
              owner: username,
              userId: document.userId,
              access: document.access,
              createdAt: document.createdAt,
              updatedAt: document.updatedAt,
            }
          );
        });
        const total = result.count;
        const pagination = model.paginate(total, limit, offset);
        return res.json({ data, pagination });
      })
      .catch((error) => {
        res.status(412).json({ msg: error.message });
      });
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
};
