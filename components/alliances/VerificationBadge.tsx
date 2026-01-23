// components/alliances/VerificationBadge.tsx
// Componente: Badge de verificación para alianzas (ISO, SLA, KYC, etc.)

import React from 'react';

interface VerificationBadgeProps {
  type: 'iso' | 'sla' | 'kyc' | 'certified' | 'secure' | 'verified';
  label?: string;
}

/**
 * VerificationBadge
 * 
 * Badge que muestra el tipo de verificación o certificación de una alianza.
 * Diferentes estilos según el tipo de verificación.
 * 
 * @param type - Tipo de verificación
 * @param label - Texto personalizado (opcional)
 */
const VerificationBadge: React.FC<VerificationBadgeProps> = ({ type, label }) => {
  // Configuración de estilos y textos según tipo
  const badgeConfig = {
    iso: {
      text: label || 'ISO 9001',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      icon: '🏆',
    },
    sla: {
      text: label || 'SLA 99.9%',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      icon: '⚡',
    },
    kyc: {
      text: label || 'KYC Verified',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      icon: '✓',
    },
    certified: {
      text: label || 'Certified Techs',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700',
      icon: '👨‍🔧',
    },
    secure: {
      text: label || 'Secure',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-700',
      icon: '🔒',
    },
    verified: {
      text: label || 'Verified',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-700',
      icon: '✓',
    },
  };

  const config = badgeConfig[type];

  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
    >
      <span className="text-xs">{config.icon}</span>
      {config.text}
    </span>
  );
};

export default VerificationBadge;
