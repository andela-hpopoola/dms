import { users } from '../controllers';

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
   *       id:
   *         type: integer
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
   *         type: object
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
   *       - name: email
   *         description: Registered Email Adderess
   *         in: body
   *         required: true
   *       - name: password
   *         description: Registered Password
   *         in: body
   *         required: true
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
   * /users/login/token:
   *   get:
   *     tags:
   *       - Users
   *     description: Logs in a user with the x-auth token
   *     summary: Logs in a user by using the header token
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: Users authorization token
   *         in: token
   *         required: true
   *     responses:
   *       200:
   *         description: Login Successful
   *         schema:
   *           $ref: '#/definitions/UserLogin'
   *       401:
   *         description: Invalid Username or Password
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth: []
   */
  app.get('/users/login/token', users.authenticate, users.loginByToken);

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
   *        Logout Successful
   *     security:
   *     - x-auth: []
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
  app.get('/users', users.authenticate, users.isAdmin, users.getAll);


  // Get all Users Pagination
  /**
   * @swagger
   * /users/?limit={integer}&offset={integer}:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users in a pagination format
   *     summary: Get all Users Pagination
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all users (data) with pagination
   *         schema:
   *           $ref: '#/definitions/Pagination'
   *       404:
   *         description: Users not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth: []
   */
  app.get('/users', users.authenticate, users.isAdmin, users.getAll);

  /**
   * @swagger
   * users/{id}:
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
  app.get('/users/:id', users.authenticate, users.isAdminOrOwner, users.getOne);

  /**
   * @swagger
   * users/{id}:
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
  app.put('/users/:id', users.authenticate, users.isAdminOrOwner, users.update);
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
  app.delete('/users/:id', users.authenticate, users.isSuperAdmin, users.delete);

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
   *     - x-auth:[]
   */
  app.get('/users/:id/documents', users.authenticate, users.isAdminOrOwner, users.getDocuments);

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
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: An array of all users
   *       404:
   *         description: No user found
   *     security:
   *     - x-auth:[]
   */
  app.get('/search/users/', users.authenticate, users.isAdmin, users.search);
};
