/**
 * Utilidades para peticiones a la API
 * Incluye automáticamente el token de autenticación en las peticiones
 */

import { getToken } from './auth';

const API_BASE_URL = 'http://localhost:8081/api';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

/**
 * Función fetch mejorada que incluye automáticamente el token de autenticación
 */
export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { requiresAuth = true, headers = {}, ...restOptions } = options;

  const config: RequestInit = {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Agregar token si es requerido
  if (requiresAuth) {
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error en la petición' }));
    throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Peticiones GET
 */
export async function get(endpoint: string, requiresAuth = true) {
  return apiFetch(endpoint, { method: 'GET', requiresAuth });
}

/**
 * Peticiones POST
 */
export async function post(endpoint: string, data: any, requiresAuth = true) {
  return apiFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    requiresAuth,
  });
}

/**
 * Peticiones PUT
 */
export async function put(endpoint: string, data: any, requiresAuth = true) {
  return apiFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    requiresAuth,
  });
}

/**
 * Peticiones DELETE
 */
export async function del(endpoint: string, requiresAuth = true) {
  return apiFetch(endpoint, { method: 'DELETE', requiresAuth });
}
