# Dashboard - Documentación

## 📋 Descripción
Dashboard completo tipo SaaS con sidebar fija, topbar interactiva, asistente de IA y componentes reutilizables. Implementado con Next.js 16 (App Router), React 19 y Tailwind CSS 4.

## 🎨 Características Implementadas

### ✅ Componentes de Layout
- **DashboardLayout**: Layout principal con sidebar y topbar fijas
- **Sidebar**: Navegación lateral con 7 secciones y estado activo
- **Topbar**: Header con búsqueda, indicador de IA activa y menú de usuario

### ✅ Componentes UI Reutilizables
- **SearchInput**: Input de búsqueda con icono integrado
- **ActionCard**: Cards de acción rápida con iconos y efectos hover
- **StatusBadge**: Badges de estado con 5 variantes (success, warning, error, info, pending)
- **DataTable**: Tabla de datos con columnas personalizables y acciones por fila
- **PrimaryButton**: Botón principal (ya existente, reutilizado)
- **SecondaryButton**: Botón secundario (ya existente, reutilizado)

### ✅ Funcionalidades del Dashboard
- Input principal con asistente IA
- 4 cards de acciones rápidas: Comprar, Simular, Ver Alianzas, Pagar
- Card de recomendación por IA (confianza 94%, ahorro estimado)
- Card de estado de pagos (última compra, próxima factura, método de pago)
- Tabla de actividad reciente con 5 columnas y 2 acciones por fila
- Datos mock simulados
- Indicador de IA activa en tiempo real

## 📁 Estructura de Archivos

```
HackathonIA-Coo-front/
├── app/
│   ├── page.tsx                          # Página de Login
│   └── dashboard/
│       └── page.tsx                      # Página Dashboard (NUEVA)
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx
│   │   └── AuthCard.tsx
│   ├── dashboard/                        # (NUEVO)
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── ui/
│       ├── InputField.tsx
│       ├── PrimaryButton.tsx
│       ├── SecondaryButton.tsx
│       ├── InfoCard.tsx
│       ├── SearchInput.tsx               # (NUEVO)
│       ├── ActionCard.tsx                # (NUEVO)
│       ├── StatusBadge.tsx               # (NUEVO)
│       └── DataTable.tsx                 # (NUEVO)
```

## 🚀 Cómo Acceder

### Rutas Disponibles
- **Login**: [http://localhost:3000](http://localhost:3000)
- **Dashboard**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Navegación del Dashboard
Desde el dashboard puedes navegar a:
- `/dashboard` - Inicio (página actual)
- `/dashboard/tienda` - Tienda (pendiente implementar)
- `/dashboard/simulador` - Simulador IA (pendiente implementar)
- `/dashboard/alianzas` - Alianzas (pendiente implementar)
- `/dashboard/pagos` - Pagos (pendiente implementar)
- `/dashboard/soporte` - Soporte (pendiente implementar)
- `/dashboard/admin` - Admin (pendiente implementar)

## 🎯 Componentes - Ejemplos de Uso

### DashboardLayout
```tsx
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function MiPagina() {
  return (
    <DashboardLayout>
      {/* Tu contenido aquí */}
    </DashboardLayout>
  );
}
```

### ActionCard
```tsx
<ActionCard
  title="Comprar"
  description="Explora y adquiere nuevos planes"
  variant="blue"  // blue | green | purple | orange
  onClick={() => console.log('Click')}
  icon={<svg>...</svg>}
/>
```

### StatusBadge
```tsx
<StatusBadge 
  label="Completado" 
  variant="success"  // success | warning | error | info | pending
  size="md"          // sm | md | lg
  showIcon={true}
/>
```

### DataTable
```tsx
import DataTable, { TableColumn, TableAction } from '@/components/ui/DataTable';

const columns: TableColumn[] = [
  { key: 'nombre', label: 'Nombre' },
  { 
    key: 'estado', 
    label: 'Estado',
    render: (value) => <StatusBadge label={value} variant="success" />
  },
];

const actions: TableAction[] = [
  {
    label: 'Ver',
    variant: 'primary',
    onClick: (row) => console.log(row),
  },
];

<DataTable 
  columns={columns} 
  data={misDatos} 
  actions={actions}
/>
```

### SearchInput
```tsx
<SearchInput 
  placeholder="Buscar productos..." 
  onChange={(e) => setQuery(e.target.value)}
/>
```

## 📊 Datos Mock

El dashboard incluye datos de ejemplo en:

### Actividad Reciente
```typescript
{
  fecha: '2026-01-23',
  tipo: 'Compra',
  detalle: 'Plan Salud Premium',
  estado: 'completado',
  monto: '$450.000',
}
```

### Items del Sidebar
- Inicio, Tienda, Simulador IA, Alianzas, Pagos, Soporte, Admin

### Recomendación IA
- Plan: "Plan Familia Plus"
- Confianza: 94%
- Ahorro: $180K/año

## 🎨 Personalización

### Cambiar Colores de ActionCard
```tsx
// Editar en components/ui/ActionCard.tsx
const variantStyles = {
  blue: 'from-blue-50 to-blue-100 border-blue-200...',
  // Agregar nuevos colores aquí
};
```

### Agregar Items al Sidebar
```tsx
// Editar en components/dashboard/Sidebar.tsx
const menuItems = [
  { id: 'nuevo', label: 'Nueva Sección', href: '/dashboard/nuevo', icon: 'home' },
  // ...
];
```

### Modificar Datos de la Tabla
```tsx
// Editar en app/dashboard/page.tsx
const activityData = [
  // Tus datos aquí
];
```

## 🔧 Características Técnicas

### Responsive Design
- Sidebar: Fija en desktop (oculta en mobile - pendiente toggle)
- Topbar: Fija con scroll del contenido
- Grid adaptativo: 1 columna (mobile) → 2 (tablet) → 4 (desktop)
- Tabla: Scroll horizontal en pantallas pequeñas

### Estado y Eventos
- Estado de input IA con loading
- Menú desplegable de usuario (click para abrir/cerrar)
- Hover effects en cards y botones
- Indicador de página activa en sidebar
- Animación de "ping" en indicador IA

### Performance
- Componentes cliente solo donde se necesita (`'use client'`)
- Server Components por defecto
- Imports optimizados con alias `@/`

## 🎯 Próximos Pasos (Integración)

### 1. Implementar Páginas Restantes
- Tienda: Catálogo de productos/planes
- Simulador IA: Herramienta de simulación
- Alianzas: Lista de descuentos y beneficios
- Pagos: Historial y gestión de facturas
- Soporte: Sistema de tickets
- Admin: Panel administrativo

### 2. Integración con Backend
- API para consultas de IA
- Endpoints de actividad reciente
- Sistema de autenticación real
- WebSocket para notificaciones en tiempo real

### 3. Funcionalidades Adicionales
- Toggle sidebar en mobile
- Filtros en DataTable
- Paginación en tabla
- Gráficos con Chart.js o Recharts
- Exportación de datos (CSV, PDF)
- Sistema de notificaciones completo

### 4. Mejoras de UX
- Skeleton loaders
- Toasts para feedback
- Modales de confirmación
- Drag & drop para archivos
- Modo oscuro

## 🔒 Seguridad

**Recordatorio**: Este es un frontend con datos mock. Para producción:

1. ✅ Validar permisos en el backend
2. ✅ Proteger rutas del dashboard con middleware
3. ✅ Sanitizar inputs de búsqueda y IA
4. ✅ Implementar rate limiting en consultas IA
5. ✅ Usar tokens JWT con expiración
6. ✅ Encriptar datos sensibles

## 💡 Tips de Desarrollo

### Agregar Nueva Página al Dashboard
```tsx
// 1. Crear archivo en app/dashboard/nueva-pagina/page.tsx
'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function NuevaPagina() {
  return (
    <DashboardLayout>
      <h1>Mi Nueva Página</h1>
    </DashboardLayout>
  );
}

// 2. Agregar item en Sidebar (components/dashboard/Sidebar.tsx)
{ id: 'nueva', label: 'Nueva', href: '/dashboard/nueva-pagina', icon: 'home' }
```

### Crear Componente Reutilizable
```tsx
// Seguir el patrón de componentes existentes:
// - Comentarios JSDoc
// - Props con TypeScript
// - Variantes configurables
// - Clases de Tailwind modulares
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (sidebar oculta, grid 1 col)
- **Tablet**: 768px - 1024px (sidebar visible, grid 2 cols)
- **Desktop**: > 1024px (sidebar + topbar fijas, grid 4 cols)

## 🐛 Troubleshooting

### Sidebar no aparece
**Causa**: Conflicto de z-index o margin
**Solución**: Verificar que `pl-64` esté en el contenedor principal

### Tabla no responsive
**Causa**: Contenedor sin overflow
**Solución**: DataTable ya incluye `overflow-x-auto`

### Click en ActionCard no funciona
**Causa**: Falta implementar onClick
**Solución**: Pasar función al prop `onClick`

## 📧 Recursos

- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com/) - Iconos usados en el proyecto
- [React Hooks](https://react.dev/reference/react)

---

**Dashboard creado el 23 de enero de 2026**
