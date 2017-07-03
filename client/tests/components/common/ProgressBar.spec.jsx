import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { ProgressBar } from './../../../components/common/ProgressBar';

const setup = (showProgressBar) => {
  const props = {
    showProgressBar
  };
  return shallow(<ProgressBar {...props} />);
};

describe('ProgressBar Component', () => {
  describe('when active', () => {
    const wrapper = setup(true);

    it('should exists', () => {
      expect(wrapper).toExist();
    });

    it('has a class name of `progressBarContainer`', () => {
      const actual = wrapper.find('.progressBarContainer').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('has the active progressbar classname', () => {
      const actual = wrapper.find('.progress').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });

  describe('when inactive', () => {
    const wrapper = setup(false);

    it('has the active progressbar classname', () => {
      const actual = wrapper.find('.progress').exists();
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });
});
