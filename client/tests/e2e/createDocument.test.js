const faker = require('faker');

const title = faker.lorem.sentence();
const content = faker.lorem.paragraphs();
module.exports = {
  'User cannot create document with no information': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123456')
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
      .assert.containsText('h4.new__document', 'New Document')
      .end();
  },
  'Create document with valid information': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123456')
      .click('#loginbutton')
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
      .end();
  },
  'Cannot create document with existing information': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123456')
      .click('#loginbutton')
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
      .end();
  },
};
