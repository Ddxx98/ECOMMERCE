import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const timerRef = useRef(null); 

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  // Function to log in and store the token
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Function to log out (clear token)
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Clear any previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (token) {
      // Set new timer (5min = 300,000ms)
      timerRef.current = setTimeout(() => {
        logout();
        // Optionally, show a toast/snackbar: "Session expired. Please login again."
      }, 5 * 60 * 1000); // 5 minutes
    }
    // Clean up on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [token]);

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
