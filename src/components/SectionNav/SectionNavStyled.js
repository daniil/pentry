import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavList = styled('ul')`
  display: flex;
`;

const NavListItem = styled('li')`
  margin-right: ${props => props.theme.typeScale[4]}rem;
  
  &:last-child {
    margin-right: 0;
  }
`;

const activeClassName = 'nav-item-active';

const NavItem = styled(NavLink).attrs({
  activeClassName
})`
  font-size: ${props => props.theme.typeScale[4]}rem;
  font-weight: 700;
  text-decoration: none;

  &:link,
  &:visited {
    color: ${props => props.theme.colors.mediumOne};
  }

  &:hover,
  &:focus {
    opacity: 0.75;
  }

  &.${activeClassName} {
    opacity: 0.5;
  }
  
`;

export {
  NavList,
  NavListItem,
  NavItem,
  activeClassName
};