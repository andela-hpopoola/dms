const faker = require('faker');

const name = faker.name.findName();
const email = faker.internet.email();
const password = faker.internet.password();

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
      .waitForElementVisible('form', 5000)
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up with a wrong email': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', 'Haruna')
      .setValue('input[name=email]', 'Wrong_Email')
      .setValue('input[name=password]', '123456')
      .setValue('input[name=confirmPassword]', '123456')
      .click('#signUpButton')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up an existing email address': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', 'Haruna')
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123456')
      .setValue('input[name=confirmPassword]', '123456')
      .click('#signUpButton')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up when password is less than 6 characters': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', 'Haruna')
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123')
      .setValue('input[name=confirmPassword]', '123')
      .click('#signUpButton')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'Signup');
  },
  'User cannot sign up when password doesnt match': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=name]', 'Haruna')
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', 'abcdef')
      .setValue('input[name=confirmPassword]', '123456')
      .click('#signUpButton')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('h4', 'Signup');
  },
  'User should sign up with the right information': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', name)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('#signUpButton')
      .waitForElementVisible('h3[id="dashboard"]', 8000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .end();
  },
};
