import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { Login } from './../../../components/users/Login';

const spyComponentWillReceiveProps = sinon.spy(Login.prototype, 'componentWillReceiveProps');
const spyAuthenticateUser = sinon.spy(Login.prototype, 'authenticateUser');

describe('Login Component', () => {
  const setup = () => {
    const props = {
      userIsLoggedIn: true,
      actions: {
        login: () => {}
      }
    };
    return shallow(<Login {...props} />);
  };
  const fakeEvent = {
    preventDefault: () => true,
    target: {
      email: {
        value: 'haruna@dms.com'
      },
      password: {
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

  it('should call componentWillReceiveProps on next props', () => {
    wrapper.instance().componentWillReceiveProps({ userIsLoggedIn: false });
    sinon.assert.calledOnce(spyComponentWillReceiveProps);
  });

  it('should authenticate user on `authenticateUser`', () => {
    wrapper.instance().authenticateUser(fakeEvent);
    sinon.assert.calledOnce(spyAuthenticateUser);
  });
});

