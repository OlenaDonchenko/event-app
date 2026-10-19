import { createContext } from 'react';

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  return (
    <Auth.Provider
      value={{ x: 'Bashar', y: 'john', z: { name: 'jane', age: 50 } }}
    >
      {children}
    </Auth.Provider>
  );
};
