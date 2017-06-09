import { users, documents, roles } from '../controllers';

module.exports = (app) => {
  app.get('/api', (req, res) => res.send({ msg: 'Welcome to DMS Api' }));
  app.post('/users', users.create);
  app.post('/users/login', users.login);
  app.get('/users/logout', users.logout);
  app.get('/users/login/token', users.authenticate, users.loginByToken);
  app.get('/users', users.authenticate, users.isAdmin, users.getAll);
  app.get('/users/:id', users.authenticate, users.isAdminOrOwner, users.getOne);
  app.put('/users/:id', users.authenticate, users.isAdminOrOwner, users.update);
  app.delete('/users/:id', users.authenticate, users.isSuperAdmin, users.delete);
  app.get('/users/:id/documents', users.authenticate, users.isAdminOrOwner, users.getDocuments);
  app.get('/search/users/', users.authenticate, users.isAdmin, users.search);

  app.post('/documents', users.authenticate, documents.create);
  app.get('/documents', users.authenticate, users.isAdmin, documents.getAll);
  app.get('/documents/:id', users.authenticate, users.canManageDocument, documents.getOne);
  app.put('/documents/:id', users.authenticate, users.canManageDocument, documents.update);
  app.delete('/documents/:id', users.authenticate, users.canManageDocument, documents.delete);
  app.get('/search/documents/', users.authenticate, documents.search);

  app.get('/roles', users.authenticate, roles.getAll);
  app.post('/roles', users.authenticate, users.isSuperAdmin, roles.create);
  app.get('/roles/:id', users.authenticate, users.isSuperAdmin, roles.getOne);
  app.put('/roles/:id', users.authenticate, users.isSuperAdmin, roles.update);
  app.delete('/roles/:id', users.authenticate, users.isSuperAdmin, roles.delete);
};
