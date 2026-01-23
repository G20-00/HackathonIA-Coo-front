# Detalle de Servicio - Documentación

## 📋 Descripción
Página completa de detalle y configuración de servicio (Seguro Hogar) con formulario interactivo, recomendaciones de IA y panel de resumen sticky. Implementado con Next.js 16 (App Router), React 19 y Tailwind CSS 4.

## 🎨 Componentes Creados

### Nuevos Componentes

**Service:**
- **ServiceHeader** - Encabezado con breadcrumb, título, rating y beneficios
- **AIRecommendationBanner** - Banner de recomendación contextual con métricas
- **SummaryCard** - Panel sticky con precio y botones de compra
- **FeatureList** - Lista de coberturas/características con iconos

**UI:**
- **FormSelect** - Select personalizado para formularios

### Componentes Reutilizados
- **DashboardLayout** - Layout principal
- **InputField** - Input de texto (ya existente)
- **PrimaryButton** - Botón principal
- **Rating** - Sistema de estrellas

## ✨ Características Implementadas

✅ **ServiceHeader incluye:**
- Breadcrumb de navegación (Dashboard > Tienda > Categoría)
- Título del servicio
- Rating con estrellas y cantidad de reseñas
- 3 beneficios clave con iconos check

✅ **AIRecommendationBanner:**
- Icono de IA con gradiente
- Badge "IA"
- Descripción personalizada
- 3 métricas clave: Ciudad, Ahorro estimado, Deducible sugerido
- Diseño con gradiente purple/indigo/blue

✅ **Formulario de configuración:**
- **Tipo de vivienda**: Select con 4 opciones (Casa, Apartamento, Finca, Local)
- **Valor estimado**: Input numérico
- **Deducible**: Select con 4 opciones ($250K, $500K, $1M, $2M)
- **Dirección**: Input de texto
- Todos con labels y helper text

✅ **FeatureList (2 secciones):**
1. **Qué incluye** (8 coberturas):
   - Incendio y rayo
   - Terremoto
   - Inundación
   - Robo
   - Responsabilidad civil
   - Daños eléctricos
   - Rotura de vidrios
   - Asistencia de emergencia

2. **Seguridad y tecnología** (4 items):
   - Encriptación TLS 1.3
   - Tokens de sesión seguros
   - Webhooks
   - Control de acceso basado en roles

✅ **SummaryCard (sticky):**
- Precio mensual destacado ($89.900)
- Nota "impuestos incluidos"
- 3 beneficios rápidos con checks
- Botón "Agregar al carrito"
- Botón principal "Comprar y pagar con Bold"
- Nota de seguridad SSL

✅ **Layout responsive:**
- Mobile: 1 columna (formulario arriba, resumen abajo)
- Desktop: 2 columnas 2/3 y 1/3 (resumen sticky a la derecha)

## 📁 Estructura de Archivos

```
app/
└── dashboard/
    └── tienda/
        ├── page.tsx                    # Listado de servicios (modificado)
        └── seguro-hogar/
            └── page.tsx                # Detalle de Seguro Hogar (NUEVO)

components/
├── service/                            # (NUEVO)
│   ├── ServiceHeader.tsx
│   ├── AIRecommendationBanner.tsx
│   ├── SummaryCard.tsx
│   └── FeatureList.tsx
└── ui/
    └── FormSelect.tsx                  # (NUEVO)
```

## 🚀 Cómo Acceder

### URL Directa
**Detalle**: [http://localhost:3000/dashboard/tienda/seguro-hogar](http://localhost:3000/dashboard/tienda/seguro-hogar)

### Desde la Tienda
1. Ir a [Tienda](http://localhost:3000/dashboard/tienda)
2. Click en "Ver detalle" en la card de "Seguro Hogar"

## 🎯 Uso de Componentes

### ServiceHeader
```tsx
import ServiceHeader from '@/components/service/ServiceHeader';

<ServiceHeader
  title="Seguro Hogar"
  category="Seguros"
  rating={4.8}
  reviewCount={1234}
  benefits={['Cancelación flexible', 'Asistencia 24/7', 'Cobertura nacional']}
/>
```

### AIRecommendationBanner
```tsx
import AIRecommendationBanner from '@/components/service/AIRecommendationBanner';

<AIRecommendationBanner
  city="Bogotá"
  savings="$180K/año"
  deductible="$500.000"
/>
```

### FormSelect
```tsx
import FormSelect from '@/components/ui/FormSelect';

<FormSelect
  label="Tipo de vivienda"
  id="propertyType"
  options={[
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' },
  ]}
  value={formData.propertyType}
  onChange={(e) => handleChange('propertyType', e.target.value)}
  helperText="Selecciona el tipo de propiedad"
/>
```

### SummaryCard
```tsx
import SummaryCard from '@/components/service/SummaryCard';

<SummaryCard
  price="$89.900"
  onAddToCart={() => console.log('Agregar')}
  onBuy={() => console.log('Comprar')}
/>
```

### FeatureList
```tsx
import FeatureList from '@/components/service/FeatureList';

<FeatureList
  title="¿Qué incluye?"
  items={['Cobertura 1', 'Cobertura 2']}
  variant="coverage"  // coverage | security
/>
```

## 🎨 Personalización

### Agregar Nuevo Servicio con Detalle

1. **Crear nueva página:**
```bash
# Crear app/dashboard/tienda/[nombre-servicio]/page.tsx
```

2. **Copiar estructura de seguro-hogar:**
```tsx
// Reutilizar todos los componentes
// Cambiar datos específicos del servicio
```

3. **Actualizar navegación en tienda:**
```tsx
// En app/dashboard/tienda/page.tsx
const handleViewDetail = (service: Service) => {
  if (service.id === '2') {
    router.push('/dashboard/tienda/asistencia-vehicular');
  }
  // ...
};
```

### Modificar Opciones del Formulario

```tsx
// En la página de detalle
const propertyTypes = [
  { value: 'nuevo', label: 'Nuevo Tipo' },
  // ...
];
```

### Cambiar Coberturas

```tsx
const coverageItems = [
  'Nueva cobertura 1',
  'Nueva cobertura 2',
  // ...
];
```

### Ajustar Precio

```tsx
const serviceData = {
  // ...
  price: '$125.000',  // Cambiar aquí
};
```

## 🔄 Estado del Formulario

### Estructura de FormData
```typescript
interface FormData {
  propertyType: string;    // casa | apartamento | finca | local
  estimatedValue: string;  // Valor numérico
  deductible: string;      // 250000 | 500000 | 1000000 | 2000000
  address: string;         // Dirección completa
}
```

### Flujo de Datos
1. Usuario llena formulario
2. Estado se actualiza con `handleChange`
3. Al hacer clic en botones, `formData` se envía
4. TODO: Integrar con API/carrito real

## 📱 Responsive Design

### Mobile (< 1024px)
- Layout de 1 columna
- Formulario primero
- SummaryCard debajo (no sticky)
- FeatureList en grid 1 columna

### Desktop (≥ 1024px)
- Layout 2 columnas (2/3 y 1/3)
- SummaryCard sticky (sigue al scroll)
- FeatureList en grid 2 columnas

## 🎯 Próximos Pasos

### 1. Crear Detalles para Otros Servicios
```bash
# Crear páginas para:
- /dashboard/tienda/asistencia-vehicular
- /dashboard/tienda/plan-salud
- /dashboard/tienda/mantenimiento-hogar
- /dashboard/tienda/seguro-viajes
- /dashboard/tienda/proteccion-compras
```

### 2. Implementar Carrito Real
```tsx
// Context API o Zustand
interface CartItem {
  serviceId: string;
  serviceName: string;
  price: number;
  configuration: FormData;
}

// Agregar al carrito
const addToCart = (item: CartItem) => {
  // Guardar en estado global
  // Persistir en localStorage
  // Mostrar notificación
};
```

### 3. Integración con Backend
```tsx
// API endpoints necesarios
POST /api/cart/add
GET /api/services/:id
POST /api/checkout
POST /api/recommendations  // Para banner IA
```

### 4. Validaciones Avanzadas
```tsx
// Validar formulario completo
const validateForm = () => {
  if (!formData.estimatedValue) {
    setErrors({ estimatedValue: 'Campo requerido' });
    return false;
  }
  
  if (parseInt(formData.estimatedValue) < 50000000) {
    setErrors({ estimatedValue: 'Valor mínimo: $50.000.000' });
    return false;
  }
  
  return true;
};
```

### 5. Funcionalidades Adicionales
- Calculadora de prima en tiempo real
- Comparador de deducibles
- Chat en vivo para dudas
- Videos explicativos de coberturas
- Testimonios de clientes
- Preguntas frecuentes (FAQ)
- Simulador de siniestros

### 6. Optimizaciones
- Lazy loading de componentes
- Skeleton loaders en carga
- Validación en tiempo real
- Guardar progreso en localStorage
- Autoguardado de formulario
- Analytics de conversión

## 🎨 Diseño y UX

### Jerarquía Visual
1. **Título y rating** (más grande)
2. **Banner IA** (llamativo con gradiente)
3. **Formulario** (campos claros y organizados)
4. **Coberturas** (fácil de escanear)
5. **Resumen** (sticky, siempre visible)

### Colores
- **IA**: Purple/Indigo gradient (`from-purple-600 to-indigo-600`)
- **Success**: Green (`green-500`)
- **Primary**: Blue (`blue-600`)
- **Text**: Slate (`slate-900`, `slate-700`, `slate-600`)

### Espaciado
- Secciones: `space-y-6` (24px)
- Formulario: `space-y-5` (20px)
- Lista items: `gap-3` (12px)

## 🔒 Seguridad

### Buenas Prácticas Implementadas
- ✅ Inputs controlados (previene XSS)
- ✅ Validación de tipos con TypeScript
- ✅ Helper text para guiar al usuario
- ✅ Mensajes de error claros

### Para Producción
- ⚠️ Validar en backend todos los campos
- ⚠️ Sanitizar inputs antes de enviar
- ⚠️ Rate limiting en formularios
- ⚠️ CAPTCHA en proceso de compra
- ⚠️ Verificar precio en servidor (no confiar en frontend)

## 💾 Datos Mock

### Servicio de Ejemplo
```typescript
{
  title: 'Seguro Hogar',
  category: 'Seguros',
  rating: 4.8,
  reviewCount: 1234,
  benefits: ['Cancelación flexible', 'Asistencia 24/7', 'Cobertura nacional'],
  price: '$89.900',
}
```

### Formulario Default
```typescript
{
  propertyType: 'casa',
  estimatedValue: '',
  deductible: '500000',
  address: '',
}
```

## 🧪 Testing (Futuro)

```tsx
describe('ServiceDetailPage', () => {
  it('should update form state on input change');
  it('should call handleAddToCart with correct data');
  it('should navigate from tienda on "Ver detalle"');
  it('should display AI recommendation with correct city');
});

describe('SummaryCard', () => {
  it('should be sticky on desktop');
  it('should call onBuy when clicking primary button');
});
```

## 📊 Conversión

### Elementos que Impulsan Conversión
1. **Banner IA personalizado** - Genera confianza
2. **Beneficios clave visibles** - Reduce fricción
3. **Formulario simple** - Solo 4 campos
4. **Precio claro** - Sin sorpresas
5. **SummaryCard sticky** - Siempre a la vista
6. **Doble CTA** - Carrito y compra directa
7. **Coberturas detalladas** - Elimina dudas
8. **Rating alto** - Prueba social

## 🎓 Patrones Utilizados

- **Controlled Components** - Formulario con estado React
- **Composition** - Componentes pequeños y combinables
- **Props Drilling** - Datos fluyen hacia abajo
- **Sticky Positioning** - CSS `position: sticky`
- **Responsive Grid** - Tailwind `grid lg:grid-cols-3`
- **Conditional Rendering** - Mostrar/ocultar según estado

---

**Página de Detalle creada el 23 de enero de 2026**

Lista para integrar con backend y expandir a más servicios! 🎯
