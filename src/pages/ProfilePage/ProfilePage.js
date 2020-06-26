import React, { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';

const ProfilePage = () => {
  const user = useContext(UserContext);
  
  return (
    <>
      <h1>Profile Page</h1>
      {user.authUser && <p>{user.authUser.email}</p>}
    </>
  )
}

export default ProfilePage;