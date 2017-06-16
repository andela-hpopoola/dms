import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
// import sinon from 'sinon';
import SearchForm from './../../../components/common/SearchForm';

const setup = () => {
  const props = {
    onChange: (() => { })
  };
  return shallow(<SearchForm {...props} />);
};
// const fakeEvent = {
//   preventDefault: () => true,
//   target: {
//     search: {
//       value: 'Search'
//     }
//   }
// };

describe('SearchForm Component', () => {
  const wrapper = setup();
  // const spyHandleSearch = sinon.spy(SearchForm.prototype, 'handleSearch');

  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('has a class name of `searchForm`', () => {
    const actual = wrapper.find('.searchForm').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('has the text `Search for Documents`', () => {
    const actual = wrapper.find('label').text();
    const expected = 'Search for Documents';
    expect(actual).toEqual(expected);
  });

  // it('call HandleSearch when form is submitted', () => {
  //   wrapper.instance().handleSearch(fakeEvent);
  //   sinon.assert.calledOnce(spyHandleSearch);
  // });
});
    // const wrapper = mount(<ManageCoursePage {...props}/>);
    // const saveButton = wrapper.find('input').last();
    // expect(saveButton.prop('type')).toBe('submit'); //assure we found the submit.
    // saveButton.simulate('click');
    // expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
