'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/lib/hooks/useToast';
import { ordersApi } from '@/lib/api';
import { OrderResponse } from '@/lib/types';

export default function OrdenesPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const toast = useToast();

  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (authLoading || redirecting) return; // Esperar a que termine de cargar auth

    if (!isAuthenticated) {
      setRedirecting(true);
      toast.error('Debes iniciar sesión para ver tus órdenes');
      router.push('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await ordersApi.getMyOrders();
        setOrders(data);
      } catch (err: any) {
        console.error('Error al cargar órdenes:', err);
        const errorMessage = err?.response?.data?.message || 'Error al cargar las órdenes';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, authLoading, router, redirecting]);

  // Mostrar loading mientras se redirige
  if (authLoading || (!authLoading && !isAuthenticated)) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-slate-600">
            {authLoading ? 'Cargando...' : 'Redirigiendo...'}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'PROCESSING':
        return 'info';
      case 'FAILED':
      case 'CANCELLED':
        return 'error';
      case 'REFUNDED':
        return 'warning';
      default:
        return 'info';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      COMPLETED: 'Completada',
      PENDING: 'Pendiente',
      PROCESSING: 'Procesando',
      FAILED: 'Fallida',
      CANCELLED: 'Cancelada',
      REFUNDED: 'Reembolsada',
    };
    return labels[status] || status;
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Mis Órdenes</h1>
        <p className="mt-1 text-sm text-slate-600">
          Historial completo de tus compras
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-slate-600">Cargando órdenes...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Sin órdenes */}
      {!loading && !error && orders.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-16">
          <svg className="mb-4 h-16 w-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            No tienes órdenes todavía
          </h3>
          <p className="mb-4 text-sm text-slate-600">
            Comienza a comprar servicios para ver tu historial aquí
          </p>
          <button
            onClick={() => router.push('/dashboard/tienda')}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Ir a la tienda
          </button>
        </div>
      )}

      {/* Lista de órdenes */}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/dashboard/ordenes/${order.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Orden #{order.id}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {new Date(order.createdAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <StatusBadge
                  label={getStatusLabel(order.status)}
                  variant={getStatusVariant(order.status) as any}
                />
              </div>

              {/* Items */}
              <div className="mb-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-700">
                      {item.serviceName} × {item.quantity}
                    </span>
                    <span className="font-medium text-slate-900">
                      ${item.subtotal.toLocaleString('es-CO')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-base font-semibold text-slate-900">Total</span>
                <span className="text-xl font-bold text-blue-600">
                  ${(order.total || order.totalAmount || 0).toLocaleString('es-CO')}
                </span>
              </div>

              {/* Ver detalles */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/ordenes/${order.id}`);
                  }}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Ver detalles →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
