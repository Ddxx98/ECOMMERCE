import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    // Optional: If you want persistence between reloads, uncomment this line:
    // return localStorage.getItem('token') || null;
    return null;
  });

  // Function to log in and store the token
  const login = (newToken) => {
    setToken(newToken);
    // If using persistence:
    // localStorage.setItem('token', newToken);
  };

  // Function to log out (clear token)
  const logout = () => {
    setToken(null);
    // If using persistence:
    // localStorage.removeItem('token');
  };

  const value = {
    token,
    isLoggedIn: !!token,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
