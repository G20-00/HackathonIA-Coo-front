/**
 * DataTable Component
 * Tabla de datos con columnas personalizables y acciones
 * - Headers configurables
 * - Filas con datos dinámicos
 * - Botones de acción por fila
 * - Estilos responsive con scroll horizontal
 */

'use client';

import React from 'react';
import StatusBadge from './StatusBadge';

// Tipos
export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableAction {
  label: string;
  onClick: (row: any) => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: React.ReactNode;
}

interface DataTableProps {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  emptyMessage?: string;
}

// Estilos de botones de acción
const actionStyles = {
  primary: 'text-blue-600 hover:bg-blue-50 border-blue-200',
  secondary: 'text-slate-600 hover:bg-slate-50 border-slate-200',
  success: 'text-green-600 hover:bg-green-50 border-green-200',
  danger: 'text-red-600 hover:bg-red-50 border-red-200',
};

export default function DataTable({ 
  columns, 
  data, 
  actions,
  emptyMessage = 'No hay datos para mostrar' 
}: DataTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  {column.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-200 bg-white">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition-colors hover:bg-slate-50"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-6 py-4 text-sm text-slate-900"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  
                  {/* Columna de acciones */}
                  {actions && actions.length > 0 && (
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            className={`inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                              actionStyles[action.variant || 'secondary']
                            }`}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
