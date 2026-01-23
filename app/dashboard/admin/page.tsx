// app/dashboard/admin/page.tsx
// Page: Admin panel for platform management

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdminControlsCard, { AdminControl } from '@/components/admin/AdminControlsCard';
import OrdersTable, { AdminOrder } from '@/components/admin/OrdersTable';
import AdminSecurityCard from '@/components/admin/AdminSecurityCard';
import PrimaryButton from '@/components/ui/PrimaryButton';

/**
 * Admin Panel Page
 * 
 * Complete admin dashboard for platform management:
 * - CRUD controls for products, services, partners
 * - Orders and payments management
 * - Security configuration and audit logs
 * - AI configuration (prompts, limits)
 * 
 * Protected by RBAC - Admin role required
 */
export default function AdminPage() {
  const router = useRouter();

  // Mock admin controls
  const adminControls: AdminControl[] = [
    {
      id: 'products',
      title: 'Products & Services',
      description: 'Create, update, and delete products and services in the marketplace',
      icon: '📦',
      category: 'crud',
      enabled: true,
    },
    {
      id: 'partners',
      title: 'Partners & Alliances',
      description: 'Manage strategic partners, verify credentials, and update offers',
      icon: '🤝',
      category: 'crud',
      enabled: true,
    },
    {
      id: 'users',
      title: 'Users Management',
      description: 'View users, manage roles, suspend accounts, and handle support tickets',
      icon: '👥',
      category: 'crud',
      enabled: true,
    },
    {
      id: 'orders',
      title: 'Orders & Payments',
      description: 'Monitor transactions, process refunds, and generate financial reports',
      icon: '💳',
      category: 'operations',
      enabled: true,
    },
    {
      id: 'logs',
      title: 'Logs & Auditing',
      description: 'Access system logs, audit trails, and security events',
      icon: '📋',
      category: 'operations',
      enabled: true,
    },
    {
      id: 'ai-config',
      title: 'AI Configuration',
      description: 'Manage AI prompts, model parameters, rate limits, and usage quotas',
      icon: '🤖',
      category: 'config',
      enabled: true,
    },
    {
      id: 'webhooks',
      title: 'Webhooks Management',
      description: 'Configure webhook endpoints, retry policies, and signature validation',
      icon: '🔗',
      category: 'config',
      enabled: true,
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      description: 'View platform metrics, user behavior, and performance dashboards',
      icon: '📊',
      category: 'operations',
      enabled: false,
    },
  ];

  // Mock orders data
  const mockOrders: AdminOrder[] = [
    {
      id: 'ORD-001',
      userId: 'USR-123',
      userName: 'Juan Pérez',
      total: 89900,
      status: 'completed',
      paymentMethod: 'Bold - Credit Card',
      createdAt: new Date('2026-01-23T10:30:00'),
    },
    {
      id: 'ORD-002',
      userId: 'USR-456',
      userName: 'María García',
      total: 125000,
      status: 'processing',
      paymentMethod: 'Bold - PSE',
      createdAt: new Date('2026-01-23T11:45:00'),
    },
    {
      id: 'ORD-003',
      userId: 'USR-789',
      userName: 'Carlos López',
      total: 67500,
      status: 'pending',
      paymentMethod: 'Bold - Credit Card',
      createdAt: new Date('2026-01-23T12:00:00'),
    },
    {
      id: 'ORD-004',
      userId: 'USR-321',
      userName: 'Ana Martínez',
      total: 98000,
      status: 'failed',
      paymentMethod: 'Bold - Debit Card',
      createdAt: new Date('2026-01-22T15:20:00'),
    },
    {
      id: 'ORD-005',
      userId: 'USR-654',
      userName: 'Diego Rodríguez',
      total: 150000,
      status: 'completed',
      paymentMethod: 'Bold - Credit Card',
      createdAt: new Date('2026-01-22T09:15:00'),
    },
  ];

  // Handle control click
  const handleControlClick = (control: AdminControl) => {
    console.log('Control clicked:', control.title);
    // TODO: Navigate to specific admin section
    alert(`Opening ${control.title}...\n\nThis would navigate to the specific management section.`);
  };

  // Handle view order
  const handleViewOrder = (order: AdminOrder) => {
    console.log('View order:', order);
    alert(`Viewing order ${order.id}\n\nUser: ${order.userName}\nTotal: $${order.total.toLocaleString('es-CO')}\nStatus: ${order.status}`);
  };

  // Handle download invoice
  const handleDownloadInvoice = (order: AdminOrder) => {
    console.log('Download invoice:', order);
    alert(`Downloading invoice for order ${order.id}...`);
  };

  // Handle review order
  const handleReviewOrder = (order: AdminOrder) => {
    console.log('Review order:', order);
    alert(`Opening review panel for order ${order.id}...`);
  };

  // Handle create product
  const handleCreateProduct = () => {
    console.log('Create new product');
    alert('Opening product creation form...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with admin badge */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">
                Admin Panel
              </h1>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                👑 ADMIN
              </span>
            </div>
            <p className="text-slate-600">
              Manage all platform resources, users, and configurations
            </p>
          </div>

          {/* Quick action button */}
          <PrimaryButton onClick={handleCreateProduct}>
            ➕ Create Product
          </PrimaryButton>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-xl">📦</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">24</p>
                <p className="text-xs text-slate-600">Active Products</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">127</p>
                <p className="text-xs text-slate-600">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">1.2K</p>
                <p className="text-xs text-slate-600">Active Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <span className="text-xl">🤝</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">8</p>
                <p className="text-xs text-slate-600">Verified Partners</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Controls (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Admin controls */}
            <AdminControlsCard
              controls={adminControls}
              onControlClick={handleControlClick}
            />

            {/* Orders table */}
            <OrdersTable
              orders={mockOrders}
              onViewOrder={handleViewOrder}
              onDownloadInvoice={handleDownloadInvoice}
              onReviewOrder={handleReviewOrder}
            />
          </div>

          {/* Right column - Security (1/3, sticky) */}
          <div className="lg:sticky lg:top-6 self-start">
            <AdminSecurityCard />
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">
            ⚠️ Admin Responsibilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-slate-700 font-medium mb-1">
                Data Protection
              </p>
              <p className="text-slate-600">
                Handle all user data with care. Access is logged and audited.
              </p>
            </div>
            <div>
              <p className="text-slate-700 font-medium mb-1">
                Security First
              </p>
              <p className="text-slate-600">
                Report any security concerns immediately to security@company.com
              </p>
            </div>
            <div>
              <p className="text-slate-700 font-medium mb-1">
                Change Control
              </p>
              <p className="text-slate-600">
                All production changes require approval and staging validation.
              </p>
            </div>
            <div>
              <p className="text-slate-700 font-medium mb-1">
                Compliance
              </p>
              <p className="text-slate-600">
                Follow GDPR, PCI DSS, and local regulations at all times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
