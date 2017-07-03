const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const expect = require('expect');
const app = require('./../../../server');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const request = supertest(app);
const model = require('./../../models');
const Users = require('./../../models').Users;
const Roles = require('./../../models').Roles;
const InputUsers = require('./../../seeders/users');
const InputRoles = require('./../../seeders/roles');

let roleId = '';

const payload = { email: InputUsers.SuperAdmin.email };
const adminToken = jwt.sign(payload, JWT_SECRET_KEY);

describe('Roles Controller', () => {
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
                InputUsers.NormalUser
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

  describe('Create Method', () => {
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

    it('should create not create an existing role', (done) => {
      request.post('/roles')
        .send(InputRoles.NewRole)
        .set('x-auth', adminToken)
        .expect(409, done);
    });
  });


  describe('Get All Methods', () => {
    it('should be able to get all roles', (done) => {
      request.get('/roles')
        .set('x-auth', adminToken)
        .expect(200)
        .end((err, res) => {
          const expected = res.body.length;
          const actual = 4;
          expect(expected).toEqual(actual);
          done();
        });
    });
  });

  describe('Update Method', () => {
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

  describe('Get One Method', () => {
    it('should be able to retrieve roles', (done) => {
      request.get(`/roles/${roleId}`)
        .set('x-auth', adminToken)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });
  });
  describe('Delete Method', () => {
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
