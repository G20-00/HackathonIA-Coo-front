'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PrimaryButton from '@/components/ui/PrimaryButton';
import InputField from '@/components/ui/InputField';
import { useCart } from '@/lib/hooks/useCart';
import { useAuth } from '@/lib/hooks/useAuth';
import { useToast } from '@/lib/hooks/useToast';
import { ordersApi, paymentsApi } from '@/lib/api';
import { PaymentMethod } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Nuevo estado para pago exitoso
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });

  // Redirigir si el carrito está vacío o no está autenticado
  useEffect(() => {
    if (redirecting || authLoading || paymentSuccess) return; // Esperar a que termine de cargar auth o si el pago fue exitoso

    if (items.length === 0) {
      setRedirecting(true);
      toast.warning('El carrito está vacío');
      router.push('/dashboard/carrito');
      return;
    }

    if (!isAuthenticated) {
      setRedirecting(true);
      toast.error('Debes iniciar sesión para continuar');
      router.push('/');
      return;
    }
  }, [items.length, isAuthenticated, authLoading, router, redirecting, paymentSuccess]);

  // Mostrar loading mientras se validan las condiciones
  if (authLoading || (items.length === 0 && !paymentSuccess) || (!authLoading && !isAuthenticated)) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm text-slate-600">
            {authLoading ? 'Cargando...' : 'Redirigiendo...'}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  // Mostrar mensaje de éxito mientras redirige después del pago
  if (paymentSuccess) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">¡Pago exitoso!</h3>
          <p className="text-sm text-slate-600">Redirigiendo a los detalles de tu orden...</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (paymentMethod === PaymentMethod.CREDIT_CARD || paymentMethod === PaymentMethod.DEBIT_CARD) {
      if (!cardData.cardNumber || !cardData.cardHolderName || !cardData.expirationDate || !cardData.cvv) {
        toast.error('Por favor completa todos los campos de la tarjeta');
        return false;
      }

      // Validación básica de número de tarjeta
      if (cardData.cardNumber.replace(/\s/g, '').length < 13) {
        toast.error('Número de tarjeta inválido');
        return false;
      }

      // Validación de fecha de expiración
      if (!/^\d{2}\/\d{2}$/.test(cardData.expirationDate)) {
        toast.error('Fecha de expiración inválida (formato MM/AA)');
        return false;
      }

      // Validación de CVV
      if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
        toast.error('CVV inválido');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // 1. Crear la orden
      const orderData = {
        items: items.map((item) => ({
          serviceId: item.serviceId,
          quantity: item.quantity,
        })),
      };

      toast.info('Creando orden...');
      const order = await ordersApi.createOrder(orderData);

      // 2. Procesar el pago
      const paymentData = {
        orderId: order.id,
        paymentMethod: paymentMethod, // Backend espera "paymentMethod"
        cardNumber: cardData.cardNumber.replace(/\s/g, ''),
        cardHolderName: cardData.cardHolderName,
        expiryDate: cardData.expirationDate, // Backend espera "expiryDate"
        cvv: cardData.cvv,
      };

      toast.info('Procesando pago...');
      const payment = await paymentsApi.processPayment(paymentData);

      // El backend devuelve COMPLETED para pagos exitosos
      if (payment.status === 'COMPLETED' || payment.status === 'PROCESSING') {
        toast.success('¡Compra realizada con éxito!');
        setPaymentSuccess(true); // Marcar pago como exitoso ANTES de limpiar el carrito
        clearCart();

        // Redirigir a página de confirmación con el ID de la orden
        setTimeout(() => {
          router.push(`/dashboard/ordenes/${order.id}`);
        }, 1500);
      } else if (payment.status === 'FAILED') {
        toast.error('Pago rechazado. Por favor, intenta con otro método de pago.');
      } else if (payment.status === 'PENDING') {
        toast.warning('Pago pendiente de confirmación. Te notificaremos cuando se complete.');
        setPaymentSuccess(true); // También marcar como exitoso para pagos pendientes
        setTimeout(() => {
          router.push(`/dashboard/ordenes/${order.id}`);
        }, 2000);
      } else {
        toast.error('Estado de pago desconocido. Por favor, verifica tu orden.');
      }
    } catch (error: any) {
      console.error('Error en checkout:', error);
      const errorMessage = error?.response?.data?.message || 'Error al procesar la compra. Por favor, intenta de nuevo.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
        <p className="mt-1 text-sm text-slate-600">
          Completa tu compra de forma segura
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Formulario de pago */}
          <div className="lg:col-span-2 space-y-6">
            {/* Método de pago */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Método de Pago
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)}
                  className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === PaymentMethod.CREDIT_CARD
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <svg className="h-8 w-8 text-slate-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-xs font-medium text-slate-900">Tarjeta de Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethod.DEBIT_CARD)}
                  className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === PaymentMethod.DEBIT_CARD
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <svg className="h-8 w-8 text-slate-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-xs font-medium text-slate-900">Tarjeta Débito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethod.PSE)}
                  className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === PaymentMethod.PSE
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <svg className="h-8 w-8 text-slate-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <span className="text-xs font-medium text-slate-900">PSE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod(PaymentMethod.CASH)}
                  className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === PaymentMethod.CASH
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <svg className="h-8 w-8 text-slate-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-xs font-medium text-slate-900">Efectivo</span>
                </button>
              </div>
            </div>

            {/* Datos de tarjeta (solo si es tarjeta) */}
            {(paymentMethod === PaymentMethod.CREDIT_CARD || paymentMethod === PaymentMethod.DEBIT_CARD) && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Información de la Tarjeta
                </h3>

                <div className="space-y-4">
                  <InputField
                    label="Número de Tarjeta"
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                  />

                  <InputField
                    label="Nombre del Titular"
                    id="cardHolderName"
                    name="cardHolderName"
                    type="text"
                    placeholder="JUAN PEREZ"
                    value={cardData.cardHolderName}
                    onChange={handleInputChange}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Fecha de Vencimiento"
                      id="expirationDate"
                      name="expirationDate"
                      type="text"
                      placeholder="MM/AA"
                      value={cardData.expirationDate}
                      onChange={handleInputChange}
                      maxLength={5}
                    />

                    <InputField
                      label="CVV"
                      id="cvv"
                      name="cvv"
                      type="text"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                    />
                  </div>
                </div>

                {/* Información de seguridad */}
                <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-blue-800">
                      Tu información está protegida con encriptación SSL de 256 bits
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info de PSE o Efectivo */}
            {paymentMethod === PaymentMethod.PSE && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Pago PSE
                </h3>
                <p className="text-sm text-slate-600">
                  Serás redirigido a la plataforma PSE para completar tu pago de forma segura.
                </p>
              </div>
            )}

            {paymentMethod === PaymentMethod.CASH && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Pago en Efectivo
                </h3>
                <p className="text-sm text-slate-600 mb-3">
                  Genera tu código de pago y págalo en cualquiera de nuestros puntos autorizados:
                </p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                  <li>Bancolombia</li>
                  <li>Efecty</li>
                  <li>Baloto</li>
                  <li>Su Red</li>
                </ul>
              </div>
            )}
          </div>

          {/* Resumen de compra */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Resumen de Compra
              </h3>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.serviceId} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{item.serviceName}</p>
                      <p className="text-xs text-slate-500">Cantidad: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-slate-900">
                      ${(item.price * item.quantity).toLocaleString('es-CO')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ${getTotalPrice().toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-slate-900">Total a Pagar</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${getTotalPrice().toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <PrimaryButton
                type="submit"
                loading={loading}
                disabled={loading}
                fullWidth
              >
                {loading ? 'Procesando...' : 'Confirmar y Pagar'}
              </PrimaryButton>

              <button
                type="button"
                onClick={() => router.push('/dashboard/carrito')}
                className="mt-3 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                Volver al carrito
              </button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
