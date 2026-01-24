/**
 * Servicio de Autenticación
 * Maneja todas las operaciones relacionadas con autenticación
 */

const API_URL = 'http://localhost:8081/api/auth';

export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  // Campos computados para compatibilidad
  nombre?: string;
  rol?: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Realiza el login del usuario
 */
export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error en el login' }));
    throw new Error(error.message || 'Credenciales inválidas');
  }

  const data: LoginResponse = await response.json();
  
  // Construir objeto de usuario con campos adicionales para compatibilidad
  const user: User = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    nombre: `${data.firstName} ${data.lastName}`,
    rol: data.role,
  };

  // Guardar token y usuario en localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  return { token: data.token, user };
}

/**
 * Realiza el registro de un nuevo usuario
 */
export async function register(userData: RegisterData): Promise<{ token: string; user: User }> {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error en el registro' }));
    throw new Error(error.message || 'Error en el registro');
  }

  const data: LoginResponse = await response.json();
  
  // Construir objeto de usuario
  const user: User = {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    nombre: `${data.firstName} ${data.lastName}`,
    rol: data.role,
  };

  // Guardar token y usuario en localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  return { token: data.token, user };
}

/**
 * Cierra la sesión del usuario
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

/**
 * Obtiene el token almacenado
 */
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

/**
 * Obtiene el usuario almacenado
 */
export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return getToken() !== null;
}
