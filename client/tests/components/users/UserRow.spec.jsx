import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { MOCK_USER } from './../../../../constants';
import UserRow from './../../../components/users/UserRow';

const setup = (user) => {
  const props = {
    user,
    index: 1,
    roleId: 1,
    onDelete: () => {},
  };
  return shallow(<UserRow {...props} />);
};

describe('UserList Component', () => {
  const user = MOCK_USER.SUPERADMIN;

  it('should exists', () => {
    const wrapper = setup(user);
    expect(wrapper).toExist();
  });

  it('has a class name of `user__row`', () => {
    const wrapper = setup(user);
    const actual = wrapper.find('.user__row').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
