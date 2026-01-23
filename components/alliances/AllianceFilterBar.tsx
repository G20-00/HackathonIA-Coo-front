// components/alliances/AllianceFilterBar.tsx
// Componente: Barra de filtros para página de alianzas

'use client';

import React from 'react';
import SearchInput from '@/components/ui/SearchInput';

interface FilterState {
  search: string;
  category: string;
  showVerifiedOnly: boolean;
  showNearMe: boolean;
}

interface AllianceFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

/**
 * AllianceFilterBar
 * 
 * Barra de filtros para alianzas:
 * - Búsqueda por nombre/categoría
 * - Select de categoría
 * - Toggle "Verificadas"
 * - Toggle "Cerca de mí"
 * 
 * @param filters - Estado actual de filtros
 * @param onFilterChange - Callback al cambiar filtros
 */
const AllianceFilterBar: React.FC<AllianceFilterBarProps> = ({ 
  filters, 
  onFilterChange 
}) => {
  // Categorías disponibles
  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'salud', label: 'Salud' },
    { value: 'movilidad', label: 'Movilidad' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'hogar', label: 'Hogar' },
    { value: 'tecnología', label: 'Tecnología' },
    { value: 'educación', label: 'Educación' },
  ];

  // Handler para búsqueda
  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  // Handler para categoría
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  // Handler para toggle de verificadas
  const handleVerifiedToggle = () => {
    onFilterChange({ ...filters, showVerifiedOnly: !filters.showVerifiedOnly });
  };

  // Handler para toggle de cerca de mí
  const handleNearMeToggle = () => {
    onFilterChange({ ...filters, showNearMe: !filters.showNearMe });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="lg:col-span-2">
          <SearchInput
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre o categoría..."
          />
        </div>

        {/* Select de categoría */}
        <div>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Botones de filtro */}
        <div className="flex gap-2">
          {/* Botón Verificadas */}
          <button
            onClick={handleVerifiedToggle}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              filters.showVerifiedOnly
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="mr-1">✓</span>
            Verificadas
          </button>

          {/* Botón Cerca de mí */}
          <button
            onClick={handleNearMeToggle}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              filters.showNearMe
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="mr-1">📍</span>
            Cerca
          </button>
        </div>
      </div>

      {/* Indicadores activos */}
      {(filters.search || filters.category || filters.showVerifiedOnly || filters.showNearMe) && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-600">Filtros activos:</span>
            
            {filters.search && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Búsqueda: {filters.search}
              </span>
            )}
            
            {filters.category && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {categories.find(c => c.value === filters.category)?.label}
              </span>
            )}
            
            {filters.showVerifiedOnly && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                Solo verificadas
              </span>
            )}
            
            {filters.showNearMe && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                Cerca de mí
              </span>
            )}

            {/* Botón limpiar */}
            <button
              onClick={() => onFilterChange({ search: '', category: '', showVerifiedOnly: false, showNearMe: false })}
              className="ml-2 text-sm text-slate-600 hover:text-slate-900 underline"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllianceFilterBar;
