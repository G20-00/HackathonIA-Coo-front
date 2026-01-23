/**
 * InfoCard Component
 * Tarjeta informativa para mostrar características del producto
 * Usada en la sección izquierda del layout de autenticación
 */

import React from 'react';

interface InfoCardProps {
  title: string;
  items: string[];
}

export default function InfoCard({ title, items }: InfoCardProps) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
      {/* Título de la card */}
      <h3 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h3>

      {/* Lista de características */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            {/* Icono de check */}
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            
            {/* Texto del item */}
            <span className="text-sm text-white/90">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
