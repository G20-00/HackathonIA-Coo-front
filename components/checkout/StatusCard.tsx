// components/checkout/StatusCard.tsx
// Component: Order and payment status tracking

import React from 'react';

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'expired';
export type TransactionStatus = 'idle' | 'pending' | 'approved' | 'declined' | 'error';
export type WebhookStatus = 'waiting' | 'received' | 'processed' | 'failed';

export interface StatusData {
  orderStatus: OrderStatus;
  transactionStatus: TransactionStatus;
  webhookStatus: WebhookStatus;
  lastUpdated?: Date;
}

interface StatusCardProps {
  status: StatusData;
}

/**
 * StatusCard
 * 
 * Displays real-time status of order, transaction, and webhook.
 * Shows suggested actions when status requires user intervention.
 */
const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  // Order status config
  const orderStatusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
    pending: { label: 'Pendiente', color: 'text-yellow-700', bg: 'bg-yellow-100' },
    processing: { label: 'Procesando', color: 'text-blue-700', bg: 'bg-blue-100' },
    completed: { label: 'Completada', color: 'text-green-700', bg: 'bg-green-100' },
    failed: { label: 'Fallida', color: 'text-red-700', bg: 'bg-red-100' },
    expired: { label: 'Expirada', color: 'text-slate-700', bg: 'bg-slate-100' },
  };

  // Transaction status config
  const transactionStatusConfig: Record<TransactionStatus, { label: string; color: string; bg: string }> = {
    idle: { label: 'Sin iniciar', color: 'text-slate-700', bg: 'bg-slate-100' },
    pending: { label: 'Pendiente', color: 'text-yellow-700', bg: 'bg-yellow-100' },
    approved: { label: 'Aprobada', color: 'text-green-700', bg: 'bg-green-100' },
    declined: { label: 'Rechazada', color: 'text-red-700', bg: 'bg-red-100' },
    error: { label: 'Error', color: 'text-orange-700', bg: 'bg-orange-100' },
  };

  // Webhook status config
  const webhookStatusConfig: Record<WebhookStatus, { label: string; color: string; bg: string }> = {
    waiting: { label: 'Esperando', color: 'text-slate-700', bg: 'bg-slate-100' },
    received: { label: 'Recibido', color: 'text-blue-700', bg: 'bg-blue-100' },
    processed: { label: 'Procesado', color: 'text-green-700', bg: 'bg-green-100' },
    failed: { label: 'Fallido', color: 'text-red-700', bg: 'bg-red-100' },
  };

  const orderConfig = orderStatusConfig[status.orderStatus];
  const transactionConfig = transactionStatusConfig[status.transactionStatus];
  const webhookConfig = webhookStatusConfig[status.webhookStatus];

  // Determine suggested action
  const getSuggestedAction = (): { show: boolean; message: string; action: string } | null => {
    if (status.orderStatus === 'expired') {
      return {
        show: true,
        message: 'Tu orden ha expirado. Inicia una nueva orden para continuar.',
        action: 'Crear nueva orden',
      };
    }
    if (status.transactionStatus === 'declined') {
      return {
        show: true,
        message: 'La transacción fue rechazada. Verifica tus datos de pago e intenta nuevamente.',
        action: 'Reintentar pago',
      };
    }
    if (status.transactionStatus === 'error') {
      return {
        show: true,
        message: 'Ocurrió un error procesando el pago. Contáctanos si el problema persiste.',
        action: 'Contactar soporte',
      };
    }
    return null;
  };

  const suggestedAction = getSuggestedAction();

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Estado de la orden
      </h2>

      <div className="space-y-4">
        {/* Order status */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Estado de orden
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${orderConfig.bg} ${orderConfig.color}`}>
              {orderConfig.label}
            </span>
          </div>
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                status.orderStatus === 'completed' ? 'bg-green-500 w-full' :
                status.orderStatus === 'processing' ? 'bg-blue-500 w-2/3' :
                status.orderStatus === 'failed' || status.orderStatus === 'expired' ? 'bg-red-500 w-1/3' :
                'bg-yellow-500 w-1/3'
              }`}
            />
          </div>
        </div>

        {/* Transaction status */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Transacción Bold
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${transactionConfig.bg} ${transactionConfig.color}`}>
              {transactionConfig.label}
            </span>
          </div>
        </div>

        {/* Webhook status */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Webhook
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${webhookConfig.bg} ${webhookConfig.color}`}>
              {webhookConfig.label}
            </span>
          </div>
        </div>

        {/* Last updated */}
        {status.lastUpdated && (
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-600">
              Última actualización: {status.lastUpdated.toLocaleString('es-CO', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        )}
      </div>

      {/* Suggested action */}
      {suggestedAction?.show && (
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-900 mb-2">
            {suggestedAction.message}
          </p>
          <button className="text-sm font-medium text-orange-600 hover:text-orange-700 underline">
            {suggestedAction.action}
          </button>
        </div>
      )}

      {/* Technical info */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <details className="text-xs">
          <summary className="cursor-pointer text-slate-600 font-medium mb-2">
            ℹ️ Información técnica
          </summary>
          <div className="space-y-2 text-slate-600 bg-slate-50 p-3 rounded">
            <p>
              <strong>Idempotency Key:</strong> Cada transacción usa una clave única para prevenir duplicados.
            </p>
            <p>
              <strong>Webhook:</strong> Bold notifica el estado del pago de forma asíncrona y segura.
            </p>
            <p>
              <strong>Retry Logic:</strong> En caso de fallo temporal, reintentamos automáticamente.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default StatusCard;
