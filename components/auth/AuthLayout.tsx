/**
 * AuthLayout Component
 * Layout principal para páginas de autenticación con diseño split screen
 * - Lado izquierdo: sección informativa
 * - Lado derecho: formulario de autenticación
 * - Responsive: stack vertical en mobile, horizontal en desktop
 */

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  infoSection: React.ReactNode;
}

export default function AuthLayout({ children, infoSection }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Sección informativa - izquierda en desktop, arriba en mobile */}
        <div className="relative hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 lg:flex lg:items-center lg:justify-center lg:p-12">
          <div className="relative z-10 w-full max-w-lg">
            {infoSection}
          </div>
          
          {/* Patrón de fondo decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-4 -left-4 h-72 w-72 rounded-full bg-white blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 h-96 w-96 rounded-full bg-white blur-3xl"></div>
          </div>
        </div>

        {/* Sección del formulario - derecha en desktop, principal en mobile */}
        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
