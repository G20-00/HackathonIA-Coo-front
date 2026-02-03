export enum ServiceType {
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  type: ServiceType;
  available: boolean;
  categoryId: number;
  allianceId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  type: ServiceType;
  available: boolean;
  categoryId: number;
  allianceId?: number;
}
