'use client';

import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useCart } from '@/lib/hooks/useCart';
import { useToast } from '@/lib/hooks/useToast';

export default function CarritoPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const toast = useToast();

  const handleUpdateQuantity = (serviceId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(serviceId, newQuantity);
    toast.success('Cantidad actualizada');
  };

  const handleRemoveItem = (serviceId: number, serviceName: string) => {
    removeItem(serviceId);
    toast.success(`${serviceName} eliminado del carrito`);
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    clearCart();
    toast.success('Carrito vaciado');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.warning('El carrito está vacío');
      return;
    }
    router.push('/dashboard/checkout');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Carrito de Compras</h1>
        <p className="mt-1 text-sm text-slate-600">
          Revisa y administra los servicios en tu carrito
        </p>
      </div>

      {items.length === 0 ? (
        /* Carrito vacío */
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-16">
          <svg className="mb-4 h-16 w-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">
            Tu carrito está vacío
          </h3>
          <p className="mb-4 text-sm text-slate-600">
            Agrega servicios desde la tienda para comenzar
          </p>
          <PrimaryButton onClick={() => router.push('/dashboard/tienda')}>
            Ir a la tienda
          </PrimaryButton>
        </div>
      ) : (
        /* Carrito con items */
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lista de items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.serviceId}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.serviceName}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Precio unitario: ${item.price.toLocaleString('es-CO')}
                      </p>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => handleRemoveItem(item.serviceId, item.serviceName)}
                      className="ml-4 rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Control de cantidad y subtotal */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-700">Cantidad:</span>
                      <div className="flex items-center rounded-lg border border-slate-300">
                        <button
                          onClick={() => handleUpdateQuantity(item.serviceId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1.5 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="px-4 py-1.5 text-sm font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.serviceId, item.quantity + 1)}
                          className="px-3 py-1.5 text-slate-700 hover:bg-slate-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500">Subtotal</p>
                      <p className="text-xl font-bold text-slate-900">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón vaciar carrito */}
            <div className="mt-4">
              <button
                onClick={handleClearCart}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Resumen de Compra
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Items</span>
                  <span className="font-medium text-slate-900">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ${getTotalPrice().toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${getTotalPrice().toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              </div>

              <PrimaryButton
                onClick={handleCheckout}
                fullWidth
                className="mb-3"
              >
                Proceder al Pago
              </PrimaryButton>

              <button
                onClick={() => router.push('/dashboard/tienda')}
                className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
              >
                Continuar comprando
              </button>

              {/* Info adicional */}
              <div className="mt-6 space-y-2">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <svg className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Pago seguro con encriptación SSL</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <svg className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Soporte 24/7 para tus compras</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
