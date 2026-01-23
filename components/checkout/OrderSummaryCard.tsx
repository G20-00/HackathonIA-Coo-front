// components/checkout/OrderSummaryCard.tsx
// Component: Order summary card for checkout

import React from 'react';

export interface OrderData {
  serviceName: string;
  planName: string;
  frequency: 'monthly' | 'quarterly' | 'annual';
  price: number;
  discount?: number;
}

interface OrderSummaryCardProps {
  order: OrderData;
}

/**
 * OrderSummaryCard
 * 
 * Displays order summary with service details, plan, and pricing.
 * Shows frequency, subtotal, discount, and total amount.
 * 
 * @param order - Order data to display
 */
const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ order }) => {
  // Calculate discount and total
  const subtotal = order.price;
  const discountAmount = order.discount || 0;
  const total = subtotal - discountAmount;

  // Frequency labels
  const frequencyLabels = {
    monthly: 'Mensual',
    quarterly: 'Trimestral',
    annual: 'Anual',
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Tu orden
      </h2>

      {/* Service info */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🏠</span>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">
              {order.serviceName}
            </h3>
            <p className="text-sm text-slate-600">
              {order.planName}
            </p>
          </div>
        </div>

        {/* Frequency badge */}
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
          <span>🔄</span>
          <span>Pago {frequencyLabels[order.frequency]}</span>
        </div>
      </div>

      {/* Pricing breakdown */}
      <div className="space-y-3 mb-4 pb-4 border-b border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span className="text-slate-900 font-medium">
            ${subtotal.toLocaleString('es-CO')}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Descuento</span>
            <span className="text-green-600 font-medium">
              -${discountAmount.toLocaleString('es-CO')}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-base font-semibold text-slate-900">Total</span>
        <div className="text-right">
          <span className="text-2xl font-bold text-slate-900">
            ${total.toLocaleString('es-CO')}
          </span>
          <span className="text-slate-600 text-sm ml-1">
            /{frequencyLabels[order.frequency].toLowerCase()}
          </span>
        </div>
      </div>

      {/* Tax info */}
      <p className="text-xs text-slate-600">
        * Impuestos incluidos. El cargo se realizará al confirmar el pago.
      </p>
    </div>
  );
};

export default OrderSummaryCard;
