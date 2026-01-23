/**
 * FilterBar Component
 * Barra de filtros para búsqueda y selección de servicios
 * - Input de búsqueda
 * - Selectores de categoría y ciudad
 * - Botón de recomendación por IA
 * - Indicador de carrito con contador
 */

'use client';

import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput';
import PrimaryButton from '@/components/ui/PrimaryButton';

interface FilterBarProps {
  onFilterChange?: (filters: FilterState) => void;
  cartItemCount?: number;
  onCartClick?: () => void;
}

export interface FilterState {
  search: string;
  category: string;
  city: string;
}

// Datos de ejemplo para los selectores
const categories = [
  { value: '', label: 'Todas las categorías' },
  { value: 'seguros', label: 'Seguros' },
  { value: 'asistencia', label: 'Asistencia' },
  { value: 'salud', label: 'Salud' },
  { value: 'mantenimiento', label: 'Mantenimiento' },
  { value: 'proteccion', label: 'Protección' },
];

const cities = [
  { value: '', label: 'Todas las ciudades' },
  { value: 'bogota', label: 'Bogotá' },
  { value: 'medellin', label: 'Medellín' },
  { value: 'cali', label: 'Cali' },
  { value: 'barranquilla', label: 'Barranquilla' },
  { value: 'cartagena', label: 'Cartagena' },
];

export default function FilterBar({ 
  onFilterChange, 
  cartItemCount = 0,
  onCartClick 
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    city: '',
  });

  /**
   * Actualiza los filtros
   */
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  /**
   * Aplica los filtros
   */
  const handleApplyFilters = () => {
    onFilterChange?.(filters);
  };

  /**
   * Solicita recomendación de IA
   */
  const handleAIRecommendation = () => {
    console.log('Solicitando recomendación de IA...');
    // TODO: Implementar lógica de IA
  };

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Fila superior: Búsqueda y Carrito */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex-1">
          <SearchInput
            placeholder="Buscar servicios..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
          />
        </div>

        {/* Botón de carrito */}
        <button
          onClick={onCartClick}
          className="relative rounded-lg border-2 border-slate-200 bg-white p-3 hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <svg className="h-6 w-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {/* Contador de items */}
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-white">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Fila inferior: Filtros y botones */}
      <div className="flex flex-wrap items-end gap-3">
        {/* Select de Categoría */}
        <div className="flex-1 min-w-[200px]">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Categoría
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Select de Ciudad */}
        <div className="flex-1 min-w-[200px]">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Ciudad
          </label>
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Aplicar */}
        <button
          onClick={handleApplyFilters}
          className="rounded-lg bg-slate-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
        >
          Aplicar
        </button>

        {/* Botón Recomendado por IA */}
        <button
          onClick={handleAIRecommendation}
          className="flex items-center gap-2 rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-2.5 text-sm font-semibold text-purple-700 hover:border-purple-300 hover:from-purple-100 hover:to-indigo-100 transition-all"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Recomendado por IA
        </button>
      </div>
    </div>
  );
}
