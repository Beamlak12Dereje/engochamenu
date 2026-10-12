import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi } from '../api/authApi';
import { supabase } from '../lib/supabase';

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

  // Restore session on page load by validating against Supabase
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session && session.user) {
          // Valid session exists on Supabase side
          setToken(session.access_token);
          setAdmin({
            name: session.user.email.split('@')[0],
            email: session.user.email,
          });
        } else {
          // No valid session — clear any stale local data
          localStorage.removeItem('token');
          localStorage.removeItem('admin');
          setToken(null);
          setAdmin(null);
        }
      } catch (error) {
        console.log('Session validation failed, clearing...', error);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        setToken(null);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();

    // Listen for session changes (e.g. token expiry, sign-out from another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        setToken(null);
        setAdmin(null);
      }
    });

    return () => subscription.unsubscribe();
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

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log('Sign out error:', error);
    } finally {
      setToken(null);
      setAdmin(null);
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    }
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
