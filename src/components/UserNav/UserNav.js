import React from 'react';
import { Link } from 'react-router-dom';
import firebaseStore from '../../utils/firebaseStore';

const UserNav = ({ user }) => {
  const handleLogout = () => {
    firebaseStore.logout();
  }

  return (
    <p>
      Welcome,&nbsp;
      <strong>{user.email}</strong>&nbsp;
      (<Link to="/" onClick={handleLogout}>logout</Link>)
    </p>
  )
}

export default UserNav;