import React from 'react';
import { SideNav, SideNavItem, Button } from 'react-materialize';

/**
 * Sidebar
 * @desc Page Sidebar
 * @param {object} props default properties
 * @returns {jsx} the Sidebar
 */
const Sidebar = () =>
  // const { user} = props;
  (
    <SideNav
      trigger={<Button>SIDE NAV DEMO</Button>}
      options={{ closeOnClick: true }}
    >
      <SideNavItem
        userView
        user={{
          background: 'img/office.jpg',
          image: 'img/yuna.jpg',
          name: 'John Doe',
          email: 'jdandturk@gmail.com'
        }}
      />
      <SideNavItem href="#!icon" icon="cloud">First Link With Icon</SideNavItem>
      <SideNavItem href="#!second">Second Link</SideNavItem>
      <SideNavItem divider />
      <SideNavItem subheader>Subheader</SideNavItem>
      <SideNavItem waves href="#!third">Third Link With Waves</SideNavItem>
    </SideNav>
  );

export default Sidebar;

