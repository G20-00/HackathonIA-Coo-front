/**
 * InputField Component
 * Campo de entrada reutilizable con soporte para diferentes tipos
 * Incluye label, placeholder, validación visual y mensajes de error
 */

'use client';

import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
}

export default function InputField({ 
  label, 
  id, 
  error, 
  helperText,
  className = '',
  ...props 
}: InputFieldProps) {
  return (
    <div className="w-full">
      {/* Label */}
      <label 
        htmlFor={id} 
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        className={`w-full rounded-lg border ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
        } bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${className}`}
        {...props}
      />

      {/* Mensaje de error o helper text */}
      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1.5 text-sm text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
