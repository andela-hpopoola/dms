const ROLES = require('./../../constants').ROLES;
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync();

// Test Seeders
module.exports = {
  SuperAdmin: {
    name: 'SuperAdmin',
    email: 'superadmin@dms.com',
    password: bcrypt.hashSync('coded', salt),
    roleId: ROLES.SUPERADMIN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  SuperAdmin2: {
    name: 'SuperAdmin',
    email: 'superadmin2@dms.com',
    password: bcrypt.hashSync('coded', salt),
    roleId: ROLES.SUPERADMIN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  Admin: {
    name: 'Admin',
    email: 'admin@dms.com',
    password: bcrypt.hashSync('123456', salt),
    roleId: ROLES.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  NormalUser: {
    name: 'user',
    email: 'user@dms.com',
    password: bcrypt.hashSync('password', salt),
    roleId: ROLES.USER,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  InvalidUser: {
    name: 'invalid',
    email: 'invalid@dms.com',
    password: bcrypt.hashSync('invalid', salt),
    roleId: ROLES.USER,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};
