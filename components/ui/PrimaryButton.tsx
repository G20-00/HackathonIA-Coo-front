/**
 * PrimaryButton Component
 * Botón principal para acciones primarias (submit, confirmar, etc.)
 * Incluye estados de loading, disabled y variantes de tamaño
 */

'use client';

import React, { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({ 
  children, 
  loading = false,
  fullWidth = true,
  disabled,
  className = '',
  ...props 
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`${
        fullWidth ? 'w-full' : ''
      } flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600 disabled:hover:shadow-lg ${className}`}
      {...props}
    >
      {/* Indicador de loading */}
      {loading && (
        <svg 
          className="h-5 w-5 animate-spin" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
