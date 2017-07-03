import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { MOCK_ROLES } from './../../../../constants';
import RoleRow from './../../../components/roles/RoleRow';

const setup = (role) => {
  const props = {
    role,
    index: 1
  };
  return shallow(<RoleRow {...props} />);
};

describe('RoleRow Component', () => {
  const role = MOCK_ROLES.SUPERADMIN;

  it('should exists', () => {
    const wrapper = setup(role);
    expect(wrapper).toExist();
  });

  it('has a class name of `role__list`', () => {
    const wrapper = setup(role);
    const actual = wrapper.find('.role__list').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
