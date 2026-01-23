/**
 * Página de Detalle de Servicio - Seguro Hogar
 * Página completa de configuración y compra de servicio
 * - Header con título, rating y beneficios
 * - Banner de recomendación IA
 * - Formulario de configuración (tipo, valor, deducible, dirección)
 * - Listas de coberturas y seguridad
 * - Panel de resumen sticky con precio y botones
 * - Layout de 2 columnas en desktop
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ServiceHeader from '@/components/service/ServiceHeader';
import AIRecommendationBanner from '@/components/service/AIRecommendationBanner';
import FormSelect from '@/components/ui/FormSelect';
import InputField from '@/components/ui/InputField';
import SummaryCard from '@/components/service/SummaryCard';
import FeatureList from '@/components/service/FeatureList';

export default function ServiceDetailPage() {
  const router = useRouter();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    propertyType: 'casa',
    estimatedValue: '',
    deductible: '500000',
    address: '',
  });

  /**
   * Maneja cambios en el formulario
   */
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Agrega al carrito
   */
  const handleAddToCart = () => {
    console.log('Agregado al carrito:', formData);
    // TODO: Implementar lógica de carrito real
    alert('✓ Producto agregado al carrito');
  };

  /**
   * Procede a compra - Navega al checkout
   */
  const handleBuy = () => {
    console.log('Navegando al checkout con:', formData);
    // TODO: Pasar datos del formulario al checkout vía state/context
    router.push('/dashboard/checkout');
  };

  // Datos mock del servicio
  const serviceData = {
    title: 'Seguro Hogar',
    category: 'Seguros',
    rating: 4.8,
    reviewCount: 1234,
    benefits: [
      'Cancelación flexible',
      'Asistencia 24/7',
      'Cobertura nacional',
    ],
    price: '$89.900',
  };

  // Opciones para los selectores
  const propertyTypes = [
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'finca', label: 'Finca' },
    { value: 'local', label: 'Local Comercial' },
  ];

  const deductibles = [
    { value: '250000', label: '$250.000' },
    { value: '500000', label: '$500.000' },
    { value: '1000000', label: '$1.000.000' },
    { value: '2000000', label: '$2.000.000' },
  ];

  // Coberturas incluidas
  const coverageItems = [
    'Incendio y rayo',
    'Terremoto y erupción volcánica',
    'Inundación y daños por agua',
    'Robo y hurto',
    'Responsabilidad civil',
    'Daños eléctricos',
    'Rotura de vidrios',
    'Asistencia de emergencia',
  ];

  // Características de seguridad
  const securityItems = [
    'Encriptación TLS 1.3',
    'Tokens de sesión seguros',
    'Webhooks para notificaciones',
    'Control de acceso basado en roles',
  ];

  return (
    <DashboardLayout>
      {/* Header del servicio */}
      <ServiceHeader
        title={serviceData.title}
        category={serviceData.category}
        rating={serviceData.rating}
        reviewCount={serviceData.reviewCount}
        benefits={serviceData.benefits}
      />

      {/* Layout de 2 columnas */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Columna izquierda - Configuración (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner de recomendación IA */}
          <AIRecommendationBanner
            city="Bogotá"
            savings="$180K/año"
            deductible="$500.000"
          />

          {/* Formulario de configuración */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Configura tu seguro
            </h2>

            <div className="space-y-5">
              {/* Tipo de vivienda */}
              <FormSelect
                label="Tipo de vivienda"
                id="propertyType"
                options={propertyTypes}
                value={formData.propertyType}
                onChange={(e) => handleChange('propertyType', e.target.value)}
                helperText="Selecciona el tipo de propiedad a asegurar"
              />

              {/* Valor estimado */}
              <InputField
                label="Valor estimado de la vivienda"
                id="estimatedValue"
                type="text"
                placeholder="Ej: 250000000"
                value={formData.estimatedValue}
                onChange={(e) => handleChange('estimatedValue', e.target.value)}
                helperText="Valor aproximado en pesos colombianos"
              />

              {/* Deducible */}
              <FormSelect
                label="Deducible"
                id="deductible"
                options={deductibles}
                value={formData.deductible}
                onChange={(e) => handleChange('deductible', e.target.value)}
                helperText="Valor que asumes en caso de siniestro"
              />

              {/* Dirección */}
              <InputField
                label="Dirección de la vivienda"
                id="address"
                type="text"
                placeholder="Calle 123 #45-67, Bogotá"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                helperText="Dirección completa del inmueble"
              />
            </div>
          </div>

          {/* Qué incluye */}
          <FeatureList
            title="¿Qué incluye este seguro?"
            items={coverageItems}
            variant="coverage"
          />

          {/* Seguridad */}
          <FeatureList
            title="Seguridad y tecnología"
            items={securityItems}
            variant="security"
          />
        </div>

        {/* Columna derecha - Resumen (1/3) */}
        <div className="lg:col-span-1">
          <SummaryCard
            price={serviceData.price}
            onAddToCart={handleAddToCart}
            onBuy={handleBuy}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
