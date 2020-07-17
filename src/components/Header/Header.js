import React from 'react';
import { BareLink, Heading } from './HeaderStyled';

const Header = () => {
  return (
    <header>
      <BareLink to="/my">
        <Heading>Pentry</Heading>
      </BareLink>
    </header>
  )
}

export default Header;