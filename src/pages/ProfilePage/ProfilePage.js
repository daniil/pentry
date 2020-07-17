import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import UserNav from '../../components/UserNav';
import ProfilePictureUpload from '../../components/ProfilePictureUpload';

const ProfilePage = () => {
  const user = useContext(UserContext);
  
  return (
    <main>
      {user.authUser && 
        <>
          <UserNav user={user.authUser} />
          <h2>Profile Page</h2>
          {user.userDetails && user.userDetails.avatar &&
            <img
              key={user.userDetails.updatedTimestamp}
              src={user.userDetails.avatar}
              alt="User Profile" />}
          <p>{user.authUser.email}</p>
          <ProfilePictureUpload
            user={user} />
        </>}

    </main>
  )
}

export default ProfilePage;