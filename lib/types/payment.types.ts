export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PSE = 'PSE',
  CASH = 'CASH',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED', // Estado exitoso del backend
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  orderId: number;
  paymentMethod: PaymentMethod; // Backend espera "paymentMethod" no "method"
  cardNumber?: string;
  cardHolderName?: string;
  expiryDate?: string; // Backend espera "expiryDate" no "expirationDate"
  cvv?: string;
}

export interface PaymentResponse {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  message?: string;
  createdAt: string;
}
