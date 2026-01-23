# Tienda / Marketplace - Documentación

## 📋 Descripción
Marketplace completo de servicios con sistema de filtros, búsqueda, carrito de compras y recomendaciones por IA. Implementado con Next.js 16 (App Router), React 19 y Tailwind CSS 4.

## 🎨 Componentes Creados

### Nuevos Componentes

**Marketplace:**
- **FilterBar** - Barra de filtros con búsqueda, categoría, ciudad, botón IA y carrito
- **ServiceCard** - Card de servicio con rating, precio y acciones

**UI:**
- **Rating** - Sistema de calificación con estrellas (0-5)

### Componentes Reutilizados
- **DashboardLayout** - Layout principal con sidebar y topbar
- **PrimaryButton** - Botón de acción principal
- **SearchInput** - Input de búsqueda

## ✨ Características Implementadas

✅ **Barra de filtros completa:**
- Input de búsqueda en tiempo real
- Select de categoría (6 categorías)
- Select de ciudad (6 ciudades)
- Botón "Aplicar filtros"
- Botón "Recomendado por IA" con diseño especial
- Indicador de carrito con contador animado

✅ **6 Servicios de ejemplo:**
1. **Seguro Hogar** - $89.900/mes (Rating 4.8 ⭐)
2. **Asistencia Vehicular** - $45.000/mes (Rating 4.6 ⭐)
3. **Plan Salud** - $125.000/mes (Rating 4.9 ⭐)
4. **Mantenimiento Hogar** - $65.000/mes (Rating 4.7 ⭐)
5. **Seguro Viajes** - $55.000/mes (Rating 4.5 ⭐)
6. **Protección Compras** - $38.000/mes (Rating 4.4 ⭐)

✅ **ServiceCard incluye:**
- Icono con gradiente de color
- Badge de categoría
- Nombre del servicio
- Rating con estrellas y cantidad de reseñas
- Descripción breve (2 líneas max)
- Precio por mes
- Botón "Ver detalle"
- Botón "Comprar"

✅ **Sistema de filtrado funcional:**
- Filtro por búsqueda (nombre y descripción)
- Filtro por categoría
- Contador de resultados
- Botón "Limpiar filtros"
- Mensaje cuando no hay resultados

✅ **Carrito de compras:**
- Contador de items en badge
- Animación en contador
- Click handler preparado

## 📁 Estructura de Archivos

```
app/
└── dashboard/
    └── tienda/
        └── page.tsx                    # Página de Tienda (NUEVA)

components/
├── marketplace/                        # (NUEVO)
│   ├── FilterBar.tsx                  # Barra de filtros
│   └── ServiceCard.tsx                # Card de servicio
└── ui/
    └── Rating.tsx                      # Componente de rating (NUEVO)
```

## 🚀 Cómo Acceder

### URL
**Tienda**: [http://localhost:3000/dashboard/tienda](http://localhost:3000/dashboard/tienda)

### Navegación
Desde el dashboard, click en "Tienda" en la sidebar izquierda.

## 🎯 Uso de Componentes

### FilterBar
```tsx
import FilterBar, { FilterState } from '@/components/marketplace/FilterBar';

const [cartItems, setCartItems] = useState(0);

const handleFilterChange = (filters: FilterState) => {
  console.log('Filtros:', filters);
  // Aplicar filtros a los datos
};

<FilterBar
  onFilterChange={handleFilterChange}
  cartItemCount={cartItems}
  onCartClick={() => console.log('Abrir carrito')}
/>
```

### ServiceCard
```tsx
import ServiceCard, { Service } from '@/components/marketplace/ServiceCard';

const service: Service = {
  id: '1',
  name: 'Seguro Hogar',
  category: 'Seguros',
  description: 'Protección completa...',
  price: '$89.900',
  rating: 4.8,
  reviewCount: 1234,
  color: 'from-blue-500 to-blue-600',
  icon: <svg>...</svg>,
};

<ServiceCard
  service={service}
  onViewDetail={(s) => console.log('Ver', s)}
  onBuy={(s) => console.log('Comprar', s)}
/>
```

### Rating
```tsx
import Rating from '@/components/ui/Rating';

<Rating 
  rating={4.5}           // 0-5
  reviewCount={1234}     // Opcional
  size="md"              // sm | md | lg
  showNumber={true}      // Mostrar número
/>
```

## 🎨 Personalización

### Agregar Nuevo Servicio
```tsx
// En app/dashboard/tienda/page.tsx
const newService: Service = {
  id: '7',
  name: 'Mi Servicio',
  category: 'Nueva Categoría',
  description: 'Descripción del servicio...',
  price: '$99.000',
  rating: 4.7,
  reviewCount: 500,
  color: 'from-teal-500 to-teal-600',
  icon: (
    <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Tu icono aquí */}
    </svg>
  ),
};
```

### Cambiar Categorías
```tsx
// En components/marketplace/FilterBar.tsx
const categories = [
  { value: 'nueva', label: 'Nueva Categoría' },
  // ...
];
```

### Cambiar Ciudades
```tsx
// En components/marketplace/FilterBar.tsx
const cities = [
  { value: 'nueva-ciudad', label: 'Nueva Ciudad' },
  // ...
];
```

### Modificar Colores de Card
Los gradientes se definen en el campo `color` del servicio:
```tsx
color: 'from-blue-500 to-blue-600'    // Azul
color: 'from-green-500 to-green-600'  // Verde
color: 'from-purple-500 to-purple-600' // Morado
// Cualquier gradiente de Tailwind
```

## 🔄 Sistema de Filtrado

### Filtros Disponibles
1. **Búsqueda**: Filtra por nombre y descripción
2. **Categoría**: Filtra por categoría exacta
3. **Ciudad**: Preparado (pendiente agregar campo en servicios)

### Lógica de Filtrado
```tsx
const filteredServices = services.filter((service) => {
  // Búsqueda en nombre y descripción
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    const matchesName = service.name.toLowerCase().includes(searchLower);
    const matchesDescription = service.description.toLowerCase().includes(searchLower);
    if (!matchesName && !matchesDescription) return false;
  }

  // Filtro por categoría
  if (filters.category && service.category !== filters.category) {
    return false;
  }

  return true;
});
```

## 🛒 Carrito de Compras

### Estado Actual
- Contador funcional en la barra de filtros
- Se incrementa al hacer click en "Comprar"
- Badge animado con número de items

### Próximos Pasos
```tsx
// TODO: Implementar state management (Context API o Zustand)
// TODO: Persistir en localStorage
// TODO: Página de carrito completa
// TODO: Proceso de checkout
```

## 📱 Grid Responsive

- **Mobile** (< 640px): 1 columna
- **Tablet** (640px - 1024px): 2 columnas
- **Desktop** (> 1024px): 3 columnas

## 🎯 Próximos Pasos

### 1. Página de Detalle del Servicio
```tsx
// Crear app/dashboard/tienda/[id]/page.tsx
- Información completa del servicio
- Galería de imágenes
- Detalles de cobertura
- Términos y condiciones
- Botón de compra
```

### 2. Carrito Completo
```tsx
// Crear app/dashboard/carrito/page.tsx
- Lista de items
- Cantidad ajustable
- Total calculado
- Botón de checkout
```

### 3. Integración con Backend
```tsx
// Servicios API
- GET /api/services - Lista de servicios
- GET /api/services/:id - Detalle
- POST /api/cart/add - Agregar al carrito
- POST /api/recommendations - IA recomendaciones
```

### 4. Funcionalidades Adicionales
- Ordenar por: Precio, Rating, Popularidad
- Paginación (mostrar 6, 12, 24 por página)
- Comparador de servicios
- Favoritos/Wishlist
- Compartir servicio
- Reseñas de usuarios

### 5. Optimizaciones
- Lazy loading de imágenes
- Skeleton loaders
- Infinite scroll
- Caché de filtros
- Optimistic UI updates

## 🎨 Diseño y UX

### Colores por Categoría
- **Seguros**: Azul (`blue-500`)
- **Asistencia**: Naranja (`orange-500`)
- **Salud**: Verde (`green-500`)
- **Mantenimiento**: Morado (`purple-500`)
- **Viajes**: Índigo (`indigo-500`)
- **Protección**: Rosa (`pink-500`)

### Animaciones
- Hover en cards: sombra más grande
- Hover en botones: cambio de color
- Contador de carrito: badge con ring
- Botón IA: gradiente animado

### Accesibilidad
- Labels asociados a inputs
- Colores con suficiente contraste
- Focus states visibles
- Textos alternativos en iconos

## 🔍 SEO y Metadata (Futuro)

```tsx
// Agregar en app/dashboard/tienda/page.tsx
export const metadata = {
  title: 'Tienda - Servicios y Seguros',
  description: 'Encuentra los mejores servicios de seguro, salud y asistencia',
  keywords: ['seguros', 'salud', 'asistencia', 'servicios'],
};
```

## 💾 Datos Mock

### Estructura de Servicio
```typescript
interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;        // 0-5
  reviewCount: number;
  icon: React.ReactNode;
  color: string;        // Tailwind gradient
}
```

### 6 Servicios Incluidos
Todos con ratings reales, conteo de reseñas, iconos personalizados y colores únicos.

## 🧪 Testing (Futuro)

```tsx
// Tests recomendados
describe('FilterBar', () => {
  it('should filter services by search term');
  it('should filter by category');
  it('should update cart count');
});

describe('ServiceCard', () => {
  it('should display correct rating');
  it('should call onBuy when clicking Comprar');
  it('should call onViewDetail when clicking Ver detalle');
});
```

## 📊 Métricas de Negocio (Futuro)

- Servicios más vistos
- Tasa de conversión por categoría
- Servicios agregados al carrito
- Abandonos de carrito
- Búsquedas más frecuentes
- Efectividad de recomendaciones IA

## 🎓 Aprendizajes

### Patrones Utilizados
- Component composition
- Props drilling (futuro: Context API)
- Controlled components (filtros, búsqueda)
- Render props para customización
- Responsive grid con Tailwind

### Buenas Prácticas
- Componentes pequeños y reutilizables
- TypeScript para type safety
- Comentarios descriptivos
- Nombres descriptivos de funciones
- Separación de lógica y presentación

---

**Tienda creada el 23 de enero de 2026**

Listo para integrar con backend real y expandir funcionalidades! 🚀
