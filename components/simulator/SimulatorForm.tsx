// components/simulator/SimulatorForm.tsx
// Componente: Formulario de simulación de cotización con IA

'use client';

import React from 'react';
import FormSelect from '@/components/ui/FormSelect';
import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export interface SimulatorFormData {
  service: string;
  city: string;
  propertyValue: string;
  deductible: string;
  message: string;
}

interface SimulatorFormProps {
  formData: SimulatorFormData;
  onChange: (field: keyof SimulatorFormData, value: string) => void;
  onGenerate: () => void;
  onSave: () => void;
  isGenerating: boolean;
}

/**
 * SimulatorForm
 * 
 * Formulario guiado para simulación de cotización con IA.
 * Incluye campos específicos para servicios de seguro y hogar.
 * 
 * @param formData - Datos actuales del formulario
 * @param onChange - Callback para cambios en campos
 * @param onGenerate - Callback para generar cotización
 * @param onSave - Callback para guardar simulación
 * @param isGenerating - Estado de carga durante generación
 */
const SimulatorForm: React.FC<SimulatorFormProps> = ({
  formData,
  onChange,
  onGenerate,
  onSave,
  isGenerating,
}) => {
  // Opciones de servicios
  const serviceOptions = [
    { value: '', label: 'Selecciona un servicio' },
    { value: 'seguro-hogar', label: 'Seguro Hogar' },
    { value: 'asistencia-vehicular', label: 'Asistencia Vehicular' },
    { value: 'plan-salud', label: 'Plan de Salud' },
    { value: 'mantenimiento-hogar', label: 'Mantenimiento Hogar' },
    { value: 'seguro-viajes', label: 'Seguro de Viajes' },
    { value: 'proteccion-compras', label: 'Protección de Compras' },
  ];

  // Opciones de ciudades
  const cityOptions = [
    { value: '', label: 'Selecciona una ciudad' },
    { value: 'bogota', label: 'Bogotá' },
    { value: 'medellin', label: 'Medellín' },
    { value: 'cali', label: 'Cali' },
    { value: 'barranquilla', label: 'Barranquilla' },
    { value: 'cartagena', label: 'Cartagena' },
    { value: 'bucaramanga', label: 'Bucaramanga' },
  ];

  // Opciones de deducible
  const deductibleOptions = [
    { value: '', label: 'Selecciona un deducible' },
    { value: '250000', label: '$250.000' },
    { value: '500000', label: '$500.000' },
    { value: '1000000', label: '$1.000.000' },
    { value: '2000000', label: '$2.000.000' },
  ];

  // Validar si el formulario está completo
  const isFormValid = 
    formData.service && 
    formData.city && 
    formData.propertyValue && 
    formData.deductible;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Describe tu necesidad
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <span className="text-blue-600 text-lg">🔒</span>
          <p className="text-sm text-blue-900">
            <strong>Tu privacidad es importante.</strong> Toda la información compartida está protegida 
            con encriptación de extremo a extremo y nunca será compartida sin tu consentimiento.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="space-y-5">
        {/* Servicio */}
        <FormSelect
          label="Tipo de servicio"
          id="service"
          options={serviceOptions}
          value={formData.service}
          onChange={(e) => onChange('service', e.target.value)}
          helperText="Selecciona el servicio que deseas cotizar"
        />

        {/* Ciudad */}
        <FormSelect
          label="Ciudad"
          id="city"
          options={cityOptions}
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
          helperText="La ubicación afecta el precio de tu cotización"
        />

        {/* Valor de vivienda */}
        <InputField
          label="Valor estimado de la propiedad"
          id="propertyValue"
          type="text"
          value={formData.propertyValue}
          onChange={(e) => onChange('propertyValue', e.target.value)}
          placeholder="Ej: 300000000"
          helperText="Ingresa el valor aproximado en pesos colombianos"
        />

        {/* Deducible */}
        <FormSelect
          label="Deducible preferido"
          id="deductible"
          options={deductibleOptions}
          value={formData.deductible}
          onChange={(e) => onChange('deductible', e.target.value)}
          helperText="Cantidad que pagarías en caso de siniestro"
        />

        {/* Mensaje opcional */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Mensaje opcional
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => onChange('message', e.target.value)}
            rows={4}
            placeholder="Cuéntanos más detalles sobre tu necesidad..."
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          />
          <p className="mt-2 text-xs text-slate-600">
            Agrega cualquier detalle adicional que pueda ayudar a la IA
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <PrimaryButton
          onClick={onGenerate}
          disabled={!isFormValid || isGenerating}
          className="flex-1"
        >
          {isGenerating ? (
            <>
              <span className="inline-block animate-spin mr-2">⚙️</span>
              Generando...
            </>
          ) : (
            <>
              <span className="mr-2">🤖</span>
              Generar cotización
            </>
          )}
        </PrimaryButton>

        <SecondaryButton
          onClick={onSave}
          disabled={!isFormValid}
          className="px-6"
        >
          💾 Guardar
        </SecondaryButton>
      </div>
    </div>
  );
};

export default SimulatorForm;
