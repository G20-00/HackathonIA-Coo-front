/**
 * ActionCard Component
 * Tarjeta de acción rápida con icono, título y descripción
 * - Click handler personalizable
 * - Diferentes variantes de color
 * - Efectos hover suaves
 */

'use client';

import React from 'react';

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: 'blue' | 'green' | 'purple' | 'orange';
}

// Estilos según variante
const variantStyles = {
  blue: 'from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300 text-blue-700',
  green: 'from-green-50 to-green-100 border-green-200 hover:border-green-300 text-green-700',
  purple: 'from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300 text-purple-700',
  orange: 'from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300 text-orange-700',
};

export default function ActionCard({ 
  title, 
  description, 
  icon, 
  onClick,
  variant = 'blue' 
}: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-xl border bg-gradient-to-br p-6 text-left transition-all duration-200 hover:shadow-lg ${variantStyles[variant]}`}
    >
      {/* Icono */}
      <div className="mb-4 inline-flex rounded-lg bg-white/50 p-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>

      {/* Contenido */}
      <h3 className="mb-1 text-lg font-semibold text-slate-900">
        {title}
      </h3>
      <p className="text-sm text-slate-600">
        {description}
      </p>

      {/* Flecha indicadora */}
      <div className="mt-4 flex items-center gap-1 text-sm font-medium">
        <span>Ir</span>
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
