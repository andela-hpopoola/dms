const supertest = require('supertest');
const expect = require('expect');
const app = require('./../../../server');

const request = supertest(app);
const model = require('./../../models');
const Users = require('./../../models').Users;
const Roles = require('./../../models').Roles;
const InputUsers = require('./../../seeders/users');
const InputRoles = require('./../../seeders/roles');

let token = '';
let id = '';
let adminId = '';
let adminToken = '';

describe('Users Controller', () => {
  before((done) => {
    Roles
      .destroy({ where: {} })
      .then(() => {
        Roles.bulkCreate([
          InputRoles.SuperAdmin,
          InputRoles.Admin,
          InputRoles.NormalUser
        ], { returning: true }).then((createdRoles) => {
          InputUsers.SuperAdmin.roleId = createdRoles[0].id;
          InputUsers.Admin.roleId = createdRoles[1].id;
          InputUsers.NormalUser.roleId = createdRoles[2].id;
          Users
            .destroy({ where: {} })
            .then(() => {
              Users.bulkCreate([
                InputUsers.SuperAdmin,
                InputUsers.Admin,
              ]);
              done();
            });
        });
      });
  });
  after((done) => {
    model.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  describe('Normal Users', () => {
    describe('Create Method', () => {
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

    describe('Login Method', () => {
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

    describe('Get One Method', () => {
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

    describe('Update Method', () => {
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

      it('should not be able to update another users details', (done) => {
        const updatedDetails = {
          updatedName: 'Updated Name',
          password: 'updated'
        };
        request.put('/users/0')
          .set('x-auth', token)
          .send(updatedDetails)
          .expect(403)
          .end((err, res) => {
            const expected = res.body.msg;
            const actual = 'Unauthorized Access';
            expect(expected).toEqual(actual);
            done(err);
          });
      });
    });

    describe('Delete Method', () => {
      it('should not be able to delete his account', (done) => {
        request.delete(`/users/${id}`)
          .set('x-auth', token)
          .expect(403)
          .end((err) => {
            done(err);
          });
      });
    });

    describe('Get Documents Method', () => {
      it('should be able to retrieve documents', (done) => {
        request.get(`/users/${id}/documents`)
          .set('x-auth', token)
          .expect(200)
          .end((err) => {
            done(err);
          });
      });

      it('should not retrieve invalid documents', (done) => {
        request.get('/users/invalid/documents')
          .set('x-auth', token)
          .expect(403)
          .end((err) => {
            done(err);
          });
      });
    });

    describe('Logout Method', () => {
      it('successfully logout a user', (done) => {
        request.get('/users/logout')
          .expect(200, done);
      });
    });

    describe('Delete Method', () => {
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
    describe('Login Method', () => {
      it('should sign in a valid user', (done) => {
        const loginDetails = {
          email: InputUsers.SuperAdmin.email,
          password: InputUsers.SuperAdmin.password
        };
        request.post('/users/login')
          .send(loginDetails)
          .expect(200)
          .end((err, res) => {
            adminToken = res.body.token;
            adminId = res.body.id;
            const expected = res.body;
            const actual = InputUsers.SuperAdmin;
            expect(expected.name).toEqual(actual.name);
            expect(expected.email).toEqual(actual.email);
            done(err);
          });
      });
    });
    describe('Update Method', () => {
      it('should be able to update his details', (done) => {
        const updatedDetails = {
          name: 'Updated Name',
          password: 'updated'
        };
        request.put(`/users/${adminId}`)
          .set('x-auth', adminToken)
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

    describe('Logout Method', () => {
      it('successfully logout a user', (done) => {
        request.get('/users/logout')
          .expect(200, done);
      });
    });

    describe('Search Method', () => {
      it('should be able to search for users', (done) => {
        request.get('/search/users/?q=admin')
          .set('x-auth', adminToken)
          .expect(200)
          .end((err) => {
            done(err);
          });
      });
    });

    describe('Delete Method', () => {
      it('should be able to delete user', (done) => {
        request.delete(`/users/${id}`)
          .set('x-auth', adminToken)
          .expect(202)
          .end((err) => {
            done(err);
          });
      });
    });

    describe('GET /users/{notFound}/documents', () => {
      it('should not retrieve documents with wrong token', (done) => {
        request.get('/users/1234243/documents')
          .set('x-auth', 'wrongtoken')
          .expect(401)
          .end((err) => {
            done(err);
          });
      });
    });
  });
});
