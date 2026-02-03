'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/lib/hooks/useToast';
import { ordersApi, paymentsApi } from '@/lib/api';
import { OrderResponse, PaymentResponse } from '@/lib/types';

export default function OrdenDetallePage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;
  const { isAuthenticated, loading: authLoading } = useAuth();
  const toast = useToast();

  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
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

    if (!orderId) return;

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);

        // Cargar orden
        const orderData = await ordersApi.getOrderById(parseInt(orderId));
        setOrder(orderData);

        // Intentar cargar información de pago
        try {
          const paymentData = await paymentsApi.getPaymentByOrderId(parseInt(orderId));
          setPayment(paymentData);
        } catch (paymentError) {
          console.log('No se encontró información de pago para esta orden');
        }
      } catch (err: any) {
        console.error('Error al cargar detalles de la orden:', err);
        const errorMessage = err?.response?.data?.message || 'Error al cargar los detalles de la orden';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, isAuthenticated, authLoading, router, redirecting]);

  // Mostrar loading mientras se redirige por no autenticado
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
      COMPLETED: 'Completado',
      PENDING: 'Pendiente',
      PROCESSING: 'Procesando',
      FAILED: 'Fallido',
      CANCELLED: 'Cancelado',
      REFUNDED: 'Reembolsado',
    };
    return labels[status] || status;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      CREDIT_CARD: 'Tarjeta de Crédito',
      DEBIT_CARD: 'Tarjeta de Débito',
      PSE: 'PSE',
      CASH: 'Efectivo',
    };
    return labels[method] || method;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-slate-600">Cargando detalles...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !order) {
    return (
      <DashboardLayout>
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error || 'Orden no encontrada'}</p>
          <button
            onClick={() => router.push('/dashboard/ordenes')}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Volver a mis órdenes
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orden #{order.id}</h1>
          <p className="mt-1 text-sm text-slate-600">
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Detalles de la orden */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items de la orden */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Servicios Contratados
            </h3>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{item.serviceName}</h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Cantidad: {item.quantity} × ${item.price.toLocaleString('es-CO')}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    ${item.subtotal.toLocaleString('es-CO')}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${(order.total || order.totalAmount || 0).toLocaleString('es-CO')}
                </span>
              </div>
            </div>
          </div>

          {/* Información de pago */}
          {payment && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Información de Pago
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Método de pago</span>
                  <span className="font-medium text-slate-900">
                    {getPaymentMethodLabel(payment.method)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Estado del pago</span>
                  <StatusBadge
                    label={getStatusLabel(payment.status)}
                    variant={getStatusVariant(payment.status) as any}
                    size="sm"
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Monto pagado</span>
                  <span className="font-medium text-slate-900">
                    ${payment.amount.toLocaleString('es-CO')}
                  </span>
                </div>

                {payment.transactionId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">ID de transacción</span>
                    <span className="font-mono text-xs text-slate-900">
                      {payment.transactionId}
                    </span>
                  </div>
                )}

                {payment.message && (
                  <div className="mt-4 rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-700">{payment.message}</p>
                  </div>
                )}

                <div className="flex justify-between text-sm pt-3 border-t border-slate-200">
                  <span className="text-slate-600">Fecha de pago</span>
                  <span className="text-xs text-slate-900">
                    {new Date(payment.createdAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel lateral */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Información del cliente */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Información del Cliente
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Cliente</p>
                  <p className="text-sm font-medium text-slate-900">{order.userName}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <p className="text-sm font-medium text-slate-900">{order.userEmail}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-1">Número de Orden</p>
                  <p className="text-sm font-mono text-slate-900">{order.orderNumber}</p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Acciones
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  Imprimir orden
                </button>

                <button
                  onClick={() => toast.info('Función de soporte próximamente')}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  Contactar soporte
                </button>

                <button
                  onClick={() => router.push('/dashboard/ordenes')}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Volver a mis órdenes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
