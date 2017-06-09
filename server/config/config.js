require('dotenv').config();
module.exports = {
  development: {
    username: 'harunapopoola',
    password: null,
    database: 'dms-dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL_PRODUCTION,
    dialect: 'postgres'
  }
};
