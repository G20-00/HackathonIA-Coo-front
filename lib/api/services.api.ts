import apiClient from './client';
import { Service, ServiceType, CreateServiceRequest } from '../types/service.types';

export const servicesApi = {
  /**
   * Obtener todos los servicios
   */
  getAllServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>('/api/services');
    return response.data;
  },

  /**
   * Obtener servicios disponibles
   */
  getAvailableServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>('/api/services/available');
    return response.data;
  },

  /**
   * Obtener servicio por ID
   */
  getServiceById: async (id: number): Promise<Service> => {
    const response = await apiClient.get<Service>(`/api/services/${id}`);
    return response.data;
  },

  /**
   * Obtener servicios por categoría
   */
  getServicesByCategory: async (categoryId: number): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>(`/api/services/category/${categoryId}`);
    return response.data;
  },

  /**
   * Obtener servicios por tipo
   */
  getServicesByType: async (type: ServiceType): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>(`/api/services/type/${type}`);
    return response.data;
  },

  /**
   * Buscar servicios por palabra clave
   */
  searchServices: async (keyword: string): Promise<Service[]> => {
    const response = await apiClient.get<Service[]>('/api/services/search', {
      params: { keyword },
    });
    return response.data;
  },

  /**
   * Crear nuevo servicio (Admin)
   */
  createService: async (data: CreateServiceRequest): Promise<Service> => {
    const response = await apiClient.post<Service>('/api/services', data);
    return response.data;
  },

  /**
   * Actualizar servicio (Admin)
   */
  updateService: async (id: number, data: CreateServiceRequest): Promise<Service> => {
    const response = await apiClient.put<Service>(`/api/services/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar servicio (Admin)
   */
  deleteService: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/services/${id}`);
  },
};
