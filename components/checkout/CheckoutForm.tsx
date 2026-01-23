// components/checkout/CheckoutForm.tsx
// Component: Customer information form for checkout

'use client';

import React from 'react';
import InputField from '@/components/ui/InputField';

export interface CheckoutFormData {
  fullName: string;
  document: string;
  address: string;
  city: string;
  email: string;
  phone: string;
}

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  errors?: Partial<Record<keyof CheckoutFormData, string>>;
}

/**
 * CheckoutForm
 * 
 * Form for collecting customer information during checkout.
 * Includes validation support and error display.
 * 
 * @param formData - Current form data
 * @param onChange - Callback for field changes
 * @param errors - Validation errors (optional)
 */
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  onChange,
  errors = {},
}) => {
  // City options
  const cities = [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Cartagena',
    'Bucaramanga',
    'Pereira',
    'Manizales',
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Información de contacto
      </h2>

      <div className="space-y-5">
        {/* Full name */}
        <InputField
          label="Nombre completo"
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder="Juan Pérez"
          error={errors.fullName}
          required
        />

        {/* Document (optional) */}
        <InputField
          label="Documento de identidad"
          id="document"
          type="text"
          value={formData.document}
          onChange={(e) => onChange('document', e.target.value)}
          placeholder="1234567890"
          helperText="Opcional - Solo para facturación"
          error={errors.document}
        />

        {/* Address */}
        <InputField
          label="Dirección"
          id="address"
          type="text"
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Calle 123 #45-67"
          error={errors.address}
          required
        />

        {/* City */}
        <div>
          <label 
            htmlFor="city" 
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Ciudad <span className="text-red-500">*</span>
          </label>
          <select
            id="city"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.city ? 'border-red-500' : 'border-slate-300'
            }`}
          >
            <option value="">Selecciona una ciudad</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        {/* Email */}
        <InputField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="correo@ejemplo.com"
          helperText="Recibirás la confirmación aquí"
          error={errors.email}
          required
        />

        {/* Phone */}
        <InputField
          label="Teléfono"
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="3001234567"
          helperText="Para notificaciones y soporte"
          error={errors.phone}
          required
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
