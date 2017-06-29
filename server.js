const express = require('express');
const path = require('path');
const winston = require('winston');
const bodyParser = require('body-parser');
const routes = require('./server/routes');

// Get all environment variables
require('dotenv').config();

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
routes.swagger(app);
routes.users(app);
routes.documents(app);
routes.roles(app);

app.use(express.static('client/public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public/index.html'));
});

app.listen(port, () => {
  winston.info(`Started up at port port ${port}`);
});

module.exports = app;
