const ROLES = require('./../../constants').ROLES;
const DOCUMENTS = require('./../../constants').DOCUMENTS;
const Users = require('./users');

// Test Seeders
module.exports = {
  Public: {
    userId: ROLES.SUPERADMIN,
    title: 'Super Admin',
    content: 'a sample document for the superadmin',
    access: DOCUMENTS.PUBLIC,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  Private: {
    userId: ROLES.ADMIN,
    title: 'Administrator',
    content: 'a sample document for admin',
    access: DOCUMENTS.PRIVATE,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  Role: {
    userId: 100,
    title: 'Roles',
    content: 'another users document',
    access: Users.NormalUser.roleId,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  Other: {
    userId: ROLES.USER,
    title: 'Normal User',
    content: 'this belongs to a user',
    access: DOCUMENTS.PRIVATE,
    createdAt: new Date(),
    updatedAt: new Date()
  },
};
