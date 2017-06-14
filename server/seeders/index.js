/* eslint-disable */
'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync();
const encryptedPassword = bcrypt.hashSync('123456', salt);

let users = [{
    name: 'Haruna Popoola',
    email: 'mark@mark.com',
    password: encryptedPassword,
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }];

for (var i = 0; i < 30; i++) {
  let roleId;
  if (i < 3) {
    roleId = 1;
  } else if (i < 10) {
    roleId = 2;
  } else {
    roleId = 3;
  }
  const details = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: encryptedPassword,
    roleId: roleId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  users.push(details);
};

let documents = [];

for (var i = 0; i < 300; i++) {
  let access;
  //generate a random user Id
  const userId = Math.floor(Math.random() * 30) + 1; 
  const roleId = Math.floor(Math.random() * 3) + 1; 
  if (i < 100) {
    access = -1;
  } else if (i < 200) {
    access = 0;
  } else {
    access = roleId;
  }
  const details = {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    userId: userId,
    access: access,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  documents.push(details);
};

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
console.log(documents);

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