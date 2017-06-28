import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import NewRole from './../../../components/roles/NewRole';

const spyCreateNewRole = sinon.spy(NewRole.prototype, 'createNewRole');

const setup = () => {
  const props = {
    onSubmit: () => {},
  };
  return shallow(<NewRole {...props} />);
};
const fakeEvent = {
  preventDefault: () => true,
  target: {
    title: {
      value: 'New Role'
    },
  }
};

describe('NewRole Component', () => {
  it('should exists', () => {
    const wrapper = setup();
    expect(wrapper).toExist();
  });

  it('has a class name of .input-field', () => {
    const wrapper = setup();
    const actual = wrapper.find('.input-field').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should create new role with createNewRole', () => {
    const wrapper = setup();
    wrapper.instance().createNewRole(fakeEvent);
    sinon.assert.calledOnce(spyCreateNewRole);
  });
});
