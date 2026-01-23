/**
 * Topbar Component
 * Barra superior del dashboard con búsqueda, indicador de IA y menú de usuario
 * - SearchInput para búsqueda global
 * - Indicador de estado de IA
 * - Avatar y menú desplegable de usuario
 */

'use client';

import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput';

export default function Topbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 right-0 z-30 h-16 border-b border-slate-200 bg-white" style={{ left: '16rem' }}>
      <div className="flex h-full items-center justify-between px-6">
        {/* Barra de búsqueda */}
        <div className="flex-1 max-w-xl">
          <SearchInput placeholder="Buscar productos, servicios, ayuda..." />
        </div>

        {/* Sección derecha: IA + Usuario */}
        <div className="flex items-center gap-4">
          {/* Indicador IA Activa */}
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 border border-green-200">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-green-400"></div>
            </div>
            <span className="text-sm font-medium text-green-700">IA Activa</span>
          </div>

          {/* Botón de notificaciones */}
          <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Badge de notificaciones */}
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* Menú de usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50 transition-colors"
            >
              {/* Avatar */}
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-xs font-semibold text-white">JD</span>
              </div>
              
              {/* Nombre y rol */}
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Juan Pérez</p>
                <p className="text-xs text-slate-500">Usuario</p>
              </div>

              {/* Icono dropdown */}
              <svg
                className={`h-4 w-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg py-1">
                <a href="/dashboard/perfil" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mi Perfil
                </a>
                <a href="/dashboard/configuracion" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Configuración
                </a>
                <hr className="my-1 border-slate-200" />
                <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
