/**
 * SummaryCard Component
 * Card de resumen con precio y acciones de compra
 * - Precio mensual destacado
 * - Texto de impuestos incluidos
 * - Botón para agregar al carrito
 * - Botón principal de compra
 * - Sticky en desktop para seguir al scroll
 */

'use client';

import React from 'react';
import PrimaryButton from '@/components/ui/PrimaryButton';

interface SummaryCardProps {
  price: string;
  onAddToCart?: () => void;
  onBuy?: () => void;
}

export default function SummaryCard({ 
  price, 
  onAddToCart, 
  onBuy 
}: SummaryCardProps) {
  return (
    <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
      {/* Título */}
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Resumen de compra
      </h3>

      {/* Precio */}
      <div className="mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-slate-900">
            {price}
          </span>
          <span className="text-lg text-slate-600">/mes</span>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          * Impuestos incluidos
        </p>
      </div>

      {/* Separador */}
      <div className="my-6 border-t border-slate-200"></div>

      {/* Beneficios rápidos */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <svg className="h-5 w-5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Cobertura inmediata</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <svg className="h-5 w-5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Cancela cuando quieras</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <svg className="h-5 w-5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Soporte 24/7</span>
        </div>
      </div>

      {/* Botones */}
      <div className="space-y-3">
        {/* Botón Agregar al carrito */}
        <button
          onClick={onAddToCart}
          className="w-full rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
        >
          Agregar al carrito
        </button>

        {/* Botón Comprar */}
        <PrimaryButton
          onClick={onBuy}
          fullWidth={true}
          className="flex items-center justify-center gap-2"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Comprar y pagar con Bold
        </PrimaryButton>
      </div>

      {/* Nota de seguridad */}
      <p className="mt-4 text-center text-xs text-slate-500">
        🔒 Pago seguro con encriptación SSL
      </p>
    </div>
  );
}
