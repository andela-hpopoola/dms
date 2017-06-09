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

let token = '';
let id = '';
let adminId = '';
let documentId = '';
let roleId = '';
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
          .expect(200, done);
      });
    });

    describe('GET /documents/:id', () => {
      it('should not get invalid document', (done) => {
        request.get('/documents/0')
          .set('x-auth', adminToken)
          .expect(404, done);
      });
    });

    describe('PUT /documents/', () => {
      it('should be able to update his document details', (done) => {
        const updatedDetails = {
          title: 'Updated Name',
          password: 'updated'
        };
        request.put(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .send(updatedDetails)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.msg;
            const actual = 'Document Updated';
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('DELETE /documents/:id', () => {
      it('should be able to delete document', (done) => {
        request.delete(`/documents/${documentId}`)
          .set('x-auth', adminToken)
          .expect(202)
          .end((err) => {
            done(err);
          });
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

describe('Users Routes', () => {
  describe('Normal User', () => {
    describe('POST /users/', () => {
      it('should signup a valid user', (done) => {
        request.post('/users')
          .send(InputUsers.NormalUser)
          .expect(200)
          .end((err, res) => {
            const expected = res.body;
            const actual = InputUsers.NormalUser;
            expect(expected.name).toEqual(actual.name);
            expect(expected.email).toEqual(actual.email);
            done(err);
          });
      });
    });

    describe('POST /users/login', () => {
      it('should sign in a valid user', (done) => {
        const loginDetails = {
          email: InputUsers.NormalUser.email,
          password: InputUsers.NormalUser.password
        };
        request.post('/users/login')
          .send(loginDetails)
          .expect(200)
          .end((err, res) => {
            token = res.body.token;
            id = res.body.id;
            const expected = res.body;
            const actual = InputUsers.NormalUser;
            expect(expected.name).toEqual(actual.name);
            expect(expected.email).toEqual(actual.email);
            done(err);
          });
      });
    });

    describe('POST /users/login', () => {
      it('should not login invalid user', (done) => {
        const loginDetails = {
          email: InputUsers.InvalidUser.email,
          password: InputUsers.InvalidUser.password
        };
        request.post('/users/login')
          .send(loginDetails)
          .expect(401, done);
      });
    });

    describe('GET /users/login/token', () => {
      it('should be logged in automatically if token is active', (done) => {
        request.get('/users/login/token')
          .set('x-auth', token)
          .expect(200)
          .end((err, res) => {
            const expected = res.body;
            const actual = InputUsers.NormalUser;
            expect(expected.name).toEqual(actual.name);
            expect(expected.email).toEqual(actual.email);
            done();
          });
      });
    });

    describe('GET /users/:id', () => {
      it('should allow user view his profile', (done) => {
        request.get(`/users/${id}`)
          .set('x-auth', token)
          .expect(200)
          .end((err, res) => {
            const expected = res.body;
            const actual = InputUsers.NormalUser;
            expect(expected.name).toEqual(actual.name);
            expect(expected.email).toEqual(actual.email);
            done();
          });
      });
    });

    describe('PUT /users/', () => {
      it('should be able to update his details', (done) => {
        const updatedDetails = {
          updatedName: 'Updated Name',
          password: 'updated'
        };
        request.put(`/users/${id}`)
          .set('x-auth', token)
          .send(updatedDetails)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.msg;
            const actual = 'User Updated';
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('GET /users/logout', () => {
      it('successfully logout a user', (done) => {
        request.get('/users/logout')
          .expect(200, done);
      });
    });

    describe('DELETE /users/:id', () => {
      it('should be unable to delete user', (done) => {
        request.delete(`/users/${id}`)
          .set('x-auth', token)
          .expect(403)
          .end((err) => {
            done(err);
          });
      });
    });
  });

  describe('Super Admin', () => {
    describe('POST /users/', () => {
      it('should signup as an admin', (done) => {
        request.post('/users')
          .send(InputUsers.SuperAdmin)
          .expect(200)
          .end((err, res) => {
            const expected = res.body;
            const actual = InputUsers.SuperAdmin;
            expect(expected.name).toEqual(actual.name);
            expect(expected.email).toEqual(actual.email);
            done(err);
          });
      });
    });

    describe('POST /users/', () => {
      it('should not signup an existing email address', (done) => {
        request.post('/users')
          .send(InputUsers.SuperAdmin)
          .expect(412, done);
      });
    });

    describe('POST /users/login', () => {
      it('should sign in an administrator', (done) => {
        const loginDetails = {
          email: InputUsers.SuperAdmin.email,
          password: InputUsers.SuperAdmin.password
        };
        request.post('/users/login')
          .send(loginDetails)
          .expect(200)
          .end((err, res) => {
            token = res.body.token;
            adminId = res.body.id;
            const expected = res.body;
            const actual = InputUsers.SuperAdmin;
            expect(expected.roleId).toEqual(actual.roleId);
            expect(expected.email).toEqual(actual.email);
            done(err);
          });
      });
    });

    describe('GET /users', () => {
      it('should be able to get all users', (done) => {
        request.get('/users')
          .set('x-auth', token)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.length;
            const actual = 3;
            expect(expected).toEqual(actual);
            done();
          });
      });
    });

    describe('PUT /users/', () => {
      it('should be able to update another user details', (done) => {
        const updatedDetails = {
          updatedName: 'Updated Name',
          password: 'updated'
        };
        request.put(`/users/${id}`)
          .set('x-auth', token)
          .send(updatedDetails)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.msg;
            const actual = 'User Updated';
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('PUT /users/', () => {
      it('should be able to update his details', (done) => {
        const updatedDetails = {
          name: 'Updated Name',
          password: 'updated'
        };
        request.put(`/users/${adminId}`)
          .set('x-auth', token)
          .send(updatedDetails)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.msg;
            const actual = 'User Updated';
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('GET /users/logout', () => {
      it('successfully logout a user', (done) => {
        request.get('/users/logout')
          .expect(200, done);
      });
    });

    describe('DELETE /users/:id', () => {
      it('should be able to delete user', (done) => {
        request.delete(`/users/${id}`)
          .set('x-auth', adminToken)
          .expect(202)
          .end((err) => {
            done(err);
          });
      });
    });

    describe('GET /users/:id/documents', () => {
      it('should be able to retrieve documents', (done) => {
        request.get(`/users/${id}/documents`)
          .set('x-auth', adminToken)
          .expect(200)
          .end((err) => {
            done(err);
          });
      });
    });
  });

  describe('Roles Admin', () => {
    describe('POST /roles/', () => {
      it('should create a new role', (done) => {
        request.post('/roles')
          .send(InputRoles.NewRole)
          .set('x-auth', adminToken)
          .expect(200)
          .end((err, res) => {
            roleId = res.body.id;
            const expected = res.body;
            const actual = InputRoles.NewRole;
            expect(expected.title).toEqual(actual.title);
            done(err);
          });
      });
    });

    describe('POST /roles/', () => {
      it('should create not create an existing role', (done) => {
        request.post('/roles')
          .send(InputRoles.NewRole)
          .set('x-auth', adminToken)
          .expect(409, done);
      });
    });


    describe('GET /roles', () => {
      it('should be able to get all users', (done) => {
        request.get('/roles')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.length;
            const actual = 3;
            expect(expected).toEqual(actual);
            done();
          });
      });
    });

    describe('PUT /roles/', () => {
      it('should be able to change roles title', (done) => {
        const updatedDetails = {
          title: 'Updated Role',
        };
        request.put(`/roles/${roleId}`)
          .set('x-auth', adminToken)
          .send(updatedDetails)
          .expect(200)
          .end((err, res) => {
            const expected = res.body.msg;
            const actual = 'Role Updated';
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('GET /roles/:id', () => {
      it('should be able to retrieve roles', (done) => {
        request.get(`/roles/${roleId}`)
          .set('x-auth', adminToken)
          .expect(200)
          .end((err) => {
            done(err);
          });
      });
    });
    describe('DELETE /roles/:id', () => {
      it('should be able to delete roles', (done) => {
        request.delete(`/roles/${roleId}`)
          .set('x-auth', token)
          .expect(202)
          .end((err) => {
            done(err);
          });
      });
    });
  });
});
