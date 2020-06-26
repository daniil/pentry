import React, { useState } from 'react';
import ProfileImage from '../ProfileImage';
import ProfilePopover from '../ProfilePopover';

const UserNav = ({ user }) => {
  const [isOpen, toggleNav] = useState(false);
  
  return (
    <>
      <ProfileImage handleClick={() => toggleNav(!isOpen)} />
      {isOpen && <ProfilePopover user={user} />}
    </>
  )
}

export default UserNav;