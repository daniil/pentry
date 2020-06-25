import React from 'react';
import { ProfileBtn, ProfileDefault } from './ProfileImageStyled';

const ProfileImage = ({ handleClick }) => {
  return (
    <ProfileBtn onClick={handleClick}>
      <ProfileDefault />
    </ProfileBtn>
  )
}

export default ProfileImage;