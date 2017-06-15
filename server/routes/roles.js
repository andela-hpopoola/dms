import { users, roles } from '../controllers';

module.exports = (app) => {
  // Roles Schema definition
  /**
   * @swagger
   * definitions:
   *   Roles:
   *     properties:
   *       id:
   *         type: integer
   *       title:
   *         type: string
   */

  // Get all Roles
  /**
   * @swagger
   * /roles:
   *   get:
   *     tags:
   *       - Roles
   *     description: Returns all roles
   *     summary: Get all roles
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all roles
   *         schema:
   *           $ref: '#/definitions/Roles'
   *       404:
   *         description: Roles not found
   *       412:
   *         description: Exception Error
   */
  app.get('/roles', users.authenticate, roles.getAll);

  /**
   * @swagger
   * /roles:
   *   post:
   *     tags:
   *       - Roles
   *     description: Create a New Role
   *     summary: Create a New Role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: role
   *         description: Role object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Roles'
   *     responses:
   *       200:
   *         description: Successfully created
   *       412:
   *         description: Role cannot be created
   */
  app.post('/roles', users.authenticate, users.isSuperAdmin, roles.create);


  /**
   * @swagger
   * roles/{id}:
   *   get:
   *     tags:
   *       - Roles
   *     description: Returns a single role
   *     summary: Get One Role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Roles's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single document
   *         schema:
   *           $ref: '#/definitions/Roles'
   *       404:
   *         description: Role not found
   */
  app.get('/roles/:id', roles.getOne);

  /**
   * @swagger
   * roles/{id}:
   *   put:
   *     tags:
   *       - Roles
   *     description: Edit a single role
   *     summary: Edit Role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Role's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully updated
   *       404:
   *         description: Role cannot be found
   */
  app.put('/roles/:id', users.authenticate, users.isSuperAdmin, roles.update);

  /**
   * @swagger
   * /roles/{id}:
   *   delete:
   *     tags:
   *       - Roles
   *     description: Deletes a single role
   *     summary: Delete Role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Role's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   *       404:
   *         description: Role cannot be found
   */
  app.delete('/roles/:id', users.authenticate, users.isSuperAdmin, roles.delete);
};
