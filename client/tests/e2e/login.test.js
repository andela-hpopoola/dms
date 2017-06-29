module.exports = {
  'User cannot log in without email and password': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('#loginbutton')
      .waitForElementVisible('form', 5000)
      .assert.containsText('h4', 'Login');
  },
  'User cannot sign in with a wrong email': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 3000)
      .setValue('input[name=email]', 'Wrong Email')
      .setValue('input[name=password]', 'Wrong Password')
      .click('#loginbutton')
      .waitForElementVisible('h4', 5000)
      .assert.containsText('h4', 'Login');
  },
  'User cannot sign in with a wrong password': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'haruna@me.com')
      .setValue('input[name=password]', 'wrong_password')
      .click('#loginbutton')
      .waitForElementVisible('.toast', 5000)
      .assert.elementPresent('h4', 'Login');
  },
  'User should sign in with the right username and password': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 5000)
      .click('#loginbutton')
      .setValue('input[name=email]', 'mark@mark.com')
      .setValue('input[name=password]', '123456')
      .click('#loginbutton')
      .waitForElementVisible('h3[id="dashboard"]', 5000)
      .assert.urlEquals(`${'http://localhost:8000/dashboard'}`)
      .end();
  },
};
