/**
 * AuthCard Component
 * Tarjeta contenedora para formularios de autenticación
 * Proporciona un diseño consistente con sombras, bordes y espaciado
 */

import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="w-full rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
      {/* Header del card */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-600">
            {subtitle}
          </p>
        )}
      </div>

      {/* Contenido del card (formulario) */}
      <div>
        {children}
      </div>
    </div>
  );
}
