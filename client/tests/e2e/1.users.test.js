const faker = require('faker');

const name = faker.name.findName();
const userEmail = faker.internet.email();
const userPassword = faker.internet.password();
const wrongEmail = faker.internet.email();
const wrongPassword = faker.internet.password();
const updatedName = faker.name.findName();
const adminEmail = 'mark@mark.com';
const adminPassword = '123456';

module.exports = {
  'User cannot sign up with no credentials': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=confirmPassword]', '')
      .click('#signUpButton')
      .pause(2000)
      .waitForElementVisible('form', 5000)
      .assert.visible('form')
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up with a wrong email': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', 'Wrong_Email')
      .setValue('input[name=password]', userPassword)
      .setValue('input[name=confirmPassword]', userPassword)
      .click('#signUpButton')
      .pause(2000)
      .waitForElementVisible('h4', 5000)
      .assert.visible('h4')
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up an existing email address': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', adminEmail)
      .setValue('input[name=password]', userPassword)
      .setValue('input[name=confirmPassword]', userPassword)
      .click('#signUpButton')
      .waitForElementVisible('.toast', 5000)
      .assert.visible('.toast')
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up when password is less than 6 characters': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', userEmail)
      .setValue('input[name=password]', '123')
      .setValue('input[name=confirmPassword]', '123')
      .click('#signUpButton')
      .pause(2000)
      .waitForElementVisible('h4', 5000)
      .assert.visible('h4')
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up when password doesnt match': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', userEmail)
      .setValue('input[name=password]', userPassword)
      .setValue('input[name=confirmPassword]', wrongPassword)
      .click('#signUpButton')
      .waitForElementVisible('.toast', 5000)
      .assert.visible('.toast')
      .pause(2000)
      .assert.containsText('h4', 'Signup');
  },
  'User can sign up with valid information': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', userEmail)
      .setValue('input[name=password]', userPassword)
      .setValue('input[name=confirmPassword]', userPassword)
      .click('#signUpButton')
      .waitForElementVisible('.toast', 5000)
      .assert.visible('.toast')
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.visible('h3[id="dashboard"]')
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .pause(2000)
      .end();
  },

  // Login
  'User cannot log in without email and password': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('#loginbutton')
      .waitForElementVisible('form', 5000)
      .assert.visible('form')
      .assert.containsText('h4', 'Login');
  },
  'User cannot sign in with a wrong email': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=email]', wrongEmail)
      .setValue('input[name=password]', userPassword)
      .click('#loginbutton')
      .waitForElementVisible('h4', 5000)
      .waitForElementVisible('.toast-error', 5000)
      .assert.visible('.toast-error')
      .assert.containsText('h4', 'Login');
  },
  'User cannot sign in with a wrong password': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', userEmail)
      .setValue('input[name=password]', wrongPassword)
      .click('#loginbutton')
      .waitForElementVisible('.toast', 5000)
      .assert.visible('.toast')
      .assert.elementPresent('h4', 'Login');
  },
  'User should sign in with the right username and password': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .setValue('input[name=email]', userEmail)
      .setValue('input[name=password]', userPassword)
      .click('#loginbutton')
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.visible('h3[id="dashboard"]')
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .pause(1000);
  },
  'User should be able to update his profile': (browser) => {
    browser
      .url('http://localhost:8000/dashboard')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.visible('h3[id="dashboard"]')
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/edit-profile"]', 5000)
      .assert.visible('a[href="/edit-profile"]')
      .click('a[href="/edit-profile"]')
      .assert.elementPresent('h4', 'Edit Profile')
      .pause(1000)
      .waitForElementVisible('input[name=name]', 5000)
      .clearValue('input[name=name]')
      .pause(1000)
      .setValue('input[name=name]', updatedName)
      .pause(1000)
      .waitForElementVisible('#editProfile', 5000)
      .assert.visible('#editProfile')
      .click('#editProfile')
      .waitForElementVisible('.toast-info', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 2000)
      .assert.visible('h3[id="dashboard"]')
      .pause(1000);
  },
  'User cannot view all users': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/new-document"]', 5000)
      .assert.elementNotPresent('a[href="/all-users"]')
      .pause(1000);
  },
  'User should be able to sign out of application': (browser) => {
    browser
      .url('http://localhost:8000/dashboard')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.visible('h3[id="dashboard"]')
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/logout"]', 5000)
      .assert.visible('a[href="/logout"]')
      .click('a[href="/logout"]')
      .waitForElementVisible('.toast-info', 5000)
      .assert.visible('.toast-info')
      .pause(2000)
      .end();
  },

  'Admin should be able to sign in': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .pause(1000)
      .setValue('input[name=email]', adminEmail)
      .setValue('input[name=password]', adminPassword)
      .click('#loginbutton')
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.visible('h3[id="dashboard"]')
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`);
  },
  'Admin should be able to view all users': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/all-users"]', 5000)
      .assert.visible('a[href="/all-users"]')
      .pause(1000)
      .click('a[href="/all-users"]')
      .waitForElementVisible('h3.user__number', 5000)
      .assert.visible('table.responsive-table')
      .pause(1000);
  },
  'Admin can search for created user': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/all-users"]', 5000)
      .assert.visible('a[href="/all-users"]')
      .pause(1000)
      .click('a[href="/all-users"]')
      .waitForElementVisible('h3.user__number', 5000)
      .waitForElementVisible('#search-users', 5000)
      .setValue('#search-users', userEmail)
      .pause(1000)
      .clearValue('#search-users')
      .waitForElementVisible('#btn-search-users', 2000)
      .click('#btn-search-users')
      .waitForElementVisible('#back-to-users', 5000)
      .pause(2000)
      .click('#back-to-users')
      .waitForElementVisible('h3.user__number', 5000)
      .pause(2000);
  },
  'Admin can delete created user': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/all-users"]', 5000)
      .assert.visible('a[href="/all-users"]')
      .pause(1000)
      .click('a[href="/all-users"]')
      .waitForElementVisible('h3.user__number', 5000)
      .waitForElementVisible('#search-users', 5000)
      .setValue('#search-users', userEmail)
      .pause(1000)
      .waitForElementVisible('#btn-search-users', 2000)
      .click('#btn-search-users')
      .pause(1000)
      .waitForElementVisible('.btn-delete-user', 5000)
      .pause(1000)
      .click('.btn-delete-user')
      .pause(1000)
      .waitForElementVisible('button.confirm', 5000)
      .click('button.confirm')
      .pause(1000)
      .waitForElementVisible('.toast-success', 5000)
      .waitForElementVisible('h3.user__number', 5000)
      .pause(2000);
  },
  'Admin sign out of application': (browser) => {
    browser
      .url('http://localhost:8000/dashboard')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.visible('h3[id="dashboard"]')
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/logout"]', 5000)
      .assert.visible('a[href="/logout"]')
      .click('a[href="/logout"]')
      .waitForElementVisible('.toast-info', 5000)
      .assert.visible('.toast-info')
      .pause(2000)
      .end();
  },
};
