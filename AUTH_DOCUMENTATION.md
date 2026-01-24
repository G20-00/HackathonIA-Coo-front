# Documentación de Autenticación

## 🔐 Sistema de Autenticación Implementado

Se ha implementado un sistema completo de autenticación que conecta tu frontend Next.js con el backend en `http://localhost:8081/api/auth`.

## 📁 Archivos Creados

### 1. `lib/auth.ts` - Servicio de Autenticación
Funciones para manejar la autenticación:

```typescript
// Login
await login(email, password);

// Registro
await register({ nombre, email, password });

// Logout
logout();

// Obtener token
const token = getToken();

// Obtener usuario
const user = getUser();

// Verificar si está autenticado
const authenticated = isAuthenticated();
```

### 2. `lib/api.ts` - Utilidades para peticiones HTTP
Funciones que automáticamente incluyen el token Bearer:

```typescript
// GET con autenticación automática
const data = await get('/servicios');

// POST
const result = await post('/servicios', { nombre: 'Servicio 1' });

// PUT
const updated = await put('/servicios/1', { nombre: 'Actualizado' });

// DELETE
await del('/servicios/1');

// Sin autenticación (opcional)
const publicData = await get('/public/data', false);
```

### 3. `contexts/AuthContext.tsx` - Contexto Global
Proporciona estado de autenticación a toda la aplicación:

```typescript
const { user, loading, login, logout, isAuthenticated } = useAuth();
```

### 4. `app/layout.tsx` - Actualizado
Se agregó el `AuthProvider` para envolver toda la aplicación.

### 5. `app/page.tsx` - Actualizado
El formulario de login ahora conecta con el backend real:
- Realiza peticiones al endpoint `/api/auth/login`
- Guarda el token en localStorage
- Redirige al dashboard en login exitoso
- Muestra errores de autenticación

## 🚀 Cómo Usar

### En el Login (ya implementado)
El login ya está funcionando en `app/page.tsx`:

```typescript
import { login } from '@/lib/auth';

const handleSubmit = async () => {
  try {
    await login(email, password);
    router.push('/dashboard');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### En Cualquier Componente

#### 1. Usar el Hook useAuth
```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function MyComponent() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <div>
      {user && (
        <>
          <p>Hola, {user.nombre}</p>
          <p>Email: {user.email}</p>
          <p>Rol: {user.rol}</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      )}
    </div>
  );
}
```

#### 2. Hacer Peticiones a la API
```typescript
'use client';

import { get, post } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      // El token se incluye automáticamente
      const data = await get('/servicios');
      setServices(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const createService = async () => {
    try {
      const newService = await post('/servicios', {
        nombre: 'Nuevo Servicio',
        descripcion: 'Descripción'
      });
      setServices([...services, newService]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={createService}>Crear Servicio</button>
      {services.map(service => (
        <div key={service.id}>{service.nombre}</div>
      ))}
    </div>
  );
}
```

## 🔑 Flujo de Autenticación

### 1. Login
```
Usuario ingresa credenciales
     ↓
POST http://localhost:8081/api/auth/login
     ↓
Backend devuelve { token, user }
     ↓
Se guarda en localStorage:
  - token: "eyJhbGciOiJIUzI1NiJ9..."
  - user: { id, nombre, email, rol }
     ↓
Redirige a /dashboard
```

### 2. Peticiones Autenticadas
```
Componente llama get('/servicios')
     ↓
lib/api.ts obtiene token de localStorage
     ↓
Agrega header: Authorization: Bearer {token}
     ↓
Envía petición a backend
```

### 3. Logout
```
Usuario hace click en logout
     ↓
Se eliminan token y user de localStorage
     ↓
Redirige a login (/)
```

## 🛡️ Protección de Rutas

Para proteger rutas (requiere autenticación), crea un componente:

```typescript
// components/auth/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

Úsalo en páginas protegidas:

```typescript
// app/dashboard/page.tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Contenido del Dashboard</div>
    </ProtectedRoute>
  );
}
```

## 📝 Ejemplos de Uso

### Mostrar Información del Usuario
```typescript
const { user } = useAuth();

return (
  <div>
    {user && (
      <>
        <p>Nombre: {user.nombre}</p>
        <p>Rol: {user.rol}</p>
      </>
    )}
  </div>
);
```

### Cerrar Sesión
```typescript
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/');
};
```

### Verificar Rol
```typescript
const { user } = useAuth();

if (user?.rol === 'ADMIN') {
  // Mostrar opciones de administrador
}
```

## 🧪 Testing

Para probar el login, usa estas credenciales (según tu backend):

```
Email: admin@coomeva.com
Password: admin123
```

## ⚠️ Notas Importantes

1. **localStorage**: El token se guarda en localStorage. En producción, considera usar httpOnly cookies para mayor seguridad.

2. **CORS**: Asegúrate de que tu backend permita peticiones desde `http://localhost:3000` (o el puerto de tu frontend).

3. **Expiración del Token**: El token JWT puede expirar. Considera implementar refresh tokens o manejo de expiración.

4. **Manejo de Errores**: Todas las funciones lanzan errores que debes capturar con try/catch.

5. **SSR**: El contexto de autenticación solo funciona en el cliente ('use client'). Para SSR, necesitarías un enfoque diferente.

## 🔄 Próximos Pasos Sugeridos

1. Implementar página de registro
2. Crear componente ProtectedRoute
3. Agregar manejo de refresh tokens
4. Implementar recuperación de contraseña
5. Agregar persistencia de sesión (remember me)
6. Mejorar manejo de errores con toasts/notificaciones

## 📦 Estructura Final

```
HackathonIA-Coo-front/
├── lib/
│   ├── auth.ts              # Servicio de autenticación
│   └── api.ts               # Utilidades para peticiones HTTP
├── contexts/
│   └── AuthContext.tsx      # Contexto global de auth
├── app/
│   ├── layout.tsx           # Envuelve con AuthProvider
│   └── page.tsx             # Login con backend real
└── examples/
    └── auth-example.tsx     # Ejemplos de uso
```
