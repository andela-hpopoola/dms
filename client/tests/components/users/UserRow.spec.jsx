import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
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
  const user = { id: 1, name: 'Haruna', createdAt: '2017-05-05' };

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
