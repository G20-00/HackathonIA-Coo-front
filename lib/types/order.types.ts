export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItem {
  id: number;
  serviceId: number;
  serviceName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  userName: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number; // Backend envía "totalAmount" no "total"
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;

  // Mantener estos para compatibilidad con el código existente
  userId?: number; // Agregado para retrocompatibilidad
  total?: number; // Alias de totalAmount para retrocompatibilidad
}

export interface CreateOrderRequest {
  items: {
    serviceId: number;
    quantity: number;
  }[];
}
