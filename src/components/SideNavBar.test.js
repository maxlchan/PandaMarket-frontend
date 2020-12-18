import React from 'react';
import { shallow } from 'enzyme';
import SideNavBar from './SideNavBar';
import NavItem from './NavItem';

describe('<CloseButton>', () => {
  const wrapper = shallow(
    <SideNavBar>
      <NavItem to={'/'} name='home' />
      <NavItem to={'/login'} name='login' />
      <NavItem to={'logout'} name='logout' />
    </SideNavBar>
  );

  it('should render child component correctly', () => {
    expect(wrapper.children(NavItem)).toHaveLength(3);
  });
});
