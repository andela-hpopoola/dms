const expect = require('expect');

const model = require('./../../models');
const Users = require('./../../models').Users;
const Roles = require('./../../models').Roles;
const InputUsers = require('./../../seeders/users');
const InputRoles = require('./../../seeders/roles');

const testUser = InputUsers.SuperAdmin2;
let userId;

describe('User Model', () => {
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
  it('should create a user', (done) => {
    Users.create(testUser)
      .then((user) => {
        expect(user.name).toEqual(testUser.name);
        userId = user.id;
        done();
      });
  });

  it('should fail if email exists', (done) => {
    Users.create(testUser)
      .then()
      .catch((error) => {
        expect(error.errors[0].value).toEqual(testUser.email);
        expect(error.errors[0].message).toEqual('Email exists');
        expect(error.errors[0].type).toEqual('unique violation');
        expect(error.errors[0].path).toEqual('email');
        done();
      });
  });

  it('should fail with invalid email address', (done) => {
    testUser.password = '123456';
    testUser.email = 'wrongemail';
    Users.create(testUser)
    .then()
    .catch((error) => {
      expect(error.errors[0].message).toEqual('Invalid email address');
      done();
    });
  });

  it('should fail if name field is empty', (done) => {
    testUser.name = '';
    Users.create(testUser)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).toEqual('The name field cannot be empty');
        done();
      });
  });

  it('should fail if roleId is not an integer', (done) => {
    testUser.name = 'Super Admin';
    testUser.email = 'anotheremail@dms.com';
    testUser.roleId = 'role';
    Users.create(testUser)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).toEqual('Invalid Role');
        done();
      });
  });

  it('should update a user field', (done) => {
    Users.findById(userId)
      .then((user) => {
        user.update({ name: 'Haruna' })
          .then((updatedUser) => {
            expect(updatedUser.id).toEqual(userId);
            expect(updatedUser.name).toEqual('Haruna');
            done();
          });
      });
  });
  it('should delete a user', (done) => {
    Users.destroy({ where: { id: userId } })
      .then(() => {
        Users.findById(userId)
          .then((res) => {
            expect(res).toEqual(null);
            done();
          });
      });
  });
});
