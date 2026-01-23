// components/alliances/AllianceCard.tsx
// Componente: Card individual de alianza con verificaciones

'use client';

import React from 'react';
import VerificationBadge from './VerificationBadge';
import PrimaryButton from '@/components/ui/PrimaryButton';

export interface Alliance {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string; // Emoji o inicial
  verifications: Array<{
    type: 'iso' | 'sla' | 'kyc' | 'certified' | 'secure' | 'verified';
    label?: string;
  }>;
  location?: string;
  isVerified: boolean;
  nearMe?: boolean;
}

interface AllianceCardProps {
  alliance: Alliance;
  onViewOffer: (alliance: Alliance) => void;
}

/**
 * AllianceCard
 * 
 * Card de alianza B2B con:
 * - Logo/ícono
 * - Nombre y categoría
 * - Badges de verificación
 * - Ubicación (opcional)
 * - Botón de acción
 * 
 * @param alliance - Datos de la alianza
 * @param onViewOffer - Callback al hacer clic en "Ver oferta"
 */
const AllianceCard: React.FC<AllianceCardProps> = ({ alliance, onViewOffer }) => {
  // Colores de gradiente según categoría
  const categoryColors: Record<string, string> = {
    salud: 'from-red-500 to-pink-500',
    movilidad: 'from-blue-500 to-cyan-500',
    finanzas: 'from-green-500 to-emerald-500',
    hogar: 'from-orange-500 to-amber-500',
    tecnología: 'from-purple-500 to-indigo-500',
    educación: 'from-yellow-500 to-orange-500',
  };

  const gradientClass = categoryColors[alliance.category.toLowerCase()] || 'from-gray-500 to-slate-500';

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start gap-4">
        {/* Logo con gradiente */}
        <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0`}>
          <span className="text-3xl">{alliance.logo}</span>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {/* Header con nombre y badge de verificación */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  {alliance.name}
                </h3>
                {alliance.isVerified && (
                  <span className="text-blue-500 text-sm" title="Alianza verificada">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 capitalize">{alliance.category}</p>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-sm text-slate-700 mb-3 line-clamp-2">
            {alliance.description}
          </p>

          {/* Ubicación */}
          {alliance.location && (
            <div className="flex items-center gap-1 text-xs text-slate-600 mb-3">
              <span>📍</span>
              <span>{alliance.location}</span>
              {alliance.nearMe && (
                <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                  Cerca de ti
                </span>
              )}
            </div>
          )}

          {/* Badges de verificación */}
          <div className="flex flex-wrap gap-2 mb-4">
            {alliance.verifications.map((verification, index) => (
              <VerificationBadge 
                key={index}
                type={verification.type}
                label={verification.label}
              />
            ))}
          </div>

          {/* Botón de acción */}
          <div className="flex justify-end">
            <PrimaryButton
              onClick={() => onViewOffer(alliance)}
              className="text-sm px-4 py-2"
            >
              Ver oferta
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceCard;
