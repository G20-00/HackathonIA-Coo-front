import apiClient from './client';
import { Category, CreateCategoryRequest } from '../types/category.types';

export const categoriesApi = {
  /**
   * Obtener todas las categorías
   */
  getAllCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/api/categories');
    return response.data;
  },

  /**
   * Obtener categoría por ID
   */
  getCategoryById: async (id: number): Promise<Category> => {
    const response = await apiClient.get<Category>(`/api/categories/${id}`);
    return response.data;
  },

  /**
   * Crear nueva categoría (Admin)
   */
  createCategory: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<Category>('/api/categories', data);
    return response.data;
  },

  /**
   * Actualizar categoría (Admin)
   */
  updateCategory: async (id: number, data: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.put<Category>(`/api/categories/${id}`, data);
    return response.data;
  },

  /**
   * Eliminar categoría (Admin)
   */
  deleteCategory: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/categories/${id}`);
  },
};
