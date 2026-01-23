// components/admin/AdminControlsCard.tsx
// Component: Admin controls and CRUD operations list

import React from 'react';

export interface AdminControl {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'crud' | 'operations' | 'config';
  enabled: boolean;
}

interface AdminControlsCardProps {
  controls: AdminControl[];
  onControlClick: (control: AdminControl) => void;
}

/**
 * AdminControlsCard
 * 
 * Displays list of admin controls and operations.
 * Shows CRUD operations, configuration, and management features.
 * Includes RBAC badge for role-based access control.
 */
const AdminControlsCard: React.FC<AdminControlsCardProps> = ({ 
  controls, 
  onControlClick 
}) => {
  // Category labels
  const categoryLabels = {
    crud: 'CRUD Operations',
    operations: 'Operations',
    config: 'Configuration',
  };

  // Group controls by category
  const groupedControls = controls.reduce((acc, control) => {
    if (!acc[control.category]) {
      acc[control.category] = [];
    }
    acc[control.category].push(control);
    return acc;
  }, {} as Record<string, AdminControl[]>);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      {/* Header with RBAC badge */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Admin Controls
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Manage all platform resources and configurations
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
          🔐 RBAC
        </span>
      </div>

      {/* Controls list by category */}
      <div className="space-y-6">
        {Object.entries(groupedControls).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h3>
            <div className="space-y-2">
              {items.map((control) => (
                <button
                  key={control.id}
                  onClick={() => onControlClick(control)}
                  disabled={!control.enabled}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    control.enabled
                      ? 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
                      : 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-60'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    control.enabled
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                      : 'bg-slate-300'
                  }`}>
                    <span className="text-2xl">{control.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {control.title}
                      </p>
                      {!control.enabled && (
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-xs">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {control.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  {control.enabled && (
                    <svg 
                      className="w-5 h-5 text-slate-400"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminControlsCard;
