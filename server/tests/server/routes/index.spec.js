const supertest = require('supertest');
const expect = require('expect');
const app = require('./../../../../server');

const request = supertest(app);
describe('Routes: Index', () => {
  describe('GET /api', () => {
    it('returns the API status', (done) => {
      request.get('/api')
        .expect(200)
        .end((err, res) => {
          const expected = { msg: 'Welcome to DMS Api' };
          expect(res.body).toEqual(expected);
          done(err);
        });
    });
  });
});
