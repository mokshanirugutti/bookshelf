// UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserContextType } from '@/types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

  // Initialize user and token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(`useeffect ${storedToken}`)
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    }
  }, []);

  // Fetch user profile using the token
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${URL}/auth/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user profile');
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const register = async (formData : FormData) => {
    try {
      const response = await fetch(`${URL}/auth/register`, {
        method: 'POST',
        body: formData,
    });
      if (!response.ok) throw new Error('Registration failed');

      const data: { user: User; token: string } = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data: { user: User; token: string } = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
