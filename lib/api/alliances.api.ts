import apiClient from './client';
import { Alliance, CreateAllianceRequest } from '../types/alliance.types';

export const alliancesApi = {
  /**
   * Obtener todas las alianzas
   */
  getAllAlliances: async (): Promise<Alliance[]> => {
    const response = await apiClient.get<Alliance[]>('/api/alliances');
    return response.data;
  },

  /**
   * Obtener alianzas activas
   */
  getActiveAlliances: async (): Promise<Alliance[]> => {
    const response = await apiClient.get<Alliance[]>('/api/alliances/active');
    return response.data;
  },

  /**
   * Obtener alianza por ID
   */
  getAllianceById: async (id: number): Promise<Alliance> => {
    const response = await apiClient.get<Alliance>(`/api/alliances/${id}`);
    return response.data;
  },

  /**
   * Buscar alianzas por palabra clave
   */
  searchAlliances: async (keyword: string): Promise<Alliance[]> => {
    const response = await apiClient.get<Alliance[]>('/api/alliances/search', {
      params: { keyword },
    });
    return response.data;
  },

  /**
   * Crear nueva alianza (Admin)
   */
  createAlliance: async (data: CreateAllianceRequest): Promise<Alliance> => {
    const response = await apiClient.post<Alliance>('/api/alliances', data);
    return response.data;
  },

  /**
   * Actualizar alianza (Admin)
   */
  updateAlliance: async (id: number, data: CreateAllianceRequest): Promise<Alliance> => {
    const response = await apiClient.put<Alliance>(`/api/alliances/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar alianza (Admin)
   */
  deleteAlliance: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/alliances/${id}`);
  },
};
