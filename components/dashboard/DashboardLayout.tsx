/**
 * DashboardLayout Component
 * Layout principal para páginas del dashboard
 * - Sidebar fija a la izquierda
 * - Topbar en la parte superior
 * - Contenido principal con scroll
 */

import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar fija */}
      <Sidebar />

      {/* Contenedor principal con margen para sidebar */}
      <div className="pl-64">
        {/* Topbar fija */}
        <Topbar />

        {/* Contenido principal */}
        <main className="min-h-[calc(100vh-4rem)] p-6 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
