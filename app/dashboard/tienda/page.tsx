/**
 * Página de Tienda / Marketplace
 * Marketplace de servicios con filtros y cards
 * - Barra de filtros (búsqueda, categoría, ciudad)
 * - Grid responsive de servicios
 * - Botón de recomendación IA
 * - Carrito de compras
 * - 6 servicios de ejemplo
 */

'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FilterBar, { FilterState } from '@/components/marketplace/FilterBar';
import ServiceCard, { Service } from '@/components/marketplace/ServiceCard';

export default function TiendaPage() {
  const [cartItems, setCartItems] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    city: '',
  });

  /**
   * Datos mock de servicios
   */
  const services: Service[] = [
    {
      id: '1',
      name: 'Seguro Hogar',
      category: 'Seguros',
      description: 'Protección completa para tu hogar contra incendios, robos y desastres naturales. Incluye asistencia 24/7.',
      price: '$89.900',
      rating: 4.8,
      reviewCount: 1234,
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: '2',
      name: 'Asistencia Vehicular',
      category: 'Asistencia',
      description: 'Servicio de grúa, mecánica de emergencia y auxilio vial las 24 horas. Cobertura nacional.',
      price: '$45.000',
      rating: 4.6,
      reviewCount: 892,
      color: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: '3',
      name: 'Plan Salud',
      category: 'Salud',
      description: 'Cobertura médica integral con red de especialistas. Incluye medicina prepagada y odontología.',
      price: '$125.000',
      rating: 4.9,
      reviewCount: 2156,
      color: 'from-green-500 to-green-600',
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: '4',
      name: 'Mantenimiento Hogar',
      category: 'Mantenimiento',
      description: 'Servicios de plomería, electricidad, cerrajería y más. Personal calificado disponible cuando lo necesites.',
      price: '$65.000',
      rating: 4.7,
      reviewCount: 567,
      color: 'from-purple-500 to-purple-600',
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: '5',
      name: 'Seguro Viajes',
      category: 'Seguros',
      description: 'Viaja tranquilo con cobertura internacional. Incluye asistencia médica, equipaje y cancelación.',
      price: '$55.000',
      rating: 4.5,
      reviewCount: 423,
      color: 'from-indigo-500 to-indigo-600',
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: '6',
      name: 'Protección Compras',
      category: 'Protección',
      description: 'Protege tus compras online y offline. Garantía extendida, devoluciones y protección contra fraudes.',
      price: '$38.000',
      rating: 4.4,
      reviewCount: 789,
      color: 'from-pink-500 to-pink-600',
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  /**
   * Filtra los servicios según los criterios
   */
  const filteredServices = services.filter((service) => {
    // Filtro por búsqueda
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = service.name.toLowerCase().includes(searchLower);
      const matchesDescription = service.description.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesDescription) return false;
    }

    // Filtro por categoría
    if (filters.category && service.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }

    // TODO: Filtro por ciudad (pendiente agregar campo en servicios)

    return true;
  });

  /**
   * Maneja el cambio de filtros
   */
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Filtros aplicados:', newFilters);
  };

  /**
   * Maneja ver detalle del servicio
   */
  const handleViewDetail = (service: Service) => {
    console.log('Ver detalle:', service);
    // TODO: Navegar a página de detalle o abrir modal
  };

  /**
   * Maneja compra del servicio
   */
  const handleBuy = (service: Service) => {
    console.log('Comprar:', service);
    setCartItems((prev) => prev + 1);
    // TODO: Agregar al carrito real
  };

  /**
   * Maneja click en carrito
   */
  const handleCartClick = () => {
    console.log('Abrir carrito');
    // TODO: Navegar a carrito o abrir modal
  };

  return (
    <DashboardLayout>
      {/* Header de la página */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Tienda</h1>
        <p className="mt-1 text-sm text-slate-600">
          Explora y adquiere los mejores servicios para tu bienestar y protección
        </p>
      </div>

      {/* Barra de filtros */}
      <FilterBar
        onFilterChange={handleFilterChange}
        cartItemCount={cartItems}
        onCartClick={handleCartClick}
      />

      {/* Contador de resultados */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Mostrando <span className="font-semibold">{filteredServices.length}</span> de{' '}
          <span className="font-semibold">{services.length}</span> servicios
        </p>

        {/* Indicador de filtros activos */}
        {(filters.search || filters.category || filters.city) && (
          <button
            onClick={() => setFilters({ search: '', category: '', city: '' })}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid de servicios */}
      {filteredServices.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetail={handleViewDetail}
              onBuy={handleBuy}
            />
          ))}
        </div>
      ) : (
        // Mensaje cuando no hay resultados
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-16">
          <svg className="mb-4 h-16 w-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            No se encontraron servicios
          </h3>
          <p className="mb-4 text-sm text-slate-600">
            Intenta ajustar tus filtros o búsqueda
          </p>
          <button
            onClick={() => setFilters({ search: '', category: '', city: '' })}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Ver todos los servicios
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
