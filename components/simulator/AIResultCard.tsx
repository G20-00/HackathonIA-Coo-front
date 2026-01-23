// components/simulator/AIResultCard.tsx
// Componente: Card de resultado de simulación con IA

'use client';

import React from 'react';
import ExplanationList, { ExplanationItem } from './ExplanationList';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export interface AIResult {
  planName: string;
  confidence: number; // 0-100
  monthlyPrice: number;
  priceReasons: ExplanationItem[];
  suggestedAdjustments: ExplanationItem[];
}

interface AIResultCardProps {
  result: AIResult | null;
  isLoading: boolean;
  onBuyNow: () => void;
  onComparePlans: () => void;
}

/**
 * AIResultCard
 * 
 * Muestra el resultado de la simulación de IA:
 * - Plan recomendado
 * - Nivel de confianza
 * - Precio estimado
 * - Explicaciones y ajustes sugeridos
 * 
 * @param result - Datos del resultado de IA (null si no hay)
 * @param isLoading - Estado de carga
 * @param onBuyNow - Callback para comprar ahora
 * @param onComparePlans - Callback para comparar planes
 */
const AIResultCard: React.FC<AIResultCardProps> = ({
  result,
  isLoading,
  onBuyNow,
  onComparePlans,
}) => {
  // Estado vacío
  if (!result && !isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            IA lista para ayudarte
          </h3>
          <p className="text-slate-600 text-sm">
            Completa el formulario y genera una cotización personalizada con inteligencia artificial
          </p>
        </div>
      </div>
    );
  }

  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-pulse">
            <span className="text-4xl">🤖</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Analizando tu información...
          </h3>
          <p className="text-slate-600 text-sm">
            La IA está procesando tus datos para generar la mejor cotización
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Resultado con datos
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🤖</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Resultado IA
          </h2>
          <p className="text-sm text-slate-600">
            Basado en el análisis de tus necesidades
          </p>
        </div>
      </div>

      {/* Plan recomendado */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700">Plan recomendado</span>
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            IA
          </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          {result.planName}
        </h3>
        
        {/* Nivel de confianza */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-600">Nivel de confianza</span>
            <span className="text-xs font-semibold text-slate-900">{result.confidence}%</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Precio */}
        <div className="bg-white rounded-lg p-4">
          <span className="text-sm text-slate-600 block mb-1">Precio estimado</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-900">
              ${result.monthlyPrice.toLocaleString('es-CO')}
            </span>
            <span className="text-slate-600">/mes</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            * Impuestos incluidos. Precio final puede variar según términos y condiciones.
          </p>
        </div>
      </div>

      {/* Explicación - Razones del precio */}
      <ExplanationList
        title="💡 ¿Por qué este precio?"
        items={result.priceReasons}
      />

      {/* Explicación - Ajustes sugeridos */}
      {result.suggestedAdjustments.length > 0 && (
        <ExplanationList
          title="⚡ Ajustes sugeridos para optimizar"
          items={result.suggestedAdjustments}
        />
      )}

      {/* Botones de acción */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <PrimaryButton onClick={onBuyNow} className="w-full">
          💳 Comprar ahora
        </PrimaryButton>
        <SecondaryButton onClick={onComparePlans} className="w-full">
          📊 Comparar planes
        </SecondaryButton>
      </div>

      {/* Tip de contacto */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-lg">💡</span>
          <div className="flex-1">
            <p className="text-sm text-slate-700 font-medium mb-1">
              ¿Necesitas ayuda personalizada?
            </p>
            <p className="text-xs text-slate-600 mb-2">
              Nuestro equipo está disponible para asesorarte
            </p>
            <div className="flex gap-2">
              <a 
                href="mailto:soporte@hackathonia.com"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                📧 Email
              </a>
              <span className="text-slate-300">•</span>
              <a 
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResultCard;
