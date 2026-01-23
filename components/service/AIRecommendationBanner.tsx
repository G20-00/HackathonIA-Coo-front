/**
 * AIRecommendationBanner Component
 * Banner informativo con recomendación contextual de IA
 * - Destaca recomendación personalizada
 * - Muestra ciudad, ahorro y deducible sugerido
 * - Diseño con gradiente y icono de IA
 */

import React from 'react';

interface AIRecommendationBannerProps {
  city: string;
  savings: string;
  deductible: string;
}

export default function AIRecommendationBanner({ 
  city, 
  savings, 
  deductible 
}: AIRecommendationBannerProps) {
  return (
    <div className="mb-6 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 p-6">
      <div className="flex items-start gap-4">
        {/* Icono de IA */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        {/* Contenido */}
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">
              Recomendación Personalizada
            </h3>
            <span className="rounded-full bg-purple-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              IA
            </span>
          </div>
          
          <p className="mb-4 text-sm text-slate-700">
            Basado en tu ubicación y perfil, hemos configurado este plan especialmente para ti.
          </p>

          {/* Métricas clave */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/70 p-3 backdrop-blur-sm">
              <p className="text-xs font-medium text-slate-600">Tu ciudad</p>
              <p className="mt-1 text-base font-bold text-slate-900">{city}</p>
            </div>
            <div className="rounded-lg bg-white/70 p-3 backdrop-blur-sm">
              <p className="text-xs font-medium text-slate-600">Ahorro estimado</p>
              <p className="mt-1 text-base font-bold text-green-600">{savings}</p>
            </div>
            <div className="rounded-lg bg-white/70 p-3 backdrop-blur-sm">
              <p className="text-xs font-medium text-slate-600">Deducible sugerido</p>
              <p className="mt-1 text-base font-bold text-blue-600">{deductible}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
