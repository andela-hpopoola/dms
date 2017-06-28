import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { NewDocument } from './../../../components/documents/NewDocument';


const spyModel = sinon.spy(NewDocument.prototype, 'handleModelChange');
const spyCreateNew = sinon.spy(NewDocument.prototype, 'createNewDocument');

const setup = () => {
  const props = {
    roleId: 1,
    actions: {
      createDocument: () => {},
    }
  };
  return shallow(<NewDocument {...props} />);
};
const fakeEvent = {
  preventDefault: () => true,
  target: {
    title: {
      value: 'New Document'
    },
    access: {
      value: 1
    }
  }
};

describe('NewDocument Component', () => {
  it('should exists', () => {
    const wrapper = setup();
    expect(wrapper).toExist();
  });

  it('has a class name of .input-field', () => {
    const wrapper = setup();
    const actual = wrapper.find('.input-field').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should call handleModelChange when textarea is updated', () => {
    const wrapper = setup();
    wrapper.instance().handleModelChange('content');
    sinon.assert.calledOnce(spyModel);
  });

  it('should call handleModelChange when textarea is updated', () => {
    const wrapper = setup();
    wrapper.setState({ content: 'Sample Content' });
    wrapper.instance().createNewDocument(fakeEvent);
    sinon.assert.calledOnce(spyCreateNew);
  });
});
