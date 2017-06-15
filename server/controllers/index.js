const users = require('./users');
const documents = require('./documents');
const roles = require('./roles');

// Export controllers to make call to them easier
module.exports = {
  users,
  documents,
  roles
};
