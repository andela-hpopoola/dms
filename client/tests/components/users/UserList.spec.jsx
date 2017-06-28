import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UserList from './../../../components/users/UserList';

const setup = (users) => {
  const props = {
    users,
    userId: 1,
    onChange: (() => {}),
    onDelete: (() => {})
  };
  return shallow(<UserList {...props} />);
};


describe('UserList Component', () => {
  const users = [
    { id: 1, name: 'Haruna' },
    { id: 2, name: 'Popoola' },
    { id: 3, name: 'Humaidah' },
  ];
  const emptyUsers = [];

  it('should exists', () => {
    const wrapper = setup(users);
    expect(wrapper).toExist();
  });

  it('has a class name of `responsive-table`', () => {
    const wrapper = setup(users);
    const actual = wrapper.find('.responsive-table').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('has a class name of `search__user`', () => {
    const wrapper = setup(users);
    const actual = wrapper.find('.search__user').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should display `UserRow` when users are given', () => {
    const wrapper = setup(users);
    const actual = wrapper.find('UserRow').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should not display `UserRow` when no user is found', () => {
    const wrapper = setup(emptyUsers);
    const actual = wrapper.find('UserRow').exists();
    const expected = false;
    expect(actual).toEqual(expected);
  });
});
