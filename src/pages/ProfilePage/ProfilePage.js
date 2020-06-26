import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import ProfilePictureUpload from '../../components/ProfilePictureUpload';

const ProfilePage = () => {
  const user = useContext(UserContext);
  
  return (
    <>
      <h2>Profile Page</h2>
      {user.authUser && 
        <>
          <p>{user.authUser.email}</p>
          <ProfilePictureUpload />
        </>}

    </>
  )
}

export default ProfilePage;