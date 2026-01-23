/**
 * SearchInput Component
 * Input de búsqueda con icono y estilos personalizados
 * - Icono de búsqueda integrado
 * - Placeholder personalizable
 * - Estilos consistentes con el diseño
 */

'use client';

import React, { InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearch?: (value: string) => void;
}

export default function SearchInput({ 
  placeholder = 'Buscar...', 
  onSearch,
  className = '',
  ...props 
}: SearchInputProps) {
  return (
    <div className="relative">
      {/* Icono de búsqueda */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
