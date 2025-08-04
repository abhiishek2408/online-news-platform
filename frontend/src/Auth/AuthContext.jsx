// src/Auth/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post('https://online-news-platform-backend.onrender.com/api/login', {
        email,
        password,
      });

      const { role, token, user } = res.data;
      setRole(role);
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  // 📝 REGISTER
  const register = async (name, email, password) => {
  try {
    const res = await axios.post('https://online-news-platform-backend.onrender.com/api/register', {
      name,
      email,
      password,
      role: 'user' // assigned internally
    });

    const { role, token, user } = res.data;
    setRole(role);
    setToken(token);
    setUser(user);

    localStorage.setItem('token', token);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Registration failed" };
  }
};


  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
