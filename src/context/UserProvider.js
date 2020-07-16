import React, { useEffect, useState, useCallback } from 'react';
import firebaseStore from '../utils/firebaseStore';

export const UserContext = React.createContext(null);

const initUserDetails = JSON.stringify({
  avatar: null,
  avatarFull: null
});

const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [userDetails, setUserDetails] = useState(initUserDetails);

  const updateAvatar = useCallback(avatarObj => {
    Promise.all([
      firebaseStore.getFileURL(avatarObj.avatar),
      firebaseStore.getFileURL(avatarObj.avatarFull)
    ]).then(([avatar, avatarFull]) => setUserDetails(JSON.stringify({
      ...JSON.parse(userDetails),
      avatar,
      avatarFull,
      updatedTimestamp: avatarObj.updatedTimestamp.seconds
    })));
  }, [userDetails, setUserDetails]);

  useEffect(() => {
    firebaseStore.addAuthListener().then(setAuthUser);
  }, []);

  const userId = authUser && authUser.uid;

  useEffect(() => {
    if (!userId) return;
    firebaseStore
      .getUserDetails(userId)
      .then(updateAvatar)
  }, [userId, updateAvatar]);
  
  return (
    <UserContext.Provider value={{
      authUser,
      userDetails: JSON.parse(userDetails),
      updateAvatar
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;