const express = require('express');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);

app.listen(port, () => {
  console.log(`Started up at port port ${port}`);
});

module.exports = app;