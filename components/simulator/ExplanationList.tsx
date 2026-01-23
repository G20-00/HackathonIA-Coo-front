// components/simulator/ExplanationList.tsx
// Componente: Lista de explicaciones de la IA

import React from 'react';

export interface ExplanationItem {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'neutral' | 'negative';
}

interface ExplanationListProps {
  title: string;
  items: ExplanationItem[];
}

/**
 * ExplanationList
 * 
 * Muestra una lista de explicaciones o razones de la IA.
 * Útil para mostrar factores de precio, ajustes sugeridos, etc.
 * 
 * @param title - Título de la sección
 * @param items - Lista de items explicativos
 */
const ExplanationList: React.FC<ExplanationListProps> = ({ title, items }) => {
  // Iconos según impacto
  const impactConfig = {
    positive: { icon: '✓', color: 'text-green-600', bg: 'bg-green-50' },
    neutral: { icon: '•', color: 'text-blue-600', bg: 'bg-blue-50' },
    negative: { icon: '!', color: 'text-orange-600', bg: 'bg-orange-50' },
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item) => {
          const config = impactConfig[item.impact];
          return (
            <div 
              key={item.id}
              className={`flex gap-3 p-3 rounded-lg ${config.bg}`}
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center ${config.color} font-bold text-sm`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">
                  {item.title}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExplanationList;
