import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebaseStore from '../../utils/firebaseStore';
import ProfileImage from '../ProfileImage';

const UserNav = ({ user }) => {
  const [isOpen, toggleNav] = useState(false);

  const handleLogout = () => {
    firebaseStore.logout();
  }

  return (
    <>
      <ProfileImage handleClick={() => toggleNav(!isOpen)} />
      {isOpen &&
        <>
          Welcome,&nbsp;
          <strong>{user.email}</strong>&nbsp;
          (<Link to="/" onClick={handleLogout}>logout</Link>)
        </>}
    </>
  )
}

export default UserNav;