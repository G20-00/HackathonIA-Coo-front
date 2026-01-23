/**
 * FeatureList Component
 * Lista de características o coberturas del servicio
 * - Título de sección
 * - Lista con iconos de check
 * - Diseño en columnas responsive
 * - Dos variantes: coberturas y seguridad
 */

import React from 'react';

interface FeatureListProps {
  title: string;
  items: string[];
  variant?: 'coverage' | 'security';
}

export default function FeatureList({ 
  title, 
  items, 
  variant = 'coverage' 
}: FeatureListProps) {
  // Iconos según variante
  const icon = variant === 'coverage' ? (
    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ) : (
    <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      {/* Título */}
      <h3 className="mb-4 text-xl font-bold text-slate-900">{title}</h3>

      {/* Lista de características */}
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {icon}
            </div>
            <span className="text-sm text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
