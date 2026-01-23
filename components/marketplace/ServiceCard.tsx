/**
 * ServiceCard Component
 * Card de servicio para el marketplace
 * - Icono del servicio
 * - Nombre y categoría
 * - Rating con estrellas
 * - Descripción breve
 * - Precio
 * - Botones de acción (Ver detalle, Comprar)
 */

'use client';

import React from 'react';
import Rating from '@/components/ui/Rating';
import PrimaryButton from '@/components/ui/PrimaryButton';

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
  icon: React.ReactNode;
  color: string; // Color del gradiente del icono
}

interface ServiceCardProps {
  service: Service;
  onViewDetail?: (service: Service) => void;
  onBuy?: (service: Service) => void;
}

export default function ServiceCard({ 
  service, 
  onViewDetail, 
  onBuy 
}: ServiceCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-xl hover:border-slate-300">
      {/* Header con icono y categoría */}
      <div className="mb-4 flex items-start justify-between">
        {/* Icono del servicio */}
        <div 
          className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} shadow-lg`}
        >
          {service.icon}
        </div>

        {/* Badge de categoría */}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {service.category}
        </span>
      </div>

      {/* Nombre del servicio */}
      <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
        {service.name}
      </h3>

      {/* Rating */}
      <div className="mb-3">
        <Rating 
          rating={service.rating} 
          reviewCount={service.reviewCount}
          size="sm"
        />
      </div>

      {/* Descripción */}
      <p className="mb-4 line-clamp-2 text-sm text-slate-600">
        {service.description}
      </p>

      {/* Precio */}
      <div className="mb-4 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-900">
          {service.price}
        </span>
        <span className="text-sm text-slate-500">/mes</span>
      </div>

      {/* Separador */}
      <div className="mb-4 border-t border-slate-200"></div>

      {/* Botones de acción */}
      <div className="flex gap-3">
        {/* Botón Ver detalle */}
        <button
          onClick={() => onViewDetail?.(service)}
          className="flex-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
        >
          Ver detalle
        </button>

        {/* Botón Comprar */}
        <button
          onClick={() => onBuy?.(service)}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
