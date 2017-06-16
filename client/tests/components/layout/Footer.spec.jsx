import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Footer from './../../../components/layout/Footer';

const setup = () => shallow(<Footer />);

describe('Footer Component', () => {
  const wrapper = setup();

  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('has a class name of `page-footer`', () => {
    const actual = wrapper.find('.page-footer').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('has the copyright', () => {
    const actual = wrapper.find('.footer-copyright').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });
});

