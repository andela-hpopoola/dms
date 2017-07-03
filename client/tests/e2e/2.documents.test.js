const faker = require('faker');

const title = faker.lorem.sentence();
const content = faker.lorem.paragraph();
const adminEmail = 'mark@mark.com';
const adminPassword = '123456';

module.exports = {
  'User cannot create document with no information': (browser) => {
    browser
      .maximizeWindow()
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', adminEmail)
      .setValue('input[name=password]', adminPassword)
      .click('#loginbutton')
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/new-document"]', 5000)
      .click('a[href="/new-document"]')
      .waitForElementVisible('input[id="title"]', 2000)
      .setValue('input[name="title"]', '')
      .waitForElementVisible('.fr-element.fr-view', 5000)
      .click('.fr-element.fr-view')
      .setValue('.fr-element.fr-view', '')
      .waitForElementVisible('input[id="title"]', 2000)
      .waitForElementVisible('#createNewDocument', 2000)
      .click('#createNewDocument')
      .pause(2000)
      .assert.containsText('h4.new__document', 'New Document');
  },
  'Create document with valid information': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/new-document"]', 5000)
      .click('a[href="/new-document"]')
      .waitForElementVisible('input[id="title"]', 2000)
      .setValue('input[name="title"]', title)
      .waitForElementVisible('.fr-element.fr-view', 5000)
      .click('.fr-element.fr-view')
      .setValue('.fr-element.fr-view', content)
      .waitForElementVisible('input[id="title"]', 2000)
      .waitForElementVisible('#createNewDocument', 2000)
      .click('#createNewDocument')
      .waitForElementVisible('.toast-success', 5000)
      .assert.containsText('.toast-success', 'Document successfully created')
      .assert.containsText('.document__title', title);
  },
  'Cannot create document with existing information': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="/new-document"]', 5000)
      .click('a[href="/new-document"]')
      .waitForElementVisible('input[id="title"]', 2000)
      .setValue('input[name="title"]', title)
      .waitForElementVisible('.fr-element.fr-view', 5000)
      .click('.fr-element.fr-view')
      .setValue('.fr-element.fr-view', content)
      .waitForElementVisible('input[id="title"]', 2000)
      .waitForElementVisible('#createNewDocument', 2000)
      .click('#createNewDocument')
      .waitForElementVisible('.toast-error', 5000)
      .pause(1000);
  },
  'Read created document': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="document/private"]', 5000)
      .click('a[href="document/private"]')
      .waitForElementVisible('.main-container', 5000)
      .waitForElementVisible('.document__read', 2000)
      .click('.document__read')
      .pause(1000)
      .waitForElementVisible('.document__content', 5000)
      .waitForElementVisible('.btn.modal-action.modal-close', 5000)
      .click('.btn.modal-action.modal-close')
      .pause(1000);
  },
  'Search for created document': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="document/private"]', 5000)
      .click('a[href="document/private"]')
      .waitForElementVisible('.input__search', 5000)
      .setValue('.input__search', title)
      .pause(1000)
      .waitForElementVisible('.btn-search', 2000)
      .click('.btn-search')
      .waitForElementVisible('.main-container', 5000)
      .assert.containsText('span.document__title', title)
      .pause(1000)
      .waitForElementVisible('.input__search', 5000)
      .setValue('.input__search', 'thisdocumentdoesnotexist')
      .pause(1000)
      .waitForElementVisible('.btn-search', 2000)
      .click('.btn-search')
      .waitForElementVisible('.main-container', 5000)
      .assert.containsText('h3.not-found', 'No Document found')
      .pause(1000);
  },
  'Delete created document': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="document/private"]', 5000)
      .click('a[href="document/private"]')
      .waitForElementVisible('.main-container', 5000)
      .waitForElementVisible('.document__delete', 5000)
      .click('.document__delete')
      .pause(1000)
      .waitForElementVisible('button.confirm', 5000)
      .click('button.confirm')
      .pause(1000)
      .waitForElementVisible('.document__title', 5000)
      .waitForElementVisible('.toast-success', 5000)
      .assert.containsText('.toast-success', 'Document deleted successfully')
      .pause(1000);
  },
  'Confirm Document has been deleted': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .waitForElementVisible('a[href="document/private"]', 5000)
      .click('a[href="document/private"]')
      .waitForElementVisible('.main-container', 5000)
      .pause(1000)
      .waitForElementVisible('.document__title', 5000)
      .expect.element('.document__title').to.have.value.not.equals(title);
    browser
      .end();
  },
};
