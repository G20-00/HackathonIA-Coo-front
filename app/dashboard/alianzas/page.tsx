// app/dashboard/alianzas/page.tsx
// Página: Alianzas verificadas (Partners B2B)

'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AllianceFilterBar from '@/components/alliances/AllianceFilterBar';
import AllianceCard, { Alliance } from '@/components/alliances/AllianceCard';

/**
 * Página de Alianzas
 * 
 * Marketplace B2B de partners verificados con:
 * - Filtros avanzados (búsqueda, categoría, verificación, proximidad)
 * - Cards de alianzas con badges de verificación
 * - Diseño limpio orientado a confianza y claridad
 */
export default function AllianzasPage() {
  const router = useRouter();

  // Estado de filtros
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    showVerifiedOnly: false,
    showNearMe: false,
  });

  // Datos mock de alianzas (8 partners)
  const alliances: Alliance[] = [
    {
      id: '1',
      name: 'Clínica Vida+',
      category: 'Salud',
      description: 'Red de clínicas especializadas con más de 50 centros a nivel nacional. Atención médica integral 24/7 con especialistas certificados.',
      logo: '🏥',
      verifications: [
        { type: 'iso', label: 'ISO 9001' },
        { type: 'sla', label: 'SLA 99.9%' },
        { type: 'certified', label: 'Médicos certificados' },
      ],
      location: 'Bogotá, Colombia',
      isVerified: true,
      nearMe: true,
    },
    {
      id: '2',
      name: 'AutoRescate',
      category: 'Movilidad',
      description: 'Asistencia vehicular 24/7 en todo el país. Grúa, mecánica, cambio de llantas y asistencia en carretera.',
      logo: '🚗',
      verifications: [
        { type: 'sla', label: 'SLA 99.5%' },
        { type: 'certified', label: 'Técnicos certificados' },
        { type: 'verified' },
      ],
      location: 'Nacional',
      isVerified: true,
      nearMe: false,
    },
    {
      id: '3',
      name: 'HogarFix',
      category: 'Hogar',
      description: 'Servicios de mantenimiento y reparaciones del hogar. Plomería, electricidad, cerrajería y más. Técnicos verificados.',
      logo: '🔧',
      verifications: [
        { type: 'certified', label: 'Técnicos certificados' },
        { type: 'kyc', label: 'KYC Verified' },
        { type: 'secure' },
      ],
      location: 'Bogotá, Medellín, Cali',
      isVerified: true,
      nearMe: true,
    },
    {
      id: '4',
      name: 'FinanPlus',
      category: 'Finanzas',
      description: 'Soluciones financieras corporativas. Créditos, inversiones y seguros empresariales con tasas preferenciales.',
      logo: '💳',
      verifications: [
        { type: 'iso', label: 'ISO 27001' },
        { type: 'kyc', label: 'KYC Verified' },
        { type: 'secure', label: 'PCI DSS' },
      ],
      location: 'Nacional',
      isVerified: true,
      nearMe: false,
    },
    {
      id: '5',
      name: 'TechSecure',
      category: 'Tecnología',
      description: 'Ciberseguridad empresarial. Auditorías, pentesting, monitoreo 24/7 y respuesta a incidentes.',
      logo: '🔒',
      verifications: [
        { type: 'iso', label: 'ISO 27001' },
        { type: 'certified', label: 'Certified Experts' },
        { type: 'secure' },
      ],
      location: 'Bogotá',
      isVerified: true,
      nearMe: true,
    },
    {
      id: '6',
      name: 'EduPro',
      category: 'Educación',
      description: 'Plataforma de capacitación corporativa. Cursos, certificaciones y programas de desarrollo profesional.',
      logo: '🎓',
      verifications: [
        { type: 'certified', label: 'Certificados oficiales' },
        { type: 'verified' },
      ],
      location: 'Online + Presencial',
      isVerified: true,
      nearMe: false,
    },
    {
      id: '7',
      name: 'ViajeSeguro',
      category: 'Movilidad',
      description: 'Seguros de viaje corporativos. Cobertura internacional, asistencia médica y cancelación de vuelos.',
      logo: '✈️',
      verifications: [
        { type: 'sla', label: 'SLA 99.9%' },
        { type: 'kyc' },
        { type: 'secure' },
      ],
      location: 'Internacional',
      isVerified: true,
      nearMe: false,
    },
    {
      id: '8',
      name: 'SaludTotal',
      category: 'Salud',
      description: 'Medicina prepagada empresarial. Planes personalizados con red de clínicas premium y telemedicina incluida.',
      logo: '⚕️',
      verifications: [
        { type: 'iso', label: 'ISO 9001' },
        { type: 'sla', label: 'SLA 99.8%' },
        { type: 'certified' },
        { type: 'verified' },
      ],
      location: 'Bogotá, Medellín',
      isVerified: true,
      nearMe: true,
    },
  ];

  // Filtrado de alianzas
  const filteredAlliances = useMemo(() => {
    return alliances.filter((alliance) => {
      // Filtro de búsqueda
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          alliance.name.toLowerCase().includes(searchLower) ||
          alliance.category.toLowerCase().includes(searchLower) ||
          alliance.description.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Filtro de categoría
      if (filters.category && alliance.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Filtro de verificadas
      if (filters.showVerifiedOnly && !alliance.isVerified) {
        return false;
      }

      // Filtro de cerca de mí
      if (filters.showNearMe && !alliance.nearMe) {
        return false;
      }

      return true;
    });
  }, [filters, alliances]);

  // Handler para ver oferta
  const handleViewOffer = (alliance: Alliance) => {
    console.log('Ver oferta de:', alliance.name);
    // TODO: Navegar a página de detalle de alianza
    // router.push(`/dashboard/alianzas/${alliance.id}`);
    
    // Por ahora, mostrar alerta
    alert(`Redirigiendo a la oferta de ${alliance.name}...`);
  };

  // Handler para cambio de filtros
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Alianzas Estratégicas
          </h1>
          <p className="text-slate-600">
            Conecta con partners verificados de confianza para potenciar tus servicios
          </p>
        </div>

        {/* Stats rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-xl">🤝</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{alliances.length}</p>
                <p className="text-sm text-slate-600">Alianzas activas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {alliances.filter(a => a.isVerified).length}
                </p>
                <p className="text-sm text-slate-600">Verificadas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {alliances.filter(a => a.nearMe).length}
                </p>
                <p className="text-sm text-slate-600">Cerca de ti</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de filtros */}
        <AllianceFilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Resultados */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">
              {filteredAlliances.length === alliances.length ? (
                <>Mostrando todas las alianzas ({alliances.length})</>
              ) : (
                <>
                  Mostrando {filteredAlliances.length} de {alliances.length} alianzas
                </>
              )}
            </p>
          </div>

          {/* Lista de cards */}
          {filteredAlliances.length > 0 ? (
            <div className="space-y-4">
              {filteredAlliances.map((alliance) => (
                <AllianceCard
                  key={alliance.id}
                  alliance={alliance}
                  onViewOffer={handleViewOffer}
                />
              ))}
            </div>
          ) : (
            // Estado vacío
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No se encontraron alianzas
              </h3>
              <p className="text-slate-600 mb-4">
                Intenta ajustar los filtros para ver más resultados
              </p>
              <button
                onClick={() => setFilters({ search: '', category: '', showVerifiedOnly: false, showNearMe: false })}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
