const expect = require('expect');

const model = require('./../../models');
const Documents = require('./../../models').Documents;
const Users = require('./../../models').Users;
const Roles = require('./../../models').Roles;
const InputDocuments = require('./../../seeders/documents');
const InputUsers = require('./../../seeders/users');
const InputRoles = require('./../../seeders/roles');

let documentId = '';

const testDocument = InputDocuments.Private;

describe('Document Model', () => {
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

  it('should create a document', (done) => {
    Documents.create(testDocument)
      .then((document) => {
        expect(document.title).toEqual(testDocument.title);
        documentId = document.id;
        testDocument.userId = documentId;
        done();
      }).catch((err) => { done(err); });
  });

  it('should fail with invalid userId', (done) => {
    testDocument.userId = 'wrongId';
    Documents.create(testDocument)
    .then()
    .catch((error) => {
      expect(error.errors[0].message).toEqual('Invalid User');
      done();
    });
    testDocument.userId = documentId;
  });

  it('should fail if title field is empty', (done) => {
    testDocument.title = '';
    Documents.create(testDocument)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).toEqual('The title field cannot be empty');
        done();
      });
    testDocument.title = 'Document Title';
  });

  it('should fail if content field is empty', (done) => {
    testDocument.content = '';
    Documents.create(testDocument)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).toEqual('The content field cannot be empty');
        done();
      });
    testDocument.content = 'This is the document content';
  });

  it('should fail if access is not an integer', (done) => {
    testDocument.access = 'wrongAccess';
    Documents.create(testDocument)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).toEqual('Invalid Access');
        done();
      });
    testDocument.access = 0;
  });

  it('should update a document field', (done) => {
    Documents.findById(documentId)
      .then((document) => {
        document.update({ title: 'New Title' })
          .then((updatedDocument) => {
            expect(updatedDocument.id).toEqual(documentId);
            expect(updatedDocument.title).toEqual('New Title');
            done();
          });
      });
  });
  it('should delete a document', (done) => {
    Documents.destroy({ where: { id: documentId } })
      .then(() => {
        Documents.findById(documentId)
          .then((res) => {
            expect(res).toEqual(null);
            done();
          });
      });
  });
});
