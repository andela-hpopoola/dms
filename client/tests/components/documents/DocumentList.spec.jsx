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
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];
  const emptyDocuments = [];

  it('should exists', () => {
    const wrapper = setup(documents);
    expect(wrapper).toExist();
  });

  it('has a class name of `document__list`', () => {
    const wrapper = setup(documents);
    const actual = wrapper.find('.document__list').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should output `No Document found` with empty document', () => {
    const wrapper = setup(emptyDocuments);
    const actual = wrapper.find('.not-found').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
