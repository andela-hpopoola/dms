import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { EditRole } from './../../../components/roles/EditRole';

const spyForm = sinon.spy(EditRole.prototype, 'handleFormChange');
const spyUpdate = sinon.spy(EditRole.prototype, 'updateExistingRole');
const spyMount = sinon.spy(EditRole.prototype, 'componentDidMount');

const setup = (currentRole) => {
  const props = {
    id: '1',
    currentRole,
    params: {
      id: 1
    },
    actions: {
      getRole: () => {},
    },
    onUpdate: () => {},
  };
  return shallow(<EditRole {...props} />);
};
const fakeEvent = {
  preventDefault: () => true,
  target: {
    value: 'Search'
  }
};

describe('EditRole Component', () => {
  const currentRole = {
    id: 1,
    title: 'SuperAdmin',
  };
  it('should exists', () => {
    const wrapper = setup(currentRole);
    expect(wrapper).toExist();
  });

  it('has a class name of `role__title`', () => {
    const wrapper = setup(currentRole);
    const actual = wrapper.find('.role__title').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('has a class name of `input-field`', () => {
    const wrapper = setup(currentRole);
    const actual = wrapper.find('.input-field').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should call handleFormChange when form is edited', () => {
    const wrapper = setup(currentRole);
    wrapper.instance().handleFormChange(fakeEvent);
    sinon.assert.calledOnce(spyForm);
  });

  it('should update existing role', () => {
    const wrapper = setup(currentRole);
    wrapper.instance().updateExistingRole(fakeEvent);
    sinon.assert.calledOnce(spyUpdate);
  });

  it('should update existing role', () => {
    const wrapper = setup(currentRole);
    wrapper.instance().componentDidMount();
    sinon.assert.calledOnce(spyMount);
  });
});
