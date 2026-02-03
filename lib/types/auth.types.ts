export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Respuesta real del backend
export interface AuthResponseBackend {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

// Mantener para compatibilidad
export interface AuthResponse {
  token: string;
  user?: User; // Opcional porque el backend no lo envía en este formato
  // Campos adicionales del backend
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}
