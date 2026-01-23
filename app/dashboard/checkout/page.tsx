// app/dashboard/checkout/page.tsx
// Page: Checkout and payment processing

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OrderSummaryCard, { OrderData } from '@/components/checkout/OrderSummaryCard';
import CheckoutForm, { CheckoutFormData } from '@/components/checkout/CheckoutForm';
import PaymentMethodCard from '@/components/checkout/PaymentMethodCard';
import SecurityInfoCard from '@/components/checkout/SecurityInfoCard';
import StatusCard, { StatusData } from '@/components/checkout/StatusCard';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

/**
 * Checkout Page
 * 
 * Complete checkout flow with:
 * - Order summary
 * - Customer information form
 * - Bold payment integration explanation
 * - Security information
 * - Real-time status tracking
 * 
 * Layout: 2 columns (form left, security/status right)
 */
export default function CheckoutPage() {
  const router = useRouter();

  // Mock order data (would come from cart/service selection)
  const [orderData] = useState<OrderData>({
    serviceName: 'Seguro Hogar',
    planName: 'Plan Premium',
    frequency: 'monthly',
    price: 89900,
    discount: 5000,
  });

  // Form data
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    document: '',
    address: '',
    city: '',
    email: '',
    phone: '',
  });

  // Form errors
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  // Status tracking
  const [status, setStatus] = useState<StatusData>({
    orderStatus: 'pending',
    transactionStatus: 'idle',
    webhookStatus: 'waiting',
  });

  // Loading states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle form field change
  const handleFormChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!formData.city) {
      newErrors.city = 'Selecciona una ciudad';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido (10 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle payment with Bold
  const handlePayWithBold = async () => {
    // Validate form first
    if (!validateForm()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setIsProcessing(true);

    // Update status to processing
    setStatus(prev => ({
      ...prev,
      orderStatus: 'processing',
      transactionStatus: 'pending',
      lastUpdated: new Date(),
    }));

    try {
      // TODO: Call backend API to create Bold payment link
      // const response = await fetch('/api/payments/create-bold-link', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     order: orderData,
      //     customer: formData,
      //     idempotencyKey: generateIdempotencyKey(),
      //   }),
      // });
      // const { paymentUrl } = await response.json();

      // Simulate API call (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful link generation
      console.log('Payment link generated');
      console.log('Order:', orderData);
      console.log('Customer:', formData);

      // Update status
      setStatus(prev => ({
        ...prev,
        transactionStatus: 'pending',
        lastUpdated: new Date(),
      }));

      // In production: redirect to Bold payment page
      // window.location.href = paymentUrl;

      // For demo: show success message
      alert('✓ Redirigiendo a Bold para completar el pago...\n\n(En producción se abriría la página de pago de Bold)');
      
      // Simulate successful payment after redirect
      setTimeout(() => {
        setStatus({
          orderStatus: 'completed',
          transactionStatus: 'approved',
          webhookStatus: 'processed',
          lastUpdated: new Date(),
        });
        setIsProcessing(false);
      }, 1000);

    } catch (error) {
      console.error('Payment error:', error);
      setStatus(prev => ({
        ...prev,
        orderStatus: 'failed',
        transactionStatus: 'error',
        lastUpdated: new Date(),
      }));
      alert('Error al procesar el pago. Por favor intenta nuevamente.');
      setIsProcessing(false);
    }
  };

  // Handle save order (draft)
  const handleSaveOrder = async () => {
    if (!validateForm()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSaving(true);

    try {
      // TODO: Call backend API to save order draft
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Order saved:', { order: orderData, customer: formData });
      alert('✓ Orden guardada correctamente. Puedes completarla más tarde.');
      
    } catch (error) {
      console.error('Save error:', error);
      alert('Error al guardar la orden. Por favor intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-3"
          >
            ← Volver
          </button>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Finalizar compra
          </h1>
          <p className="text-slate-600">
            Completa tu información y procede al pago seguro
          </p>
        </div>

        {/* Progress indicator */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="text-sm font-medium text-slate-900">Información</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm text-slate-600">Pago</span>
            </div>
            <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="text-sm text-slate-600">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Main content - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Form (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order summary */}
            <OrderSummaryCard order={orderData} />

            {/* Customer form */}
            <CheckoutForm
              formData={formData}
              onChange={handleFormChange}
              errors={errors}
            />

            {/* Payment method */}
            <PaymentMethodCard />

            {/* Action buttons */}
            <div className="flex gap-3">
              <PrimaryButton
                onClick={handlePayWithBold}
                disabled={isProcessing}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⚙️</span>
                    Procesando...
                  </>
                ) : (
                  <>💳 Pagar con Bold</>
                )}
              </PrimaryButton>

              <SecondaryButton
                onClick={handleSaveOrder}
                disabled={isSaving || isProcessing}
                className="px-6"
              >
                {isSaving ? '⏳' : '💾'} Guardar
              </SecondaryButton>
            </div>
          </div>

          {/* Right column - Security & Status (1/3 width, sticky) */}
          <div className="space-y-6 lg:sticky lg:top-6 self-start">
            {/* Security info */}
            <SecurityInfoCard />

            {/* Status tracking */}
            <StatusCard status={status} />
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            💡 ¿Tienes dudas?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-700 font-medium mb-1">
                Política de cancelación
              </p>
              <p className="text-xs text-slate-600">
                Puedes cancelar tu servicio en cualquier momento sin penalización.
              </p>
            </div>
            <div>
              <p className="text-slate-700 font-medium mb-1">
                Soporte 24/7
              </p>
              <p className="text-xs text-slate-600">
                Nuestro equipo está disponible por chat, email o teléfono.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
