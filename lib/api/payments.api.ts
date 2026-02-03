import apiClient from './client';
import { PaymentRequest, PaymentResponse } from '../types/payment.types';

export const paymentsApi = {
  /**
   * Procesar pago (Sandbox mode)
   */
  processPayment: async (data: PaymentRequest): Promise<PaymentResponse> => {
    const response = await apiClient.post<PaymentResponse>('/api/payments/process', data);
    return response.data;
  },

  /**
   * Obtener pago por ID de orden
   */
  getPaymentByOrderId: async (orderId: number): Promise<PaymentResponse> => {
    const response = await apiClient.get<PaymentResponse>(`/api/payments/order/${orderId}`);
    return response.data;
  },

  /**
   * Obtener pago por ID
   */
  getPaymentById: async (id: number): Promise<PaymentResponse> => {
    const response = await apiClient.get<PaymentResponse>(`/api/payments/${id}`);
    return response.data;
  },
};
