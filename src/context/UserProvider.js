import React, { useEffect, useState } from 'react';
import firebaseStore from '../utils/firebaseStore';

export const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    firebaseStore.addAuthListener().then(setAuthUser);
  }, []);
  
  return (
    <UserContext.Provider value={{ authUser, userDetails }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;