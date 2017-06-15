const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const routesPath = path.join(__dirname, './*.js');
module.exports = (app) => {
  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'DMS API',
      version: '1.0.0',
      description: 'DMS is a full stack document management system, complete with roles and privileges.',
    },
    host: 'https://haruna-dms.herokuapp.com/',
    basePath: '/',
  };

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: [routesPath],
  };

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  // serve swagger
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
