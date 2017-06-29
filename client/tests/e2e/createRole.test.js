const faker = require('faker');

const title = faker.lorem.word();
module.exports = {
  'User cannot create role without title': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123456')
      .click('#loginbutton')
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/all-roles"]', 5000)
      .click('a[href="/all-roles"]')
      .waitForElementVisible('input[id="title"]', 2000)
      .setValue('input[name="title"]', '')
      .waitForElementVisible('input[id="title"]', 2000)
      .waitForElementVisible('#createNewRole', 2000)
      .click('#createNewRole')
      .assert.containsText('button[id="createNewRole"]', 'SUBMIT')
      .end();
  },
  'Create role with valid information': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123456')
      .click('#loginbutton')
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/all-roles"]', 5000)
      .click('a[href="/all-roles"]')
      .waitForElementVisible('input[id="title"]', 2000)
      .setValue('input[name="title"]', title)
      .waitForElementVisible('#createNewRole', 2000)
      .click('#createNewRole')
      .waitForElementVisible('.toast-success', 5000);
  },
};
