const supertest = require('supertest');
const expect = require('expect');
const app = require('./../../../server');

const request = supertest(app);
const model = require('./../../models');
const Users = require('./../../models').Users;
const Roles = require('./../../models').Roles;
const InputUsers = require('./../../seeders/users');
const InputRoles = require('./../../seeders/roles');

let userToken = '';
let adminToken = '';

describe('Authentication', () => {
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
              ])
              .then(() => done());
            });
        });
      });
  });
  after((done) => {
    model.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  it('should be able to signup a user without authentication', (done) => {
    request.post('/users')
      .send(InputUsers.NormalUser2)
      .expect(200)
      .end((err, res) => {
        const expected = res.body;
        const actual = InputUsers.NormalUser2;
        expect(expected.name).toEqual(actual.name);
        expect(expected.email).toEqual(actual.email);
        done(err);
      });
  });

  it('should sign in a valid user', (done) => {
    const loginDetails = {
      email: InputUsers.NormalUser.email,
      password: InputUsers.NormalUser.password
    };
    request.post('/users/login')
      .send(loginDetails)
      .expect(200)
      .end((err, res) => {
        userToken = res.body.token;
        const expected = res.body;
        const actual = InputUsers.NormalUser;
        expect(expected.name).toEqual(actual.name);
        expect(expected.email).toEqual(actual.email);
        done(err);
      });
  });

  it('should sign in a valid admin', (done) => {
    const loginDetails = {
      email: InputUsers.SuperAdmin.email,
      password: InputUsers.SuperAdmin.password
    };
    request.post('/users/login')
      .send(loginDetails)
      .expect(200)
      .end((err, res) => {
        adminToken = res.body.token;
        const expected = res.body;
        const actual = InputUsers.SuperAdmin;
        expect(expected.name).toEqual(actual.name);
        expect(expected.email).toEqual(actual.email);
        done(err);
      });
  });
  it('should not authorize a user who supplies invalid token', (done) => {
    request.get('/users')
      .set('x-auth', 'wrong token')
      .expect(401, done);
  });
  it('should not return users if the user is not admin', (done) => {
    request.get('/users')
      .set('x-auth', userToken)
      .expect(403, done);
  });
  it('should correctly return all users with valid token and access', (done) => {
    request.get('/users')
      .set('x-auth', adminToken)
      .end((error, response) => {
        expect(response.status).toEqual(200);
        done();
      });
  });
});
