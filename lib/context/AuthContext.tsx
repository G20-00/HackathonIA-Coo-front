'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/auth.types';
import { authApi } from '../api/auth.api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

/**
 * Decodifica un JWT y extrae el payload
 * Los JWTs tienen el formato: header.payload.signature
 * El payload está en base64
 */
const decodeJWT = (token: string): any => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token JWT inválido');
    }

    // El payload es la segunda parte (índice 1)
    const payload = parts[1];

    // Decodificar de base64
    const decoded = atob(payload);

    // Parsear JSON
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error al decodificar JWT:', error);
    return null;
  }
};

/**
 * Convierte la respuesta del backend al formato User del frontend
 */
const convertBackendResponseToUser = (response: any): User | null => {
  try {
    // Si la respuesta ya tiene un objeto user, usarlo
    if (response.user) {
      return response.user;
    }

    // Si no, construir el user desde los campos de la respuesta del backend
    if (response.email && response.firstName && response.lastName) {
      const user: User = {
        id: 0, // El backend no devuelve ID en login, usar 0 temporalmente
        email: response.email,
        name: `${response.firstName} ${response.lastName}`,
        role: response.role === 'ADMIN' ? 'ADMIN' : 'USER',
      };

      return user;
    }

    // Último recurso: intentar extraer del JWT
    if (response.token) {
      return extractUserFromToken(response.token);
    }

    return null;
  } catch (error) {
    console.error('Error al convertir respuesta del backend:', error);
    return null;
  }
};

/**
 * Extrae los datos del usuario desde el payload del JWT (fallback)
 */
const extractUserFromToken = (token: string): User | null => {
  const payload = decodeJWT(token);

  if (!payload) {
    return null;
  }

  // El JWT solo tiene 'sub' (email), crear user básico
  try {
    const email = payload.sub || payload.email;
    if (!email) {
      throw new Error('No se encontró email en el JWT');
    }

    const user: User = {
      id: 0,
      email: email,
      name: email.split('@')[0], // Usar parte del email como nombre
      role: payload.role === 'ADMIN' ? 'ADMIN' : 'USER',
    };

    return user;
  } catch (error) {
    console.error('Error al extraer usuario del JWT:', error);
    return null;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario y token desde localStorage al iniciar
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser && storedUser !== 'undefined') {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } else {
        // Limpiar localStorage si hay datos inválidos
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error al cargar datos de autenticación:', error);
      // Limpiar localStorage en caso de error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response: AuthResponse = await authApi.login(data);

      // Convertir la respuesta del backend al formato User
      const userData = convertBackendResponseToUser(response);

      if (!userData) {
        throw new Error('No se pudo obtener información del usuario');
      }

      // Guardar token y usuario en localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));

      setToken(response.token);
      setUser(userData);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response: AuthResponse = await authApi.register(data);

      // Convertir la respuesta del backend al formato User
      const userData = convertBackendResponseToUser(response);

      if (!userData) {
        throw new Error('No se pudo obtener información del usuario');
      }

      // Guardar token y usuario en localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));

      setToken(response.token);
      setUser(userData);
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'ADMIN',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
