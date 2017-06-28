import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import RoleList from './../../../components/roles/RoleList';

const setup = (roles) => {
  const props = {
    roles,
    userId: 1,
    onDelete: (() => {}),
    onEdit: (() => {})
  };
  return shallow(<RoleList {...props} />);
};


describe('RoleList Component', () => {
  const roles = [
    { id: 1, title: 'SuperAdmin' },
    { id: 2, title: 'Admin' },
    { id: 3, title: 'User' },
  ];
  const emptyRoles = [];

  it('should exists', () => {
    const wrapper = setup(roles);
    expect(wrapper).toExist();
  });

  it('has a class name of `responsive-table`', () => {
    const wrapper = setup(roles);
    const actual = wrapper.find('.responsive-table').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should display `RoleRow` when roles are given', () => {
    const wrapper = setup(roles);
    const actual = wrapper.find('RoleRow').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should not output `RoleRow` on empty roles', () => {
    const wrapper = setup(emptyRoles);
    const actual = wrapper.find('RoleRow').exists();
    const expected = false;
    expect(actual).toEqual(expected);
  });
});
