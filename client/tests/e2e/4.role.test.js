const faker = require('faker');

const title = faker.company.companyName();
module.exports = {
  'User cannot create role without title': (browser) => {
    browser
      .maximizeWindow()
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
      .pause(3000);
  },
  'Create role with valid information': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/all-roles"]', 5000)
      .click('a[href="/all-roles"]')
      .waitForElementVisible('input[id="title"]', 2000)
      .setValue('input[name="title"]', title)
      .waitForElementVisible('#createNewRole', 2000)
      .click('#createNewRole')
      .waitForElementVisible('.toast-success', 5000)
      .assert.containsText('.toast-success', 'Role successfully created')
      .pause(4000);
  },
  'Delete created role': (browser) => {
    browser
      .waitForElementVisible('.role__title', 5000)
      .assert.containsText('.role__title', title)
      .waitForElementVisible('.role__delete', 5000)
      .click('.role__delete')
      .pause(1000)
      .waitForElementVisible('button.confirm', 5000)
      .click('button.confirm')
      .pause(3000)
      .waitForElementVisible('.role__title', 5000)
      .waitForElementVisible('.toast-success', 5000)
      .assert.containsText('.toast-success', 'Role deleted successfully')
      .pause(1000);
  },
  'Confirm Role has been deleted': (browser) => {
    browser
      .waitForElementVisible('.role__title', 5000)
      .pause(1000)
      .waitForElementVisible('.role__title', 5000)
      .expect.element('.role__title').to.have.value.not.equals(title);
    browser
      .end();
  },
};
