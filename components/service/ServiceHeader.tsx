/**
 * ServiceHeader Component
 * Encabezado de la página de detalle del servicio
 * - Breadcrumb de navegación
 * - Título del servicio
 * - Rating con estrellas
 * - Beneficios clave con iconos
 */

import React from 'react';
import Rating from '@/components/ui/Rating';

interface ServiceHeaderProps {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  benefits: string[];
}

export default function ServiceHeader({ 
  title, 
  category, 
  rating, 
  reviewCount,
  benefits 
}: ServiceHeaderProps) {
  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-600">
        <a href="/dashboard" className="hover:text-slate-900">Dashboard</a>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <a href="/dashboard/tienda" className="hover:text-slate-900">Tienda</a>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-400">{category}</span>
      </nav>

      {/* Título y rating */}
      <div className="mb-4">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">{title}</h1>
        <Rating rating={rating} reviewCount={reviewCount} size="md" />
      </div>

      {/* Beneficios clave */}
      <div className="flex flex-wrap gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-slate-700">
            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
