import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { Logout } from './../../../components/users/Logout';


const spyComponentWillMount = sinon.spy(Logout.prototype, 'componentWillMount');
describe('Logout Component', () => {
  const setup = () => {
    const props = {
      actions: {
        logout: () => {}
      }
    };
    return shallow(<Logout {...props} />);
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
});

