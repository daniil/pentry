import React from 'react';
import { NavList, NavListItem, NavItem, activeClassName } from './SectionNavStyled';

const SectionNav = ({ path }) => {
  return (
    <nav>
      <NavList>
        <NavListItem>
          <NavItem to={`${path}`} exact activeClasName={activeClassName}>Inked Pens</NavItem>
        </NavListItem>
        <NavListItem>
          <NavItem to={`${path}/inks`} activeClasName={activeClassName}>Inks</NavItem>
        </NavListItem>
        <NavListItem>
          <NavItem to={`${path}/pens`} activeClasName={activeClassName}>Pens</NavItem>
        </NavListItem>
      </NavList>
    </nav>
  )
}

export default SectionNav;