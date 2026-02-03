export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  imageUrl?: string;
}
