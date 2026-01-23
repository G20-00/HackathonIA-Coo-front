// components/checkout/PaymentMethodCard.tsx
// Component: Payment method information and Bold integration explanation

import React from 'react';

/**
 * PaymentMethodCard
 * 
 * Displays information about the Bold payment integration.
 * Explains the secure redirect flow and webhook confirmation process.
 */
const PaymentMethodCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Método de pago
      </h2>

      {/* Bold logo/badge */}
      <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-white">B</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Pago seguro con Bold
          </p>
          <p className="text-xs text-slate-600">
            Pasarela de pagos certificada
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-semibold text-slate-900">
          ¿Cómo funciona?
        </h3>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
              1
            </div>
            <div>
              <p className="text-sm text-slate-900 font-medium">
                Redirección segura
              </p>
              <p className="text-xs text-slate-600">
                Serás redirigido a la página segura de Bold para completar el pago
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
              2
            </div>
            <div>
              <p className="text-sm text-slate-900 font-medium">
                Link de pago generado
              </p>
              <p className="text-xs text-slate-600">
                Nuestro backend genera un link único y seguro para tu transacción
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">
              3
            </div>
            <div>
              <p className="text-sm text-slate-900 font-medium">
                Confirmación vía webhook
              </p>
              <p className="text-xs text-slate-600">
                Recibimos confirmación idempotente de Bold al completar el pago
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security badges */}
      <div className="bg-slate-50 rounded-lg p-4">
        <p className="text-xs font-semibold text-slate-900 mb-2">
          Garantía de seguridad
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700">
            🔒 SSL/TLS
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700">
            ✓ PCI DSS
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700">
            🛡️ 3D Secure
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
