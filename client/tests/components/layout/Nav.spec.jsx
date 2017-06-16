import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Nav } from './../../../components/layout/Nav';

const setup = (userIsLoggedIn) => {
  const props = {
    userIsLoggedIn
  };
  return shallow(<Nav {...props} />);
};

describe('Nav Component', () => {
  describe('when logged in', () => {
    const wrapper = setup(true);

    it('should exists', () => {
      expect(wrapper).toExist();
    });

    it('has a class name of `navbar-fixed`', () => {
      const actual = wrapper.node.props.className.includes('navbar-fixed');
      const expected = true;
      expect(actual).toEqual(expected);
    });
    it('has the `sign-out` icon', () => {
      const actual = wrapper.find('.fa-sign-out').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });

  describe('when logged out', () => {
    const wrapper = setup(false);

    it('should exists', () => {
      expect(wrapper).toExist();
    });

    it('has a class name of `navbar-fixed`', () => {
      const actual = wrapper.node.props.className.includes('navbar-fixed');
      const expected = true;
      expect(actual).toEqual(expected);
    });
    it('has the `sign up` icon', () => {
      const actual = wrapper.find('.fa-user').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });
});

