const expect = require('expect');
const Documents = require('./../../models').Documents;
const Users = require('./../../models').Users;
const Roles = require('./../../models').Roles;

describe('Model Instance', () => {
  it('should have the User Model', () => {
    expect(Users).toExist();
  });
  it('should have the Document Model', () => {
    expect(Documents).toExist();
  });
  it('should have the Role Model', () => {
    expect(Roles).toExist();
  });
});
