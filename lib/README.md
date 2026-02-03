# Documentación de la API del Frontend

Esta carpeta contiene toda la lógica de conexión con el backend del e-commerce.

## Estructura

```
lib/
├── api/              # Servicios API
├── types/            # Tipos TypeScript
├── context/          # Contextos de React
└── hooks/            # Hooks personalizados
```

## Configuración

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Uso de la API

### 1. Configurar el AuthProvider

Envuelve tu aplicación con el `AuthProvider` en el layout principal:

```tsx
import { AuthProvider } from '@/lib/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Usar el hook useAuth

```tsx
'use client';

import { useAuth } from '@/lib/hooks/useAuth';

export default function LoginPage() {
  const { login, user, isAuthenticated, isAdmin } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123',
      });
      // Redirigir al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión');
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Bienvenido {user?.name}</p>
      ) : (
        <button onClick={handleLogin}>Iniciar sesión</button>
      )}
    </div>
  );
}
```

### 3. Consumir servicios API

```tsx
'use client';

import { useState, useEffect } from 'react';
import { servicesApi } from '@/lib/api';
import { Service } from '@/lib/types';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAvailableServices();
        setServices(data);
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <p>Precio: ${service.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## Servicios Disponibles

### authApi
- `register(data)` - Registrar nuevo usuario
- `login(data)` - Iniciar sesión

### alliancesApi
- `getAllAlliances()` - Obtener todas las alianzas
- `getActiveAlliances()` - Obtener alianzas activas
- `getAllianceById(id)` - Obtener alianza por ID
- `searchAlliances(keyword)` - Buscar alianzas
- `createAlliance(data)` - Crear alianza (Admin)
- `updateAlliance(id, data)` - Actualizar alianza (Admin)
- `deleteAlliance(id)` - Eliminar alianza (Admin)

### categoriesApi
- `getAllCategories()` - Obtener todas las categorías
- `getCategoryById(id)` - Obtener categoría por ID
- `createCategory(data)` - Crear categoría (Admin)
- `updateCategory(id, data)` - Actualizar categoría (Admin)
- `deleteCategory(id)` - Eliminar categoría (Admin)

### servicesApi
- `getAllServices()` - Obtener todos los servicios
- `getAvailableServices()` - Obtener servicios disponibles
- `getServiceById(id)` - Obtener servicio por ID
- `getServicesByCategory(categoryId)` - Obtener servicios por categoría
- `getServicesByType(type)` - Obtener servicios por tipo
- `searchServices(keyword)` - Buscar servicios
- `createService(data)` - Crear servicio (Admin)
- `updateService(id, data)` - Actualizar servicio (Admin)
- `deleteService(id)` - Eliminar servicio (Admin)

### ordersApi
- `getAllOrders()` - Obtener todas las órdenes (Admin)
- `getMyOrders()` - Obtener órdenes del usuario actual
- `getOrderById(id)` - Obtener orden por ID
- `createOrder(data)` - Crear nueva orden
- `updateOrderStatus(id, status)` - Actualizar estado de orden (Admin)

### paymentsApi
- `processPayment(data)` - Procesar pago
- `getPaymentByOrderId(orderId)` - Obtener pago por ID de orden
- `getPaymentById(id)` - Obtener pago por ID

## Autenticación

El sistema de autenticación usa JWT (JSON Web Tokens). El token se almacena en `localStorage` y se envía automáticamente en cada petición mediante interceptores de axios.

### Flujo de autenticación

1. El usuario se registra o inicia sesión
2. El backend devuelve un token JWT y los datos del usuario
3. El token se guarda en `localStorage`
4. El cliente HTTP agrega automáticamente el token en el header `Authorization: Bearer {token}`
5. El backend valida el token en cada petición protegida

### Roles

- **USER**: Usuario normal (puede crear órdenes, ver sus órdenes, procesar pagos)
- **ADMIN**: Administrador (puede gestionar alianzas, categorías, servicios y todas las órdenes)

### Verificar autenticación

```tsx
const { isAuthenticated, isAdmin, user } = useAuth();

if (!isAuthenticated) {
  // Redirigir a login
}

if (isAdmin) {
  // Mostrar opciones de administrador
}
```

## Manejo de errores

El cliente HTTP maneja automáticamente los siguientes errores:

- **401 (No autenticado)**: Limpia el token y redirige a login
- **403 (No autorizado)**: El usuario no tiene permisos
- **404 (No encontrado)**: Recurso no existe
- **500 (Error del servidor)**: Error interno del backend

Todos los errores se loguean en la consola y se pueden capturar en los bloques `try/catch`.

## Ejemplo completo: Crear una orden

```tsx
'use client';

import { useState } from 'react';
import { ordersApi, paymentsApi } from '@/lib/api';
import { CreateOrderRequest, PaymentMethod } from '@/lib/types';
import { useAuth } from '@/lib/hooks/useAuth';

export default function CheckoutPage() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión');
      return;
    }

    setLoading(true);

    try {
      // 1. Crear la orden
      const orderData: CreateOrderRequest = {
        items: [
          { serviceId: 1, quantity: 2 },
          { serviceId: 3, quantity: 1 },
        ],
      };

      const order = await ordersApi.createOrder(orderData);

      // 2. Procesar el pago
      const paymentData = {
        orderId: order.id,
        amount: order.total,
        method: PaymentMethod.CREDIT_CARD,
        cardNumber: '4111111111111111',
        cardHolderName: 'John Doe',
        expirationDate: '12/25',
        cvv: '123',
      };

      const payment = await paymentsApi.processPayment(paymentData);

      if (payment.status === 'APPROVED') {
        alert('¡Compra exitosa!');
        // Redirigir a página de confirmación
      } else {
        alert('Pago rechazado');
      }
    } catch (error) {
      console.error('Error en el checkout:', error);
      alert('Error al procesar la compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Procesando...' : 'Finalizar compra'}
      </button>
    </div>
  );
}
```

## Tipos TypeScript

Todos los tipos están disponibles en `lib/types/`:

- `User`, `LoginRequest`, `RegisterRequest`, `AuthResponse`
- `Alliance`, `CreateAllianceRequest`
- `Category`, `CreateCategoryRequest`
- `Service`, `ServiceType`, `CreateServiceRequest`
- `Order`, `OrderStatus`, `OrderResponse`, `CreateOrderRequest`
- `Payment`, `PaymentMethod`, `PaymentStatus`, `PaymentRequest`, `PaymentResponse`

Puedes importarlos de forma individual o todos a la vez:

```tsx
import { User, Service, OrderStatus } from '@/lib/types';
```
