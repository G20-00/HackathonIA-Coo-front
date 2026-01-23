/**
 * FormSelect Component
 * Select personalizado para formularios
 * - Label descriptivo
 * - Opciones configurables
 * - Estado de error
 * - Texto de ayuda opcional
 */

'use client';

import React, { SelectHTMLAttributes } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  error?: string;
  helperText?: string;
}

export default function FormSelect({ 
  label, 
  id, 
  options,
  error, 
  helperText,
  className = '',
  ...props 
}: FormSelectProps) {
  return (
    <div className="w-full">
      {/* Label */}
      <label 
        htmlFor={id} 
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      {/* Select */}
      <select
        id={id}
        className={`w-full rounded-lg border ${
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
        } bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 transition-colors ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

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
