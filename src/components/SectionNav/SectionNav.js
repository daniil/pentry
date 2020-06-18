import React from 'react';
import { NavList, NavListItem, NavItem } from './SectionNavStyled';

const SectionNav = ({ path }) => {
  return (
    <nav>
      <NavList>
        <NavListItem>
          <NavItem to={`${path}`} exact>Inked Pens</NavItem>
        </NavListItem>
        <NavListItem>
          <NavItem to={`${path}/inks`}>Inks</NavItem>
        </NavListItem>
        <NavListItem>
          <NavItem to={`${path}/pens`}>Pens</NavItem>
        </NavListItem>
      </NavList>
    </nav>
  )
}

export default SectionNav;