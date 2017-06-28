import expect from 'expect';
import paginationReducer from './../../reducers/paginationReducer';
import setPagination from './../../actions/paginationActions';
import initialState from './../../reducers/initialState';

describe('Pagination Reducer', () => {
  it('should set pagination with SET_PAGINATION', () => {
    const pagination = { total: 10 };
    const actionType = setPagination(pagination);
    const newState = paginationReducer(initialState.pagination, actionType);
    const expected = newState.total;
    const action = pagination.total;
    expect(action).toEqual(expected);
  });

  it('should return default state when action is not handled', () => {
    const actionType = { type: 'DOES_NOT_EXIST' };
    const expected = paginationReducer(initialState.pagination, actionType);
    const actual = initialState.pagination;
    expect(actual).toEqual(expected);
  });
});
