export interface Alliance {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAllianceRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  active: boolean;
}
