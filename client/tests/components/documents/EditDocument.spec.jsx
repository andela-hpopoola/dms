import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { MOCK_DOCUMENTS } from './../../../../constants';
import { EditDocument } from './../../../components/documents/EditDocument';

const spyForm = sinon.spy(EditDocument.prototype, 'handleFormChange');
const spyModel = sinon.spy(EditDocument.prototype, 'handleModelChange');
const spyUpdate = sinon.spy(EditDocument.prototype, 'updateExistingDocument');
const spyMount = sinon.spy(EditDocument.prototype, 'componentDidMount');

const setup = (currentDocument) => {
  const props = {
    currentDocument,
    roleId: 1,
    params: {
      id: 1
    },
    actions: {
      updateDocument: () => {},
      getDocument: () => {},
    }
  };
  return shallow(<EditDocument {...props} />);
};
const fakeEvent = {
  preventDefault: () => true,
  target: {
    search: {
      value: 'Search'
    }
  }
};

describe('EditDocument Component', () => {
  const currentDocument = MOCK_DOCUMENTS.PRIVATE;
  it('should exists', () => {
    const wrapper = setup(currentDocument);
    expect(wrapper).toExist();
  });

  it('has a class name of `document__list`', () => {
    const wrapper = setup(currentDocument);
    const actual = wrapper.find('.input-field').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('has a class name of `document__list` for public documents', () => {
    currentDocument.access = -1;
    currentDocument.content = 'test';
    const wrapper = setup(currentDocument);
    const actual = wrapper.find('.input-field').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should call handleFormChange when form is edited', () => {
    const wrapper = setup(currentDocument);
    wrapper.instance().handleFormChange(fakeEvent);
    sinon.assert.calledOnce(spyForm);
  });

  it('should call handleModelChange when textarea is updated', () => {
    const wrapper = setup(currentDocument);
    wrapper.instance().handleModelChange('content');
    sinon.assert.calledOnce(spyModel);
  });

  it('should update existing document', () => {
    const wrapper = setup(currentDocument);
    wrapper.instance().updateExistingDocument(fakeEvent);
    sinon.assert.calledOnce(spyUpdate);
  });

  it('should update existing document', () => {
    const wrapper = setup(currentDocument);
    wrapper.instance().componentDidMount();
    sinon.assert.calledOnce(spyMount);
  });
});
