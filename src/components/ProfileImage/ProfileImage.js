import React, { useContext} from 'react';
import { UserContext } from '../../context/UserProvider';
import { ProfileBtn, ProfileDefault, ProfileImg } from './ProfileImageStyled';

const ProfileImage = ({ handleClick }) => {
  const user = useContext(UserContext);
  
  return (
    <ProfileBtn onClick={handleClick}>
      {user.userDetails.avatar
        ? <ProfileImg src={user.userDetails.avatar} />
        : <ProfileDefault />}
    </ProfileBtn>
  )
}

export default ProfileImage;