import React from 'react';
import 'jsdom-global/register';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { AllUsers } from './../../../components/users/AllUsers';

const spySearchUsers = sinon.spy(AllUsers.prototype, 'searchForUsers');
const spyViewAllUsers = sinon.spy(AllUsers.prototype, 'viewAllUsers');
const spyDeleteUser = sinon.spy(AllUsers.prototype, 'deleteUser');
const spyUserAlert = sinon.spy(AllUsers.prototype, 'deleteUserAlert');
const spyPaginate = sinon.spy(AllUsers.prototype, 'onPaginateChange');
const spyComponentProps = sinon.spy(AllUsers.prototype, 'componentWillReceiveProps');

const setup = (all) => {
  const props = {
    all,
    roleId: 1,
    pagination: {
      total: 10,
      currentPage: 2,
      offset: 5,
      limit: 3
    },
    actions: {
      deleteUser: () => {},
      getUsers: () => {},
      getSearchedUsers: () => {}
    }
  };
  return shallow(<AllUsers {...props} />);
};

describe('AllUsers Component', () => {
  const all = {
    users: [
      {
        id: 1,
        name: 'Haruna',
        roleId: 3,
        email: 'haruna@me.com',
      },
      {
        id: 2,
        name: 'Haruna',
        roleId: 3,
        email: 'haruna@you.com',
      }
    ],
    search: {
      data: [
        {
          id: 1,
          name: 'Haruna',
          email: 'haruna@me.com',
        },
        {
          id: 2,
          name: 'Haruna',
          email: 'haruna@you.com',
        }
      ],
    }
  };

  it('should exists', () => {
    const wrapper = setup(all);
    expect(wrapper).toExist();
  });

  it('has a class name of `user__number`', () => {
    const wrapper = setup(all);
    const actual = wrapper.find('.user__number').exists();
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should call componentWillReceiveProps on next props', () => {
    const wrapper = setup(all);
    wrapper.instance().componentWillReceiveProps({ searchItems: ['Search'] });
    sinon.assert.calledOnce(spyComponentProps);
  });

  it('should retrieve all users on pagination', () => {
    const wrapper = setup(all);
    wrapper.instance().onPaginateChange(2);
    sinon.assert.calledOnce(spyPaginate);
  });

  it('should delete existing user', () => {
    const wrapper = setup(all);
    wrapper.instance().deleteUser(true);
    sinon.assert.calledOnce(spyDeleteUser);
  });

  it('should show alert when user delete is called', () => {
    const wrapper = setup(all);
    wrapper.instance().deleteUserAlert(1);
    sinon.assert.calledOnce(spyUserAlert);
  });

  it('should search for Users', () => {
    const wrapper = setup(all);
    wrapper.instance().searchForUsers('username');
    sinon.assert.calledOnce(spySearchUsers);
  });

  it('should view users with `View All Users`', () => {
    const wrapper = setup(all);
    wrapper.instance().viewAllUsers();
    sinon.assert.calledOnce(spyViewAllUsers);
  });
});
