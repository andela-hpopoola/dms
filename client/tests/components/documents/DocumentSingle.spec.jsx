import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import DocumentSingle from './../../../components/documents/DocumentSingle';
import { MOCK_DOCUMENTS } from './../../../../constants';

const setup = (document) => {
  const props = {
    document,
    userId: 1,
    onDelete: () => {}
  };
  return shallow(<DocumentSingle {...props} />);
};

describe('DocumentSingle Component', () => {
  describe('normal document', () => {
    it('should exists', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      expect(wrapper).toExist();
    });

    it('should be a div item', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      const actual = wrapper.type();
      const expected = 'div';
      expect(actual).toEqual(expected);
    });

    it('has a classname of document access', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      const actual = wrapper.find('.document__access').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('has a classname of published date', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      const actual = wrapper.find('.document__dated').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('show extracted content', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      const actual = wrapper.find('.document__content').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });

  describe('private document', () => {
    it('has a classname of private', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      const actual = wrapper.find('.private').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('has a delete button for owners document', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      const actual = wrapper.find('.document__delete').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('has a edit link for owners document', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PRIVATE);
      const actual = wrapper.find('.document__edit').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });

  describe('public document', () => {
    it('should exists even with a different user', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PUBLIC);
      expect(wrapper).toExist();
    });

    it('has a classname of public', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PUBLIC);
      const actual = wrapper.find('.public').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('show extracted content', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PUBLIC);
      const actual = wrapper.find('.document__content').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('has no delete button for owners document', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PUBLIC);
      const actual = wrapper.find('.document__delete').exists();
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('has no edit link for owners document', () => {
      const wrapper = setup(MOCK_DOCUMENTS.PUBLIC);
      const actual = wrapper.find('.document__edit').exists();
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });

  describe('role document', () => {
    it('should exists even with a different user', () => {
      const wrapper = setup(MOCK_DOCUMENTS.ROLE);
      expect(wrapper).toExist();
    });

    it('has a classname of role', () => {
      const wrapper = setup(MOCK_DOCUMENTS.ROLE);
      const actual = wrapper.find('.role').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('show extracted content', () => {
      const wrapper = setup(MOCK_DOCUMENTS.ROLE);
      const actual = wrapper.find('.document__content').exists();
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('has no delete button for owners document', () => {
      const wrapper = setup(MOCK_DOCUMENTS.ROLE);
      const actual = wrapper.find('.document__delete').exists();
      const expected = false;
      expect(actual).toEqual(expected);
    });

    it('has no edit link for owners document', () => {
      const wrapper = setup(MOCK_DOCUMENTS.ROLE);
      const actual = wrapper.find('.document__edit').exists();
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });
});
