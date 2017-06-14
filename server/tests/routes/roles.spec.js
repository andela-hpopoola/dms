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
          .set('x-auth', adminToken)
          .expect(202)
          .end((err) => {
            done(err);
          });
      });
    });
  });
