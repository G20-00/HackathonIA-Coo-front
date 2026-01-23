// app/dashboard/simulador/page.tsx
// Página: Simulador IA de cotizaciones

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SimulatorForm, { SimulatorFormData } from '@/components/simulator/SimulatorForm';
import AIResultCard, { AIResult } from '@/components/simulator/AIResultCard';
import { ExplanationItem } from '@/components/simulator/ExplanationList';

/**
 * Página de Simulador IA
 * 
 * Experiencia guiada de simulación de cotización con inteligencia artificial.
 * Layout en 2 columnas:
 * - Izquierda: Formulario de entrada
 * - Derecha: Resultado de IA con explicaciones
 */
export default function SimuladorPage() {
  const router = useRouter();

  // Estado del formulario
  const [formData, setFormData] = useState<SimulatorFormData>({
    service: '',
    city: '',
    propertyValue: '',
    deductible: '',
    message: '',
  });

  // Estado del resultado de IA
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handler para cambios en el formulario
  const handleFormChange = (field: keyof SimulatorFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Simular generación de cotización con IA (mock)
  const handleGenerateQuote = async () => {
    setIsGenerating(true);
    
    // Simular delay de IA (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calcular precio mock basado en inputs
    const basePrice = 89900;
    const cityMultiplier = formData.city === 'bogota' ? 1.2 : 1.0;
    const propertyValueNum = parseInt(formData.propertyValue) || 300000000;
    const propertyMultiplier = propertyValueNum / 300000000;
    const deductibleNum = parseInt(formData.deductible) || 500000;
    const deductibleMultiplier = deductibleNum >= 1000000 ? 0.85 : 1.0;
    
    const finalPrice = Math.round(
      basePrice * cityMultiplier * propertyMultiplier * deductibleMultiplier
    );

    // Calcular confianza mock (85-98%)
    const confidence = Math.round(85 + Math.random() * 13);

    // Generar razones de precio
    const priceReasons: ExplanationItem[] = [
      {
        id: '1',
        title: 'Ubicación geográfica',
        description: `Tu ubicación en ${getCityName(formData.city)} afecta el precio debido a factores de riesgo local.`,
        impact: formData.city === 'bogota' ? 'negative' : 'neutral',
      },
      {
        id: '2',
        title: 'Valor de la propiedad',
        description: `El valor de ${formatPrice(propertyValueNum)} determina el nivel de cobertura necesario.`,
        impact: 'neutral',
      },
      {
        id: '3',
        title: 'Deducible seleccionado',
        description: `Un deducible de ${formatPrice(deductibleNum)} ${deductibleNum >= 1000000 ? 'reduce' : 'mantiene'} el precio mensual.`,
        impact: deductibleNum >= 1000000 ? 'positive' : 'neutral',
      },
      {
        id: '4',
        title: 'Historial de siniestros',
        description: 'Basado en datos históricos de la zona, el riesgo es bajo.',
        impact: 'positive',
      },
    ];

    // Generar ajustes sugeridos
    const suggestedAdjustments: ExplanationItem[] = [];
    
    if (deductibleNum < 1000000) {
      suggestedAdjustments.push({
        id: 'adj1',
        title: 'Aumenta tu deducible',
        description: 'Incrementar el deducible a $1.000.000 podría reducir tu cuota mensual hasta 15%.',
        impact: 'positive',
      });
    }

    if (formData.city === 'bogota') {
      suggestedAdjustments.push({
        id: 'adj2',
        title: 'Considera sistemas de seguridad',
        description: 'Instalar alarma o cámaras puede reducir tu prima hasta 10%.',
        impact: 'positive',
      });
    }

    suggestedAdjustments.push({
      id: 'adj3',
      title: 'Pago anual anticipado',
      description: 'Pagar el año completo por adelantado te da un descuento del 8%.',
      impact: 'positive',
    });

    // Generar resultado
    const result: AIResult = {
      planName: `Plan ${getServiceName(formData.service)} Premium`,
      confidence,
      monthlyPrice: finalPrice,
      priceReasons,
      suggestedAdjustments,
    };

    setAiResult(result);
    setIsGenerating(false);
  };

  // Handler para guardar simulación
  const handleSave = () => {
    console.log('Guardando simulación:', formData);
    alert('Simulación guardada correctamente ✓');
    // TODO: Implementar guardado en backend/localStorage
  };

  // Handler para comprar ahora
  const handleBuyNow = () => {
    if (!aiResult) return;
    console.log('Comprar plan:', aiResult.planName);
    // TODO: Navegar a checkout con datos pre-llenados
    router.push('/dashboard/tienda');
  };

  // Handler para comparar planes
  const handleComparePlans = () => {
    console.log('Comparar planes');
    // TODO: Navegar a página de comparación
    router.push('/dashboard/tienda');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Simulador con IA
          </h1>
          <p className="text-slate-600">
            Obtén cotizaciones personalizadas impulsadas por inteligencia artificial
          </p>
        </div>

        {/* Banner informativo */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold mb-2">
                Cotización inteligente en segundos
              </h2>
              <p className="text-sm text-purple-100 mb-3">
                Nuestra IA analiza miles de variables para ofrecerte el mejor plan según tus necesidades específicas.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Análisis en tiempo real</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Precios transparentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Explicación detallada</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout en 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda - Formulario */}
          <div>
            <SimulatorForm
              formData={formData}
              onChange={handleFormChange}
              onGenerate={handleGenerateQuote}
              onSave={handleSave}
              isGenerating={isGenerating}
            />
          </div>

          {/* Columna derecha - Resultado IA */}
          <div className="lg:sticky lg:top-6 self-start">
            <AIResultCard
              result={aiResult}
              isLoading={isGenerating}
              onBuyNow={handleBuyNow}
              onComparePlans={handleComparePlans}
            />
          </div>
        </div>

        {/* Footer con info adicional */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            ¿Cómo funciona nuestro simulador IA?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">
                  Completa el formulario
                </p>
                <p className="text-xs text-slate-600">
                  Proporciona información básica sobre tu necesidad
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">
                  IA analiza tus datos
                </p>
                <p className="text-xs text-slate-600">
                  Procesamos miles de variables en segundos
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 mb-1">
                  Recibe tu cotización
                </p>
                <p className="text-xs text-slate-600">
                  Obtén un plan personalizado con explicación detallada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Funciones auxiliares
function getCityName(cityCode: string): string {
  const cities: Record<string, string> = {
    bogota: 'Bogotá',
    medellin: 'Medellín',
    cali: 'Cali',
    barranquilla: 'Barranquilla',
    cartagena: 'Cartagena',
    bucaramanga: 'Bucaramanga',
  };
  return cities[cityCode] || cityCode;
}

function getServiceName(serviceCode: string): string {
  const services: Record<string, string> = {
    'seguro-hogar': 'Seguro Hogar',
    'asistencia-vehicular': 'Asistencia Vehicular',
    'plan-salud': 'Plan de Salud',
    'mantenimiento-hogar': 'Mantenimiento Hogar',
    'seguro-viajes': 'Seguro de Viajes',
    'proteccion-compras': 'Protección de Compras',
  };
  return services[serviceCode] || 'Servicio';
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-CO')}`;
}
