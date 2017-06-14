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
});
