
// const jwt = require('jsonwebtoken');
// const supertest = require('supertest');
// const expect = require('expect');
// const app = require('./../../../server');

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// const request = supertest(app);
// const Documents = require('./../../models').Documents;
// const Users = require('./../../models').Users;
// const InputDocuments = require('./../../seeders/documents');
// const InputUsers = require('./../../seeders/users');

// let documentId = '';
// let adminId = '';
// let adminToken = '';

// before((done) => {
//   Users
//     .destroy({ where: {} })
//     .then(() => {
//       Users.create(InputUsers.SuperAdmin).then((user) => {
//         const payload = { email: user.email };
//         user.token = jwt.sign(payload, JWT_SECRET_KEY);
//         adminToken = user.token;
//         adminId = user.id;
//         Documents
//         .destroy({ where: {} })
//         .then(() => {
//           Documents.bulkCreate([
//             InputDocuments.Other,
//             InputDocuments.Private,
//             InputDocuments.Role
//           ]);
//           done();
//         });
//       });
//     });
// });


// describe('Search Routes', () => {
//   describe('For Normal Document', () => {
//     describe('POST /documents/', () => {
//       it('should create a new document', (done) => {
//         request.post('/documents')
//           .send({
//             userId: adminId,
//             title: InputDocuments.Public.title,
//             content: InputDocuments.Public.content,
//             access: InputDocuments.Public.access,
//             createdAt: InputDocuments.Public.createdAt,
//             updatedAt: InputDocuments.Public.updatedAt
//           })
//           .set('x-auth', adminToken)
//           .expect(200)
//           .end((err, res) => {
//             documentId = res.body.id;
//             const expected = res.body;
//             const actual = InputDocuments.Public;
//             expect(expected.title).toEqual(actual.title);
//             expect(expected.content).toEqual(actual.content);
//             done(err);
//           });
//       });
//     });

//     describe('SEARCH /documents', () => {
//       it('should get all documents', (done) => {
//         request.get('search/documents/?q=')
//           .set('x-auth', adminToken)
//           .expect(200)
//           .end((err, res) => {
//             const expected = res.body.length;
//             const actual = 2; // can only get 2 documents
//             expect(expected).toEqual(actual);
//             done(err);
//           });
//       });
//     });

//     describe('GET /documents/:id', () => {
//       it('should allow user get his documents', (done) => {
//         request.get(`/documents/${documentId}`)
//           .set('x-auth', adminToken)
//           .expect(200, done);
//       });
//     });

//     describe('PUT /documents/', () => {
//       it('should be able to update his document details', (done) => {
//         const updatedDetails = {
//           title: 'Updated Name',
//           password: 'updated'
//         };
//         request.put(`/documents/${documentId}`)
//           .set('x-auth', adminToken)
//           .send(updatedDetails)
//           .expect(200)
//           .end((err, res) => {
//             const expected = res.body.msg;
//             const actual = 'Document Updated';
//             expect(expected).toEqual(actual);
//             done(err);
//           });
//       });
//     });
//   });
// });
