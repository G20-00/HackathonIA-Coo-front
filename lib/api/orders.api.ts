import apiClient from './client';
import { OrderResponse, CreateOrderRequest, OrderStatus } from '../types/order.types';

/**
 * Normaliza la respuesta del backend para compatibilidad con el frontend
 * El backend devuelve "totalAmount" pero el código usa "total"
 */
const normalizeOrderResponse = (order: OrderResponse): OrderResponse => {
  return {
    ...order,
    total: order.totalAmount, // Crear alias "total" desde "totalAmount"
    userId: 0, // El backend no devuelve userId, usar 0 como placeholder
  };
};

export const ordersApi = {
  /**
   * Obtener todas las órdenes (Admin)
   */
  getAllOrders: async (): Promise<OrderResponse[]> => {
    const response = await apiClient.get<OrderResponse[]>('/api/orders');
    return response.data.map(normalizeOrderResponse);
  },

  /**
   * Obtener órdenes del usuario actual
   */
  getMyOrders: async (): Promise<OrderResponse[]> => {
    const response = await apiClient.get<OrderResponse[]>('/api/orders/my-orders');
    return response.data.map(normalizeOrderResponse);
  },

  /**
   * Obtener orden por ID
   */
  getOrderById: async (id: number): Promise<OrderResponse> => {
    const response = await apiClient.get<OrderResponse>(`/api/orders/${id}`);
    return normalizeOrderResponse(response.data);
  },

  /**
   * Crear nueva orden
   */
  createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
    const response = await apiClient.post<OrderResponse>('/api/orders', data);
    return normalizeOrderResponse(response.data);
  },

  /**
   * Actualizar estado de orden (Admin)
   */
  updateOrderStatus: async (id: number, status: OrderStatus): Promise<OrderResponse> => {
    const response = await apiClient.patch<OrderResponse>(`/api/orders/${id}/status`, null, {
      params: { status },
    });
    return normalizeOrderResponse(response.data);
  },
};
