/**
 * Página Dashboard (Inicio)
 * Dashboard principal con input de IA, cards informativas y tabla de actividad
 * - Input principal para consultas con IA
 * - Cards de acciones rápidas
 * - Card de recomendación por IA
 * - Card de estado de pagos
 * - Tabla de actividad reciente con acciones
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PrimaryButton from '@/components/ui/PrimaryButton';
import ActionCard from '@/components/ui/ActionCard';
import StatusBadge from '@/components/ui/StatusBadge';
import DataTable, { TableColumn, TableAction } from '@/components/ui/DataTable';
import { useToast } from '@/lib/hooks/useToast';

export default function DashboardPage() {
  const router = useRouter();
  const toast = useToast();
  const [aiQuery, setAiQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Maneja la consulta de IA
   */
  const handleAIQuery = () => {
    if (!aiQuery.trim()) return;

    setIsProcessing(true);
    // Simular procesamiento de IA
    setTimeout(() => {
      toast.success(`Consulta procesada: "${aiQuery}"`);
      setIsProcessing(false);
      setAiQuery('');
    }, 2000);
  };

  /**
   * Datos mock para actividad reciente
   */
  const activityData = [
    {
      fecha: '2026-01-23',
      tipo: 'Compra',
      detalle: 'Plan Salud Premium',
      estado: 'completado',
      monto: '$450.000',
    },
    {
      fecha: '2026-01-22',
      tipo: 'Simulación',
      detalle: 'Plan Familiar Plus',
      estado: 'pendiente',
      monto: '-',
    },
    {
      fecha: '2026-01-21',
      tipo: 'Pago',
      detalle: 'Factura #4521',
      estado: 'completado',
      monto: '$120.000',
    },
    {
      fecha: '2026-01-20',
      tipo: 'Consulta',
      detalle: 'Alianzas disponibles',
      estado: 'completado',
      monto: '-',
    },
    {
      fecha: '2026-01-19',
      tipo: 'Compra',
      detalle: 'Seguro Dental',
      estado: 'error',
      monto: '$85.000',
    },
  ];

  /**
   * Configuración de columnas para la tabla
   */
  const tableColumns: TableColumn[] = [
    {
      key: 'fecha',
      label: 'Fecha',
      render: (value) => (
        <span className="font-medium">{new Date(value).toLocaleDateString('es-ES')}</span>
      ),
    },
    {
      key: 'tipo',
      label: 'Tipo',
      render: (value) => (
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          {value}
        </span>
      ),
    },
    {
      key: 'detalle',
      label: 'Detalle',
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => {
        const variants: Record<string, any> = {
          completado: 'success',
          pendiente: 'warning',
          error: 'error',
        };
        const labels: Record<string, string> = {
          completado: 'Completado',
          pendiente: 'Pendiente',
          error: 'Error',
        };
        return <StatusBadge label={labels[value]} variant={variants[value]} size="sm" />;
      },
    },
    {
      key: 'monto',
      label: 'Monto',
      render: (value) => (
        <span className="font-semibold text-slate-900">{value}</span>
      ),
    },
  ];

  /**
   * Acciones disponibles para cada fila
   */
  const tableActions: TableAction[] = [
    {
      label: 'Ver',
      variant: 'primary',
      onClick: (row) => toast.info(`Detalles de: ${row.detalle}`),
      icon: (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      label: 'Descargar',
      variant: 'secondary',
      onClick: (row) => toast.success(`Descargando: ${row.detalle}`),
      icon: (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {/* Título de la página */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Bienvenido de nuevo, aquí está tu resumen de actividad
        </p>
      </div>

      {/* Input principal con IA */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Asistente IA</h2>
          <StatusBadge label="Activo" variant="success" size="sm" />
        </div>
        
        <div className="flex gap-3">
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAIQuery()}
            placeholder="¿Qué necesitas hoy? Ej: Quiero un plan familiar con cobertura dental..."
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <PrimaryButton
            onClick={handleAIQuery}
            loading={isProcessing}
            disabled={isProcessing || !aiQuery.trim()}
            fullWidth={false}
            className="px-8"
          >
            Consultar
          </PrimaryButton>
        </div>
      </div>

      {/* Grid de cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Acciones rápidas */}
        <ActionCard
          title="Comprar"
          description="Explora y adquiere nuevos planes"
          variant="blue"
          onClick={() => router.push('/dashboard/tienda')}
          icon={
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />

        <ActionCard
          title="Simular"
          description="Prueba planes con IA"
          variant="purple"
          onClick={() => toast.info('Simulador próximamente')}
          icon={
            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />

        <ActionCard
          title="Alianzas"
          description="Descuentos y beneficios"
          variant="green"
          onClick={() => toast.info('Alianzas próximamente')}
          icon={
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          }
        />

        <ActionCard
          title="Mis Órdenes"
          description="Historial de compras"
          variant="orange"
          onClick={() => router.push('/dashboard/ordenes')}
          icon={
            <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
      </div>

      {/* Cards informativas en grid */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Recomendación IA */}
        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recomendado por IA</h3>
            <StatusBadge label="Nuevo" variant="info" size="sm" />
          </div>
          
          <div className="mb-4 rounded-lg bg-white p-4">
            <p className="mb-2 text-2xl font-bold text-slate-900">Plan Familia Plus</p>
            <p className="text-sm text-slate-600">
              Basado en tu historial y necesidades, este plan ofrece la mejor relación calidad-precio
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-600">Confianza IA</p>
              <p className="text-2xl font-bold text-green-600">94%</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Ahorro estimado</p>
              <p className="text-2xl font-bold text-blue-600">$180K/año</p>
            </div>
          </div>

          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Ver detalles del plan
          </button>
        </div>

        {/* Estado de pagos */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Estado de Pagos</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Última compra</p>
                <p className="mt-1 text-lg font-bold text-slate-900">Plan Salud Premium</p>
              </div>
              <StatusBadge label="Pagado" variant="success" />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Próxima factura</p>
                <p className="mt-1 text-lg font-bold text-slate-900">28 Enero 2026</p>
              </div>
              <StatusBadge label="Pendiente" variant="warning" />
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Método de pago</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  •••• 4521
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de actividad reciente */}
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Actividad Reciente</h2>
        <DataTable
          columns={tableColumns}
          data={activityData}
          actions={tableActions}
        />
      </div>
    </DashboardLayout>
  );
}
