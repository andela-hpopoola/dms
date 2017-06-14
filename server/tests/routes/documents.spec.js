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
      it('should not create for an existing document', (done) => {
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
          .expect(409, done);
      });
    });

    describe('GET /documents', () => {
      it('should get all documents', (done) => {
        request.get('/documents')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.length;
            const actual = 2; // can only get 2 documents
            expect(expected).toEqual(actual);
            done(err);
          });
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

    describe('SEARCH search/users/', () => {
      it('should be able to search for users', (done) => {
        request.get('/search/users/?q=admin')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err) => {
            done(err);
          });
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

    describe('SEARCH /users/:id/documents', () => {
      it('should not search when character is less than 3', (done) => {
        request.get('/search/documents/?q=do')
          .set('x-auth', adminToken)
          .expect(401)
          .end((err) => {
            done(err);
          });
      });
    });
  });
});
