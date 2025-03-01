// UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserContextType } from '@/types';
import axios from 'axios'

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
      const response = await axios.post(`${URL}/auth/register`, {
         username : formData.get('username'),
         email : formData.get('email'),
         password : formData.get('password'),
         profilePicture : formData.get('profilePicture')
    },
    {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  }

  );

      const data: { user: User; token: string } = response.data;
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      return { message: response.data.message, status: response.status };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error in register :", error.response.data);
        return { 
          message: error.response.data.message || error.response.data.error || "Register failed", 
          status: error.response.status 
        };
      } else {
        console.error("Network or unknown error:", error);
        return { message: "Network error. Please try again.", status: 500 };
      }
  }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, {
        username,
        password,
      });

      // console.log("Response Data:", response.data);
      // console.log("Status:", response.status);
      // console.log("message:", response.data.message);
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);


      return { message: response.data.message, status: response.status };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error logging in:", error.response.data);
        return { 
          message: error.response.data.message || error.response.data.error || "Login failed", 
          status: error.response.status 
        };
      } else {
        console.error("Network or unknown error:", error);
        return { message: "Network error. Please try again.", status: 500 };
      }
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
