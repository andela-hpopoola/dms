import React from 'react';
import 'jsdom-global/register';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { MOCK_ROLES } from './../../../../constants';
import { AllRoles } from './../../../components/roles/AllRoles';

const spyNewRole = sinon.spy(AllRoles.prototype, 'createNewRole');
const spyRoleAlert = sinon.spy(AllRoles.prototype, 'deleteRoleAlert');
const spyDelete = sinon.spy(AllRoles.prototype, 'deleteRole');

const setup = (all) => {
  const props = {
    all,
    actions: {
      createRole: () => {},
      deleteRole: () => {},
      getRoles: () => {},
    },
  };
  return shallow(<AllRoles {...props} />);
};

describe('AllRoles Component', () => {
  const all = {
    roles: [MOCK_ROLES.SUPERADMIN, MOCK_ROLES.ADMIN]
  };

  it('should exists', () => {
    const wrapper = setup(all);
    expect(wrapper).toExist();
  });

  it('has a class name of `document__number`', () => {
    const wrapper = setup(all);
    const actual = wrapper.find('.document__number').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should contain NewRole', () => {
    const wrapper = setup(all);
    const actual = wrapper.find('NewRole').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should retrieve all on pagination', () => {
    const wrapper = setup(all);
    wrapper.instance().createNewRole(2);
    sinon.assert.calledOnce(spyNewRole);
  });

  it('should delete existing role', () => {
    const wrapper = setup(all);
    wrapper.instance().deleteRole(true);
    sinon.assert.calledOnce(spyDelete);
  });

  it('should show alert when role delete is called', () => {
    const wrapper = setup(all);
    wrapper.instance().deleteRoleAlert(1);
    sinon.assert.calledOnce(spyRoleAlert);
  });
});
