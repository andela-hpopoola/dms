import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { Dashboard } from './../../../components/common/Dashboard';

const spyComponentProps = sinon.spy(Dashboard.prototype, 'componentWillReceiveProps');
const setup = () => {
  const props = {
    user: {
      name: 'Haruna',
      email: 'haruna@dms.com',
      roleId: 1,
    },
    documents: {
      private: [],
      public: [],
      role: []
    },
    actions: {
      getDocuments: (() => {}),
      getAllPublicDocuments: (() => {}),
      getAllRoleDocuments: (() => {}),
      getAllPrivateDocuments: (() => {}),
    }
  };
  return shallow(<Dashboard {...props} />);
};

describe('Dashboard Component', () => {
  const wrapper = setup();
  it('should exists', () => {
    expect(wrapper).toExist();
  });

  it('should have the Sidebar Component', () => {
    const actual = wrapper.find('Sidebar').length;
    const expected = 1;
    expect(actual).toEqual(expected);
  });

  it('should call componentWillReceiveProps on next props', () => {
    wrapper.instance().componentWillReceiveProps(
      {
        user: { name: 'Haruna' },
        documents: {
          private: [],
          public: [],
          role: []
        }
      });
    sinon.assert.calledOnce(spyComponentProps);
  });

  it('should have the DashboardCard Component', () => {
    const actual = wrapper.find('DashboardCard').length;
    const expected = 7;
    expect(actual).toEqual(expected);
  });
});

