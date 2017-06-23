import expect from 'expect';
import setPagination from '../../actions/paginationActions';
import * as types from './../../actions/actionTypes';

const pagination = '1';
describe('Pagination Actions', () => {
  describe('Set Pagination', () => {
    it('should set the current pagiantion', () => {
      const expected = {
        type: types.SET_PAGINATION,
        pagination
      };

      const action = setPagination(pagination);
      expect(action).toEqual(expected);
    });
  });
});
