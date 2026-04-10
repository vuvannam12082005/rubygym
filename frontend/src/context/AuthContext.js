import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api';

const STORAGE_KEY = 'rubygym_auth';
const AuthContext = createContext(null);

const getStoredAuth = () => {
  const rawAuth = localStorage.getItem(STORAGE_KEY);

  if (!rawAuth) {
    return { token: null, user: null };
  }

  try {
    return JSON.parse(rawAuth);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return { token: null, user: null };
  }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    const nextAuth = { token: data.token, user: data.user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
    setAuth(nextAuth);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth({ token: null, user: null });
  };

  const value = useMemo(() => ({
    token: auth.token,
    user: auth.user,
    isAuthenticated: Boolean(auth.token),
    login,
    register,
    logout
  }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
