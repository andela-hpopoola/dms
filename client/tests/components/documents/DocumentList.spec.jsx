import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import DocumentList from './../../../components/documents/DocumentList';

const setup = (documents) => {
  const props = {
    documents,
    userId: 1,
    onDelete: (() => {}),
    onEdit: (() => {})
  };
  return shallow(<DocumentList {...props} />);
};


describe('DocumentList Component', () => {
  const documents = [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
  ];
  const wrapper = setup(documents);

  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('has a class name of `document__list`', () => {
    const actual = wrapper.find('.document__list').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
