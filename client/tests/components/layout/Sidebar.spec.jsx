import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import expect from 'expect';
import Sidebar from './../../../components/layout/Sidebar';

const spy = sinon.spy(Sidebar.prototype, 'searchForDocuments');
const setup = () => shallow(<Sidebar />);

describe('Sidebar Component', () => {
  const wrapper = setup();

  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('has a class name of `top__space`', () => {
    const actual = wrapper.find('.collection-item').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('has the `collection-header` class', () => {
    const actual = wrapper.find('.collection-header').text();
    const expected = 'Quick Links';
    expect(actual).toEqual(expected);
  });

  it('should call searchForDocuments to search for documents', () => {
    wrapper.instance().searchForDocuments();
    sinon.assert.calledOnce(spy);
  });
});

