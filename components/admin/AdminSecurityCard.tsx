// components/admin/AdminSecurityCard.tsx
// Component: Security features and best practices information

import React from 'react';

/**
 * AdminSecurityCard
 * 
 * Displays security features and best practices for production.
 * Covers authentication, rate limiting, webhooks, and data protection.
 */
const AdminSecurityCard: React.FC = () => {
  const securityFeatures = [
    {
      icon: '🔑',
      title: 'JWT Rotation & Refresh Tokens',
      description: 'Access tokens expire in 15min. Refresh tokens rotate on use with sliding expiration.',
      status: 'implemented',
      color: 'green',
    },
    {
      icon: '🔐',
      title: 'MFA for Admin Roles',
      description: 'Two-factor authentication required for all admin operations via TOTP or SMS.',
      status: 'implemented',
      color: 'green',
    },
    {
      icon: '🛡️',
      title: 'Rate Limiting + WAF',
      description: 'Per-IP and per-user rate limits. Optional WAF integration for DDoS protection.',
      status: 'planned',
      color: 'blue',
    },
    {
      icon: '✓',
      title: 'Webhook Signature Validation',
      description: 'All webhooks verified with HMAC-SHA256 signatures to prevent spoofing.',
      status: 'implemented',
      color: 'green',
    },
    {
      icon: '💾',
      title: 'Automated Backups & Migrations',
      description: 'Daily encrypted backups with point-in-time recovery. Zero-downtime migrations.',
      status: 'implemented',
      color: 'green',
    },
    {
      icon: '📋',
      title: 'Audit Logs & Compliance',
      description: 'All admin actions logged with timestamps, IP, and user context. GDPR compliant.',
      status: 'implemented',
      color: 'green',
    },
  ];

  const statusConfig = {
    implemented: { label: 'Active', bg: 'bg-green-100', text: 'text-green-700' },
    planned: { label: 'Planned', bg: 'bg-blue-100', text: 'text-blue-700' },
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🔒</span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Security & Compliance
          </h2>
          <p className="text-sm text-slate-600">
            Production-ready security measures
          </p>
        </div>
      </div>

      {/* Features grid */}
      <div className="space-y-4">
        {securityFeatures.map((feature, index) => {
          const config = statusConfig[feature.status as keyof typeof statusConfig];
          return (
            <div 
              key={index}
              className="flex gap-4 p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <span className="text-2xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${config.bg} ${config.text}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional security info */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Security Best Practices
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <p className="text-slate-600">
              <strong>HTTPS Only:</strong> TLS 1.3 enforced
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <p className="text-slate-600">
              <strong>CORS:</strong> Whitelist origins only
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <p className="text-slate-600">
              <strong>Secrets:</strong> Env vars, never in code
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-600">✓</span>
            <p className="text-slate-600">
              <strong>Input Validation:</strong> Sanitize all inputs
            </p>
          </div>
        </div>
      </div>

      {/* Compliance badges */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-600 mb-3">
          Compliance & Certifications:
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            ISO 27001
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            SOC 2 Type II
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
            GDPR
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
            PCI DSS
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurityCard;
