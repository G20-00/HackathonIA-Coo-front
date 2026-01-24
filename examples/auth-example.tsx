/**
 * Ejemplo de uso de autenticación y API
 * Este archivo muestra cómo usar el hook useAuth y hacer peticiones a la API
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { get } from '@/lib/api';

export default function ExampleAuthUsage() {
  const { user, logout } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ejemplo: Cargar servicios al montar el componente
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      // Esta petición incluye automáticamente el token Bearer
      const data = await get('/servicios');
      setServices(data);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    // Redirigir al login
    window.location.href = '/';
  };

  return (
    <div className="p-4">
      {/* Mostrar información del usuario */}
      {user && (
        <div className="mb-4 rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-bold">Usuario Autenticado</h2>
          <p className="text-sm">Nombre: {user.nombre}</p>
          <p className="text-sm">Email: {user.email}</p>
          <p className="text-sm">Rol: {user.rol}</p>
          <button
            onClick={handleLogout}
            className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Ejemplo de uso de API */}
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="mb-2 text-lg font-bold">Servicios</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <pre className="text-xs">{JSON.stringify(services, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
