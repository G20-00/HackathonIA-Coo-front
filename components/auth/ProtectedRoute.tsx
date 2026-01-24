/**
 * ProtectedRoute Component
 * Protege rutas que requieren autenticación
 * Redirige al login si el usuario no está autenticado
 * Redirige a la tienda si el usuario no tiene el rol requerido
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // Opcional: requiere un rol específico
  redirectTo?: string; // Ruta a redirigir si no tiene el rol (default: /dashboard/tienda)
}

export default function ProtectedRoute({ children, requiredRole, redirectTo = '/dashboard/tienda' }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Obtener el rol del usuario (soporta ambos formatos: role y rol)
  const getUserRole = () => user?.role || user?.rol || null;

  useEffect(() => {
    // Si ya terminó de cargar y no está autenticado, redirigir al login
    if (!loading && !isAuthenticated) {
      router.push('/');
      return;
    }

    // Si requiere un rol específico y el usuario no lo tiene, redirigir
    if (!loading && isAuthenticated && user && requiredRole && getUserRole() !== requiredRole) {
      router.push(redirectTo);
      return;
    }
  }, [isAuthenticated, loading, user, requiredRole, redirectTo, router]);

  // Mostrar loading mientras verifica la autenticación
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-slate-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // No mostrar nada si no está autenticado (evita flash de contenido)
  if (!isAuthenticated) {
    return null;
  }

  // No mostrar nada si requiere un rol que no tiene (se redirigirá en useEffect)
  if (requiredRole && getUserRole() !== requiredRole) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-slate-600">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  // Usuario autenticado y con el rol correcto (si es requerido)
  return <>{children}</>;
}
