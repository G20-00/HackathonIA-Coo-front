import apiClient from './client';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types/auth.types';

export const authApi = {
  /**
   * Registrar un nuevo usuario
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/register', data);
    return response.data;
  },

  /**
   * Iniciar sesión
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', data);
    return response.data;
  },
};
