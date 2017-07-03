import { roles } from '../controllers';
import authenticate from './../middleware/authenticate';

module.exports = (app) => {
  // Roles Schema definition
  /**
   * @swagger
   * definitions:
   *   Roles:
   *     properties:
   *       title:
   *         type: string
   */

  // Security Schema definition
  /**
   * @swagger
   * securityDefinitions:
   *  x-auth:
   *    type: apiKey
   *    description: JWT Authentication
   *    in: header
   *    name: x-auth
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
   *     parameters:
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: An array of all roles
   *         schema:
   *           $ref: '#/definitions/Roles'
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Roles not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth: []
   */
  app.get('/roles', roles.getAll);

  /**
   * @swagger
   * /roles:
   *   post:
   *     tags:
   *       - Roles
   *     description: Create a New Role
   *     summary: Create a New Role
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: title
   *         description: role title
   *         in: formData
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/Roles'
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully created
   *       403:
   *         description: Forbidden
   *       412:
   *         description: Role cannot be created
   *     security:
   *     - x-auth: []
   */
  app.post('/roles', authenticate.verify, authenticate.isSuperAdmin, roles.create);


  /**
   * @swagger
   * /roles/{id}:
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
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: A single document
   *         schema:
   *           $ref: '#/definitions/Roles'
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Role not found
   *     security:
   *     - x-auth: []
   */
  app.get('/roles/:id', roles.getOne);

  /**
   * @swagger
   * /roles/{id}:
   *   put:
   *     tags:
   *       - Roles
   *     description: Edit a single role
   *     summary: Edit Role
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Role's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: title
   *         description: updated role title
   *         in: formData
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/Roles'
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully updated
   *       404:
   *         description: Role cannot be found
   */
  app.put('/roles/:id', authenticate.verify, authenticate.isSuperAdmin, roles.update);

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
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully deleted
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Role cannot be found
   */
  app.delete('/roles/:id', authenticate.verify, authenticate.isSuperAdmin, roles.delete);
};
