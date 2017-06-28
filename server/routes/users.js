import { users } from '../controllers';
import authenticate from './../utils/authenticate';

module.exports = (app) => {
  // Users Schema definition
  /**
   * @swagger
   * definitions:
   *   Users:
   *     properties:
   *       name:
   *         type: string
   *       password:
   *         type: string
   *       roleId:
   *         type: integer
   *       email:
   *         type: string
   *
   *   UserLogin:
   *     properties:
   *       email:
   *         type: string
   *       password:
   *         type: string
   *       token:
   *         type: string
   *       roleId:
   *         type: integer
   *       documents:
   *         type: array
   *
   *   Documents:
   *     properties:
   *       userId:
   *         type: integer
   *       title:
   *         type: string
   *       content:
   *         type: string
   *       access:
   *         type: integer
   *
   *   Pagination:
   *     properties:
   *       data:
   *         type: array
   *       pagination:
   *         $ref: '#/definitions/PaginationList'
   *
   *   PaginationList:
   *     properties:
   *       total:
   *         type: integer
   *       currentPage:
   *         type: integer
   *       totalPage:
   *         type: integer
   *       limit:
   *         type: integer
   *       offset:
   *         type: integer
   */

  // Security Schema definition
  /**
   * @swagger
   * securityDefinitions:
   *  x-auth:
   *    type: apiKey
   *    in: header
   *    name: JWT-TOKEN
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - Users
   *     description: Create a New User
   *     summary: Create a New User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Successfully created
   *       412:
   *         description: User cannot be created
   */
  app.post('/users', users.create);

  /**
   * @swagger
   * /users/login:
   *   post:
   *     tags:
   *       - Users
   *     description: Logs in a user
   *     summary: Logs in a user
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/x-www-form-data-urlencoded
   *     parameters:
   *       - name: users
   *         description: contains email and password
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Login Successful
   *         schema:
   *           $ref: '#/definitions/UserLogin'
   *       401:
   *         description: Invalid Username or Password
   *       412:
   *         description: Exception Error
   */
  app.post('/users/login', users.login);

  /**
   * @swagger
   * /users/logout:
   *   get:
   *     tags:
   *       - Users
   *     description: Logs a user out
   *     summary: Logs a user out
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Logout Successful
   */
  app.get('/users/logout', users.logout);


  // Get all Users Routes
  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users
   *     summary: Get all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all users
   *         schema:
   *           $ref: '#/definitions/Users'
   *       404:
   *         description: Users not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth: []
   */
  app.get('/users', authenticate.verify, authenticate.isAdmin, users.getAll);

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns a single user
   *     summary: Get One User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single user
   *         schema:
   *           $ref: '#/definitions/Users'
   *       404:
   *         description: User not found
   *     security:
   *     - x-auth: []
   */
  app.get('/users/:id', authenticate.verify, authenticate.isOwner, users.getOne);

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     description: Edit a single user
   *     summary: Edit User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully updated
   *       404:
   *         description: User cannot be found
   *     security:
   *     - x-auth: []
   */
  app.put('/users/:id', authenticate.verify, authenticate.isOwner, users.update);
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     description: Deletes a single user
   *     summary: Delete user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   *       404:
   *         description: User cannot be found
   *     security:
   *     - x-auth: []
   */
  app.delete('/users/:id', authenticate.verify, authenticate.isSuperAdmin, users.delete);

  /**
   * @swagger
   * /users/{id}/documents:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns an array of user documents
   *     summary: Get Users Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: An array of all users document
   *     security:
   *     - x-auth: []
   */
  app.get('/users/:id/documents', authenticate.verify, authenticate.isOwner, users.getDocuments);

  /**
   * @swagger
   * /users/search:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns an array of users
   *     summary: Search for Users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: q
   *         description: The search term to search for
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: An array of all users
   *       404:
   *         description: No user found
   *     security:
   *     - x-auth: []
   */
  app.get('/search/users/?q={q}', authenticate.verify, authenticate.isAdmin, users.getAll);
};
