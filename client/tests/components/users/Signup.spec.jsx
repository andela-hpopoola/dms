import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { Signup } from './../../../components/users/Signup';

const spyComponentWillMount = sinon.spy(Signup.prototype, 'componentWillMount');
const spyCreateUser = sinon.spy(Signup.prototype, 'createUser');

describe('Signup Component', () => {
  const setup = () => {
    const props = {
      actions: {
        signup: () => {}
      }
    };
    return shallow(<Signup {...props} />);
  };
  const fakeEvent = {
    preventDefault: () => true,
    target: {
      name: {
        value: 'Haruna'
      },
      email: {
        value: 'haruna@dms.com'
      },
      password: {
        value: '123456'
      },
      confirmPassword: {
        value: '123456'
      },
    }
  };
  const wrapper = setup();

  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('should be a div item', () => {
    const actual = wrapper.type();
    const expected = 'div';
    expect(actual).toEqual(expected);
  });

  it('has a class name of `container`', () => {
    const actual = wrapper.find('.container').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should call componentWillMount when mounted', () => {
    sinon.assert.calledOnce(spyComponentWillMount);
  });

  it('should create user on `createUser`', () => {
    wrapper.instance().createUser(fakeEvent);
    sinon.assert.calledOnce(spyCreateUser);
  });
});

