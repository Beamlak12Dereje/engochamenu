import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi } from '../api/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore token on page load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedAdmin = localStorage.getItem('admin');
    
    if (savedToken && savedAdmin) {
      setToken(savedToken);
      setAdmin(JSON.parse(savedAdmin));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      const { token: newToken, admin: adminData } = response.data;
      
      setToken(newToken);
      setAdmin(adminData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('admin', JSON.stringify(adminData));
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
