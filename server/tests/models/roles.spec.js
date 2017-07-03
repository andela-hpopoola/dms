const expect = require('expect');
const model = require('./../../models');
const Roles = require('./../../models').Roles;

const InputRoles = require('./../../seeders/roles');

const testRole = InputRoles.Admin;
let roleId;

describe('Role Model', () => {
  before((done) => {
    Roles.destroy({ where: {} });
    done();
  });
  after((done) => {
    model.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });
  it('should create a role', (done) => {
    Roles.create(testRole)
      .then((role) => {
        expect(role.title).toEqual(testRole.title);
        roleId = role.id;
        done();
      });
  });

  it('should fail if title field is empty', (done) => {
    testRole.title = '';
    Roles.create(testRole)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).toEqual('The role title cannot be empty');
        done();
      });
    testRole.title = 'Role Title';
  });

  it('should update a role field', (done) => {
    Roles.findById(roleId)
      .then((role) => {
        role.update({ title: 'New Title' })
          .then((updatedRole) => {
            expect(updatedRole.id).toEqual(roleId);
            expect(updatedRole.title).toEqual('New Title');
            done();
          });
      });
  });
  it('should delete a role', (done) => {
    Roles.destroy({ where: { id: roleId } })
      .then(() => {
        Roles.findById(roleId)
          .then((res) => {
            expect(res).toEqual(null);
            done();
          });
      });
  });
});
