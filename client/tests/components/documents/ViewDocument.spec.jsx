import React from 'react';
import 'jsdom-global/register';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { MOCK_DOCUMENTS } from './../../../../constants';
import { ViewDocuments } from './../../../components/documents/ViewDocuments';

const spyDelete = sinon.spy(ViewDocuments.prototype, 'deleteDocument');
const spyDocumentAlert = sinon.spy(ViewDocuments.prototype, 'deleteDocumentAlert');
const spyPaginate = sinon.spy(ViewDocuments.prototype, 'onPaginateChange');
const spyComponentProps = sinon.spy(ViewDocuments.prototype, 'componentWillReceiveProps');

const setup = (documents) => {
  const props = {
    documents,
    params: {
      id: 1,
      access: '1'
    },
    user: {
      id: 1
    },
    actions: {
      deleteDocument: () => {},
      getDocuments: () => {},
    },
    location: {
      query: { q: 'none' }
    }
  };
  return shallow(<ViewDocuments {...props} />);
};

describe('ViewDocuments Component', () => {
  const documents = {
    current: {
      pagination: {
        totalPage: 10,
        currentPage: 1,
        total: 200,
      },
      data: [MOCK_DOCUMENTS.PRIVATE, MOCK_DOCUMENTS.PUBLIC],
    }
  };

  it('should exists', () => {
    const wrapper = setup(documents);
    expect(wrapper).toExist();
  });

  it('has a class name of `document__number`', () => {
    const wrapper = setup(documents);
    const actual = wrapper.find('.document__number').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should show DocumentList', () => {
    const wrapper = setup(documents);
    const actual = wrapper.find('DocumentList').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should call componentWillReceiveProps on next props', () => {
    const wrapper = setup(documents);
    wrapper.instance().componentWillReceiveProps({ params: { access: 1 }, location: { query: { q: 'query' } } });
    sinon.assert.calledOnce(spyComponentProps);
  });

  it('should retrieve documents on pagination', () => {
    const wrapper = setup(documents);
    wrapper.instance().onPaginateChange(2);
    sinon.assert.calledOnce(spyPaginate);
  });

  it('should delete existing document', () => {
    const wrapper = setup(documents);
    wrapper.instance().deleteDocument(true);
    sinon.assert.calledOnce(spyDelete);
  });

  it('should show alert when document delete is called', () => {
    const wrapper = setup(documents);
    wrapper.instance().deleteDocumentAlert(1);
    sinon.assert.calledOnce(spyDocumentAlert);
  });
});
