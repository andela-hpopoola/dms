const usersController = require('../controllers').users;
const documentsController = require('../controllers').documents;
const rolesController = require('../controllers').roles;

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ status: 'DMS API' });
  });

  app.post('/users', usersController.createUser);
  app.get('/users', usersController.getUsers);
  app.get('/users/:id', usersController.getUser);
  app.put('/users/:id', usersController.updateUser);
  app.delete('/users/:id', usersController.deleteUser);
  app.get('/users/:id/documents', usersController.getDocuments);

  app.post('/users/login', usersController.login);
  app.post('/users/authenticate', usersController.authenticate);

  app.get('/search/users/', usersController.searchUser);
  app.get('/search/documents/', documentsController.searchDocument);

  app.post('/documents', documentsController.createDocument);
  app.get('/documents', documentsController.getDocuments);
  app.get('/documents/:id', documentsController.getDocument);
  app.put('/documents/:id', documentsController.updateDocument);
  app.delete('/documents/:id', documentsController.deleteDocument);

  app.post('/roles', rolesController.createRole);
  app.get('/roles', rolesController.getRoles);
  app.get('/roles/:id', rolesController.getRole);
  app.put('/roles/:id', rolesController.updateRole);
  app.delete('/roles/:id', rolesController.deleteRole);
};
