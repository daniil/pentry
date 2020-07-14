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
          {user.userDetails && user.userDetails.avatar &&
            <img
              key={user.userDetails.updatedTimestamp}
              src={user.userDetails.avatar}
              alt="User Profile" />}
          <p>{user.authUser.email}</p>
          <ProfilePictureUpload
            user={user} />
        </>}

    </>
  )
}

export default ProfilePage;