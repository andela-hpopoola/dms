const users = require('../controllers').users;
const documents = require('../controllers').documents;
const roles = require('../controllers').roles;

module.exports = (app) => {
  app.post('/users', users.create);
  app.post('/users/login', users.login);
  app.get('/users', users.authenticate, users.getAll);
  app.get('/users/:id', users.authenticate, users.getOne);
  app.put('/users/:id', users.authenticate, users.update);
  app.delete('/users/:id', users.authenticate, users.delete);
  app.get('/users/:id/documents', users.authenticate, users.getDocuments);
  app.get('/search/users/', users.authenticate, users.search);

  app.post('/documents', users.authenticate, documents.create);
  app.get('/documents', users.authenticate, documents.getAll);
  app.get('/documents/:id', users.authenticate, documents.getOne);
  app.put('/documents/:id', users.authenticate, documents.update);
  app.delete('/documents/:id', users.authenticate, documents.delete);
  app.get('/search/documents/', users.authenticate, documents.search);

  app.post('/roles', users.authenticate, roles.create);
  app.get('/roles', users.authenticate, roles.getAll);
  app.get('/roles/:id', users.authenticate, roles.getOne);
  app.put('/roles/:id', users.authenticate, roles.update);
  app.delete('/roles/:id', users.authenticate, roles.delete);
};
