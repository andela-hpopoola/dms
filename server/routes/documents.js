import { users, documents } from '../controllers';

module.exports = (app) => {
  // Document Schema definition
  /**
   * @swagger
   * definitions:
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
   * /documents:
   *   post:
   *     tags:
   *       - Documents
   *     description: Create a New Document
   *     summary: Create a New Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: document
   *         description: Document object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Documents'
   *     responses:
   *       200:
   *         description: Successfully created
   *       412:
   *         description: Document cannot be created
   */
  app.post('/documents', users.authenticate, documents.create);

  // Get all Documents Routes
  /**
   * @swagger
   * /documents:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all documents
   *     summary: Get All Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth:
   */
  app.get('/documents', users.authenticate, users.isAdmin, documents.getAll);


  // Get all Documents Pagination
  /**
   * @swagger
   * /documents/?limit={integer}&offset={integer}:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all documents in a pagination format
   *     summary: Get all Documents Pagination
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all documents (data) with pagination
   *         schema:
   *           $ref: '#/definitions/Pagination'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth:
   */
  app.get('/documents', users.authenticate, users.isAdmin, documents.getAll);

// Get all private documents
  /**
   * @swagger
   * /documents/private:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all private documents
   *     summary: Get All Private Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all private documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   */
  app.get('/documents/private', users.authenticate, documents.private);

// Get all public documents
  /**
   * @swagger
   * /documents/public:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all public documents
   *     summary: Get All Public Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all public documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth:
   */
  app.get('/documents/public', users.authenticate, documents.public);

  // Get all roles documents
  /**
   * @swagger
   * /documents/roles:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all roles documents
   *     summary: Get all Role Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of all roles documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth:
   */
  app.get('/documents/role', users.authenticate, documents.role);

  /**
   * @swagger
   * documents/{id}:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns a single document
   *     summary: Get Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Documents's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single document
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Document not found
   *     security:
   *     - x-auth:
   */
  app.get('/documents/:id', users.authenticate, users.canManageDocument, documents.getOne);

  /**
   * @swagger
   * documents/{id}:
   *   put:
   *     tags:
   *       - Documents
   *     description: Edit a single document
   *     summary: Edit Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully updated
   *       404:
   *         description: Document cannot be found
   *     security:
   *     - x-auth:
   */
  app.put('/documents/:id', users.authenticate, users.canManageDocument, documents.update);

  /**
   * @swagger
   * /documents/{id}:
   *   delete:
   *     tags:
   *       - Documents
   *     description: Deletes a single document
   *     summary: Delete Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   *       404:
   *         description: Document cannot be found
   *     security:
   *     - x-auth:
   */
  app.delete('/documents/:id', users.authenticate, users.canManageDocument, documents.delete);

  /**
   * @swagger
   * /documents/search:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns an array of documents
   *     summary: Search for Document
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
   *         description: An array of all documents
   *       404:
   *         description: No document found
   *     security:
   *     - x-auth:
   */
  app.get('/search/documents/', users.authenticate, documents.search);
};
