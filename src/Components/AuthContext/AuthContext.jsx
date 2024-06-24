// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () =>  useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!sessionStorage.getItem('authToken')
      );
    
      useEffect(() => {
        const handleStorageChange = () => {
          setIsAuthenticated(!!sessionStorage.getItem('authorizationToken'));
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);
    
      const login = (token) => {
        sessionStorage.setItem('authorizationToken', token);
        setIsAuthenticated(true);
      };
    
      const logout = () => {
        sessionStorage.removeItem('authorizationToken');
        setIsAuthenticated(false);
      };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
