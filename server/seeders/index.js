/* eslint-disable */
'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync();
const encryptedPassword = bcrypt.hashSync('123456', salt);

// Add a Real User
let users = [{
    name: 'Haruna Popoola',
    email: 'mark@mark.com',
    password: encryptedPassword,
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }];

// Generate 30 Random Fakers User
for (var i = 0; i < 30; i++) {

  // Generate a random roleId
  let roleId;

  // Generate roles
  if (i < 3) {
    // Generate 3 SuperAdmins
    roleId = 1;
  } else if (i < 10) {
    // Generate 10 Admin
    roleId = 2;
  } else {
    // Generate over 20 Normal Users
    roleId = 3;
  }

  // Generate their details
  const details = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: encryptedPassword,
    roleId: roleId,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Add to the Users Array
  users.push(details);
};

// Generate for Document
let documents = [];

// Generate 300 documents
for (var i = 0; i < 300; i++) {
  let access;
  //generate a random user Id
  const userId = Math.floor(Math.random() * 30) + 1; 
  const roleId = Math.floor(Math.random() * 3) + 1; 

  // Generate 100 Public Documents
  if (i < 100) {
    access = -1;
  } else if (i < 200) {
    // Generate 100 Private Documents
    access = 0;
  } else {
    // Generate 100 Role Documents
    access = roleId;
  }

  // Generate Document Details
  const details = {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    userId: userId,
    access: access,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  // Add to document
  documents.push(details);
};


// Generate Roles
const roles = [
  {
    title: 'SuperAdmin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// Add to the Database
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', users)
      .then(() => queryInterface.bulkInsert('Documents', documents))
        .then(() => queryInterface.bulkInsert('Roles', roles));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
      .then(() => queryInterface.bulkDelete('Documents', null, {}))
        .then(() => queryInterface.bulkDelete('Roles', null, {}));
  }
};
// sequelize db:seed --seed ./server/seeders/index.js