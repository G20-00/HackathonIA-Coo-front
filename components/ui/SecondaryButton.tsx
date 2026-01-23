/**
 * SecondaryButton Component
 * Botón secundario para acciones alternativas (cancelar, crear cuenta, etc.)
 * Estilo outline con hover suave
 */

'use client';

import React, { ButtonHTMLAttributes } from 'react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function SecondaryButton({ 
  children,
  fullWidth = true,
  className = '',
  ...props 
}: SecondaryButtonProps) {
  return (
    <button
      className={`${
        fullWidth ? 'w-full' : ''
      } flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
