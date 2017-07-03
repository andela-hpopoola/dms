import expect from 'expect';
import * as authActions from '../../actions/authActions';
import * as types from './../../actions/actionTypes';

const token = 'sample token';
describe('Auth Actions - ', () => {
  describe('Authenticate User', () => {
    it('should dispatch authenticateUser', () => {
      const dispatch = expect.createSpy();
      const expected = {
        type: types.AUTHENTICATE_USER,
        token
      };

      authActions.authenticateUser(token)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(expected);
    });
  });

  describe('Deauthenticate User', () => {
    it('should deauthenticate a user', () => {
      const expected = {
        type: types.DEAUTHENTICATE_USER
      };

      const action = authActions.deauthenticateUser();
      expect(action).toEqual(expected);
    });
  });

  describe('Unauthorize User', () => {
    it('should call the unauthorized function', () => {
      const expected = 'function';

      const action = authActions.unauthorized();
      expect(action).toBeA(expected);
    });
  });
});
