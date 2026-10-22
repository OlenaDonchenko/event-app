import { useState, createContext } from 'react';

// this goes everywhere
export const Auth = createContext();
// this goes to app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  return (
    <Auth.Provider
      value={{
        token,
        localUser,
        setToken,
        setLocalUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
