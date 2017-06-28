import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import DashboardCard from './../../../components/common/DashboardCard';

const setup = () => {
  const props = {
    title: 'cardTitle',
    link: 'cardLink',
    details: 'cardDetails',
    class: 'cardClass',
    icon: 'cardIcon'
  };
  return shallow(<DashboardCard {...props} />);
};

describe('Dashboard Card Component', () => {
  const wrapper = setup();
  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('should have a Col Component', () => {
    const actual = wrapper.find('Col').length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('should have a link item', () => {
    const actual = wrapper.find('Link').length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('should have a title of cardTitle', () => {
    const actual = wrapper.find('.dashboard__title').text();
    const expected = 'cardTitle';
    expect(actual).toEqual(expected);
  });
});

