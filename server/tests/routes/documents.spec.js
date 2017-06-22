const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const expect = require('expect');
const app = require('./../../../server');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const request = supertest(app);
const Documents = require('./../../models').Documents;
const Users = require('./../../models').Users;
const Roles = require('./../../models').Roles;
const InputDocuments = require('./../../seeders/documents');
const InputUsers = require('./../../seeders/users');
const InputRoles = require('./../../seeders/roles');


let adminId = '';
let documentId = '';
let adminToken = '';


before((done) => {
  Users
    .destroy({ where: {} })
    .then(() => {
      Users.create(InputUsers.SuperAdmin2).then((user) => {
        const payload = { email: user.email };
        user.token = jwt.sign(payload, JWT_SECRET_KEY);
        adminToken = user.token;
        adminId = user.id;
        Documents
        .destroy({ where: {} })
        .then(() => {
          Documents.bulkCreate([
            InputDocuments.Other,
            InputDocuments.Private,
            InputDocuments.Role
          ]);
          Roles
            .destroy({ where: {} })
            .then(() => {
              Roles.bulkCreate([
                InputRoles.SuperAdmin,
                InputRoles.Admin,
              ]);
              done();
            });
        });
      });
    });
});
after((done) => {
  Users
    .destroy({ where: {} })
    .then(() => {
      Documents
        .destroy({ where: {} })
        .then(() => {
          Roles
            .destroy({ where: {} })
            .then(() => done());
        });
    });
});

describe('Document Routes', () => {
  describe('For Normal Document', () => {
    describe('POST /documents/', () => {
      it('should create a new document', (done) => {
        request.post('/documents')
          .send({
            userId: adminId,
            title: InputDocuments.Public.title,
            content: InputDocuments.Public.content,
            access: InputDocuments.Public.access,
            createdAt: InputDocuments.Public.createdAt,
            updatedAt: InputDocuments.Public.updatedAt
          })
          .set('x-auth', adminToken)
          .expect(200)
          .end((err, res) => {
            documentId = res.body.id;
            const expected = res.body;
            const actual = InputDocuments.Public;
            expect(expected.title).toEqual(actual.title);
            expect(expected.content).toEqual(actual.content);
            done(err);
          });
      });
    });
    describe('POST /documents/', () => {
      it('should not create for an existing document title', (done) => {
        request.post('/documents')
          .send({
            title: InputDocuments.Public.title,
            content: InputDocuments.Public.content,
            access: InputDocuments.Role.access,
            createdAt: InputDocuments.Public.createdAt,
            updatedAt: InputDocuments.Public.updatedAt
          })
          .set('x-auth', adminToken)
          .expect(409, done);
      });
    });
    describe('POST /documents/', () => {
      it('should not create for an invalid document', (done) => {
        request.post('/documents')
          .send({
            access: InputDocuments.Role.access,
          })
          .set('x-auth', adminToken)
          .expect(409, done);
      });
    });

    describe('POST /documents/', () => {
      it('should not create for an invalid document format', (done) => {
        request.post('/documents')
          .send({
            wrongfield: InputDocuments.Role.access,
          })
          .set('x-auth', adminToken)
          .expect(412, done);
      });
    });

    describe('GET /documents', () => {
      it('should get all documents', (done) => {
        request.get('/documents')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.pagination.total;
            const actual = 2; // can only get 2 documents
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('GET /documents/public', () => {
      it('should get all public documents', (done) => {
        request.get('/documents/public')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.length;
            const actual = 1;
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('GET /documents/role', () => {
      it('should get all role documents', (done) => {
        request.get('/documents/roles')
          .set('x-auth', adminToken)
          .expect(200, done());
      });
    });

    describe('GET /documents/:id', () => {
      it('should allow user get his documents', (done) => {
        request.get(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .expect(200, done());
      });
    });

    describe('GET /documents/:id', () => {
      it('should not get invalid document', (done) => {
        request.get('/documents/0')
          .set('x-auth', adminToken)
          .expect(404, done());
      });
    });

    describe('SEARCH /users/documents', () => {
      it('should be able to retrieve documents', (done) => {
        request.get('/search/documents/?q=document')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err) => {
            done(err);
          });
      });
    });

    describe('SEARCH /users/documents', () => {
      it('should not retrieve unsaved documents', (done) => {
        request.get('/search/documents/?q=nottsavedcdocsss')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.pagination.total;
            const actual = 0; // Document not found
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('SEARCH /users/:id/documents', () => {
      it('should not search when character is less than 3', (done) => {
        request.get('/search/documents/?q=12')
          .set('x-auth', adminToken)
          .expect(412)
          .end((err) => {
            done(err);
          });
      });
    });

    describe('PUT /documents/', () => {
      it('should be updated by user only', (done) => {
        const updatedDetails = {
          title: 'Updated Name',
        };
        request.put(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .send(updatedDetails)
          .expect(200, done());
      });
    });

    describe('PUT /documents/', () => {
      it('should not updated invalid documents', (done) => {
        const updatedDetails = {
          title: 'Updated Name',
        };
        request.put('/documents/invalid')
          .set('x-auth', adminToken)
          .send(updatedDetails)
          .expect(403, done());
      });
    });

    describe('PUT /documents/', () => {
      it('should not be updated by another user', (done) => {
        const updatedDetails = {
          title: 'Updated Name',
        };
        request.put(`/documents/${documentId}`)
          .set('x-auth', 'wrongtoken')
          .send(updatedDetails)
          .expect(403, done());
      });
    });

    describe('PUT /documents/', () => {
      it('should not updated invalid information', (done) => {
        const updatedDetails = {
          notExistence: 'Updated Name',
        };
        request.put(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .send(updatedDetails)
          .expect(403, done());
      });
    });

    describe('DELETE /documents/:id', () => {
      it('should return an error when document is not found', (done) => {
        request.delete('/documents/1321342343')
          .set('x-auth', adminToken)
          .expect(403, done());
      });
    });

    describe('DELETE /documents/:id', () => {
      it('should be unable to delete document', (done) => {
        request.delete(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .expect(202, done());
      });
    });

    describe('DELETE /documents/:id', () => {
      it('should return an error when no data is given', (done) => {
        request.delete('/documents/')
          .set('x-auth', adminToken)
          .expect(412, done());
      });
    });

    describe('DELETE /documents/:id', () => {
      it('should delete a valid document', (done) => {
        request.delete(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .expect(404, done());
      });
    });

    describe('DELETE /documents/:id', () => {
      it('should delete a valid document', (done) => {
        request.delete(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .expect(202, done());
      });
    });

    describe('DELETE /documents/:id', () => {
      it('should not delete an invalid document', (done) => {
        request.delete('/documents/0')
          .set('x-auth', adminToken)
          .expect(404, done());
      });
    });
  });
});
