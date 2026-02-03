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

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FilterBar, { FilterState } from '@/components/marketplace/FilterBar';
import ServiceCard, { Service } from '@/components/marketplace/ServiceCard';
import { servicesApi, categoriesApi } from '@/lib/api';
import { Service as BackendService, Category } from '@/lib/types';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/lib/hooks/useToast';

export default function TiendaPage() {
  const router = useRouter();
  const { addItem, getTotalItems } = useCart();
  const toast = useToast();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    city: '',
  });
  const [services, setServices] = useState<BackendService[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar servicios y categorías al montar el componente
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesData, categoriesData] = await Promise.all([
          servicesApi.getAvailableServices(),
          categoriesApi.getAllCategories(),
        ]);
        setServices(servicesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los servicios. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Convertir servicio del backend al formato del componente
   */
  const mapBackendServiceToComponentService = (backendService: BackendService): Service => {
    const category = categories.find((c) => c.id === backendService.categoryId);

    // Colores por categoría
    const colorMap: Record<string, string> = {
      default: 'from-blue-500 to-blue-600',
    };

    return {
      id: backendService.id.toString(),
      name: backendService.name,
      category: category?.name || 'Sin categoría',
      description: backendService.description,
      price: `$${backendService.price.toLocaleString('es-CO')}`,
      rating: 4.5, // Por ahora valor fijo, agregar rating en el backend más adelante
      reviewCount: 0,
      color: colorMap.default,
      icon: (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    };
  };

  /**
   * Filtra los servicios según los criterios
   */
  const filteredServices = services
    .filter((service) => {
      // Filtro por búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(searchLower);
        const matchesDescription = service.description.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesDescription) return false;
      }

      // Filtro por categoría
      if (filters.category) {
        const category = categories.find((c) => c.id === service.categoryId);
        if (category && category.name.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      return true;
    })
    .map(mapBackendServiceToComponentService);

  /**
   * Maneja el cambio de filtros
   */
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  /**
   * Maneja ver detalle del servicio
   */
  const handleViewDetail = (service: Service) => {
    // TODO: Implementar página de detalle
    toast.info(`Detalles de ${service.name} próximamente`);
  };

  /**
   * Maneja compra del servicio
   */
  const handleBuy = (service: Service) => {
    // Buscar el servicio del backend correspondiente
    const backendService = services.find((s) => s.id.toString() === service.id);

    if (backendService) {
      addItem(backendService, 1);
      toast.success(`${service.name} agregado al carrito`);
    }
  };

  /**
   * Maneja click en carrito
   */
  const handleCartClick = () => {
    router.push('/dashboard/carrito');
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

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Barra de filtros */}
      <FilterBar
        onFilterChange={handleFilterChange}
        cartItemCount={getTotalItems()}
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
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-slate-600">Cargando servicios...</p>
        </div>
      ) : filteredServices.length > 0 ? (
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
