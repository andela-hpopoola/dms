import { documents } from '../controllers';
import authenticate from './../utils/authenticate';

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
   *    description: JWT Authentication
   *    in: header
   *    name: x-auth
   */


  /**
   * @swagger
   * /documents:
   *   post:
   *     tags:
   *       - Documents
   *     description: Create a New Document
   *     summary: Create a New Document
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: title
   *         description: title of document
   *         in: formData
   *         required: true
   *         type: string
   *       - name: content
   *         description: document content
   *         in: formData
   *         required: true
   *         type: string
   *       - name: access
   *         description: access type (Public = `-1`, Private = `0`, Role = RoleID)
   *         in: formData
   *         required: true
   *         type: string
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
   *         description: Document cannot be created
   *     security:
   *     - x-auth: []
   */
  app.post('/documents', authenticate.verify, documents.create);


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
   *     parameters:
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *       - name: limit
   *         description: The limit of documents to retrieve
   *         in: query
   *         required: false
   *         type: integer
   *       - name: offset
   *         description: The offset of documents to retrieve
   *         in: query
   *         required: false
   *         type: integer
   *     responses:
   *       200:
   *         description: An array of all documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth: []
   */
  app.get('/documents', authenticate.verify, authenticate.isAdmin, documents.getAll);

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
   *     parameters:
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: An array of all private documents
   *         schema:
   *           $ref: '#/definitions/Documents'
   *       404:
   *         description: Documents not found
   *       412:
   *         description: Exception Error
   *     security:
   *     - x-auth: []
   */
  app.get('/documents/private', authenticate.verify, documents.private);


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
   *     parameters:
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
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
   *     - x-auth: []
   */
  app.get('/documents/public', authenticate.verify, documents.public);

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
   *     parameters:
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
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
   *     - x-auth: []
   */
  app.get('/documents/role', authenticate.verify, documents.role);

  /**
   * @swagger
   * /documents/{id}:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns a single document
   *     summary: Get Document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
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
   *     - x-auth: []
   */
  app.get('/documents/:id', authenticate.verify, authenticate.ownsDocument, documents.getOne);


  /**
   * @swagger
   * /documents/{id}:
   *   put:
   *     tags:
   *       - Documents
   *     description: Edit a single document
   *     summary: Edit Document
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: title
   *         description: updated Title
   *         in: formData
   *         required: true
   *         type: string
   *       - name: content
   *         description: updated content
   *         in: formData
   *         required: true
   *         type: string
   *       - name: access
   *         description: updated access (Public = `-1`, Private = `0`, Role = RoleID)
   *         in: formData
   *         required: true
   *         type: string
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully updated
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Document cannot be found
   *     security:
   *     - x-auth: []
   */
  app.put('/documents/:id', authenticate.verify, authenticate.ownsDocument, documents.update);
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
   *         description: Document cannot be found
   *     security:
   *     - x-auth: []
   */
  app.delete('/documents/:id', authenticate.verify, authenticate.ownsDocument, documents.delete);

  /**
   * @swagger
   * /search/documents/:
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
   *         in: query
   *         required: true
   *         type: string
   *       - name: x-auth
   *         in: header
   *         description: JWT Authentication
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: An array of all documents
   *       403:
   *         description: Forbidden
   *       404:
   *         description: No document found
   *     security:
   *     - x-auth: []
   */
  app.get('/search/documents/', authenticate.verify, documents.getAll);
};
