import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("currentUser"))
  // const initialUser = {
  //     "id": 2,
  //     "name": "Ervin Howell",
  //     "username": "Antonette",
  //     "email": "Shanna@melissa.tv",
  //     "phone": "010-692-6593 x09125"
  //   };
  const [user, setUser] = useState(initialUser);
  const setCurrentUser = (user) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user,  setCurrentUser }}> 
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;