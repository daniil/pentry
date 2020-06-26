import React from 'react';
import { Link } from 'react-router-dom';
import firebaseStore from '../../utils/firebaseStore';

const ProfilePopover = ({ user }) => {
  const handleLogout = () => {
    firebaseStore.logout();
  }

  return (
    <ul>
      <li>
        <strong>{user.email}</strong>
      </li>
      <li>
        <Link to="/profile">Edit Profile</Link>
      </li>
      <li>
        <Link to="/" onClick={handleLogout}>Logout</Link>
      </li>
    </ul>
  )
}

export default ProfilePopover;