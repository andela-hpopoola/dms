import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Main from './../../../components/common/Main';

describe('Main Component', () => {
  const wrapper = shallow(<Main />);

  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('should be a div item', () => {
    const actual = wrapper.type();
    const expected = 'div';
    expect(actual).toEqual(expected);
  });

  it('has a class name of `main`', () => {
    const actual = wrapper.node.props.className.includes('main');
    const expected = true;
    expect(actual).toEqual(expected);
  });
});

