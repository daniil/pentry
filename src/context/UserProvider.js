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

  const updateAvatar = useCallback(userId => {
    firebaseStore
      .getUserDetails(userId)
      .then(res => {
        Promise.all([
          firebaseStore.getFileURL(res.avatar),
          firebaseStore.getFileURL(res.avatarFull)
        ]).then(([avatar, avatarFull]) => setUserDetails(JSON.stringify({
          ...JSON.parse(userDetails),
          avatar,
          avatarFull,
          updatedTimestamp: res.updatedTimestamp.seconds
        })));
      })
  }, [userDetails, setUserDetails]);

  useEffect(() => {
    firebaseStore.addAuthListener().then(setAuthUser);
  }, []);

  const userId = authUser && authUser.uid;

  useEffect(() => {
    if (!userId) return;
    updateAvatar(userId);
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