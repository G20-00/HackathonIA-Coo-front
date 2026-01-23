// components/checkout/SecurityInfoCard.tsx
// Component: Security information and guarantees

import React from 'react';

/**
 * SecurityInfoCard
 * 
 * Displays security information and data protection guarantees.
 * Builds trust by explaining security measures in place.
 */
const SecurityInfoCard: React.FC = () => {
  const securityFeatures = [
    {
      icon: '🚫',
      title: 'No almacenamos tarjetas',
      description: 'Tus datos bancarios se procesan directamente en Bold, nunca pasan por nuestros servidores.',
    },
    {
      icon: '🔒',
      title: 'Conexión HTTPS',
      description: 'Toda la comunicación está encriptada con TLS 1.3 de extremo a extremo.',
    },
    {
      icon: '✓',
      title: 'Webhook verificado',
      description: 'Validamos la autenticidad de cada notificación de Bold con firmas criptográficas.',
    },
    {
      icon: '📋',
      title: 'Auditoría de órdenes',
      description: 'Todas las transacciones quedan registradas con timestamps y hashes inmutables.',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🛡️</span>
        <h2 className="text-lg font-bold text-slate-900">
          Seguridad de pago
        </h2>
      </div>

      <p className="text-sm text-slate-600 mb-6">
        Tu información está protegida con los más altos estándares de seguridad de la industria.
      </p>

      <div className="space-y-4">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <span className="text-xl">{feature.icon}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 mb-1">
                {feature.title}
              </p>
              <p className="text-xs text-slate-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance badges */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-600 mb-3">
          Cumplimiento y certificaciones:
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            ISO 27001
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            PCI DSS Level 1
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            SOC 2 Type II
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfoCard;
