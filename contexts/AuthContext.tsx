/**
 * Contexto de Autenticación
 * Proporciona el estado global de autenticación a toda la aplicación
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, login as loginService, logout as logoutService, getUser, register as registerService, RegisterData } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Marcar como montado y cargar usuario desde localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const currentUser = getUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginService(email, password);
    setUser(response.user);
  };

  const register = async (userData: RegisterData) => {
    const response = await registerService(userData);
    setUser(response.user);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  // Evitar renderizar contenido dependiente de auth hasta estar montado
  // Esto previene errores de hidratación
  const value = {
    user,
    loading: !mounted || loading,
    login,
    register,
    logout,
    isAuthenticated: mounted && user !== null,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
