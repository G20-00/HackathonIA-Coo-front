# Página de Login - Documentación

## 📋 Descripción
Página de login profesional con diseño split screen, implementada usando Next.js 16 (App Router), React 19 y Tailwind CSS 4.

## 🎨 Características Implementadas

### ✅ Componentes Reutilizables
- **AuthLayout**: Layout principal con diseño split screen responsivo
- **AuthCard**: Tarjeta contenedora para formularios
- **InputField**: Campo de entrada con validación visual
- **PrimaryButton**: Botón principal con estado de loading
- **SecondaryButton**: Botón secundario estilo outline
- **InfoCard**: Tarjeta informativa con lista de características

### ✅ Funcionalidades
- Formulario de login con validaciones frontend
- Validación de email (formato correcto)
- Validación de contraseña (mínimo 6 caracteres)
- Estados de error visuales
- Indicador de carga (loading state)
- Links de "Olvidé contraseña", "Términos" y "Privacidad"
- Badges informativos: 2FA, Sesión Segura, Rate Limiting

### ✅ Diseño
- **Split Screen**: Información a la izquierda, formulario a la derecha
- **Responsive**: Mobile first, se adapta a tablets y desktop
- **Gradientes**: Fondos atractivos con patrones decorativos
- **Efectos visuales**: Sombras, blur, transiciones suaves
- **Accesibilidad**: Labels asociados, autocompletado, focus states

## 📁 Estructura de Archivos

```
HackathonIA-Coo-front/
├── app/
│   └── page.tsx                 # Página principal de login
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx       # Layout split screen
│   │   └── AuthCard.tsx         # Card contenedor
│   └── ui/
│       ├── InputField.tsx       # Input reutilizable
│       ├── PrimaryButton.tsx    # Botón principal
│       ├── SecondaryButton.tsx  # Botón secundario
│       └── InfoCard.tsx         # Card informativa
```

## 🚀 Cómo Usar

### Requisitos
- Node.js >= 20.9.0
- npm o yarn

### Instalación
```bash
# Instalar dependencias (si no están instaladas)
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Acceder a la aplicación
Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## 🎯 Próximos Pasos (Integración)

### 1. Autenticación Real
Reemplazar la simulación en `handleSubmit` con:
- NextAuth.js
- Supabase Auth
- Firebase Authentication
- Auth0
- O tu backend personalizado

### 2. Navegación
Implementar rutas para:
- `/register` - Página de registro
- `/forgot-password` - Recuperación de contraseña
- `/dashboard` - Página principal después del login

### 3. Validaciones Adicionales
- Verificación de email con OTP
- Fuerza de contraseña (weak/medium/strong)
- CAPTCHA para prevenir bots

### 4. Backend
- API endpoints para login/register
- JWT tokens
- Refresh tokens
- Rate limiting real

## 💡 Personalización

### Colores
Los colores principales están en las clases de Tailwind:
- Primario: `blue-600`, `blue-700`
- Secundario: `slate-600`, `slate-700`
- Fondo: `slate-50`, `slate-100`

### Textos
Modificar en [app/page.tsx](app/page.tsx):
- Título: "Bienvenido a nuestra plataforma"
- Descripción
- Items del InfoCard

### Validaciones
Ajustar las funciones en [app/page.tsx](app/page.tsx):
- `validateEmail()`: Cambiar regex de validación
- `validateForm()`: Agregar más validaciones

## 🔒 Seguridad

**Nota importante**: Esta es una implementación frontend con validaciones básicas. Para producción:

1. ✅ Implementar validación en el backend
2. ✅ Usar HTTPS en producción
3. ✅ Implementar rate limiting real en el servidor
4. ✅ Hashear contraseñas con bcrypt/argon2
5. ✅ Usar tokens JWT seguros
6. ✅ Implementar CSRF protection
7. ✅ Sanitizar inputs

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (stack vertical)
- **Tablet**: 640px - 1024px (stack vertical)
- **Desktop**: > 1024px (split screen horizontal)

## 🎨 Componentes - Ejemplos de Uso

### InputField
```tsx
<InputField
  label="Email"
  id="email"
  type="email"
  placeholder="tu@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

### PrimaryButton
```tsx
<PrimaryButton
  type="submit"
  loading={isLoading}
  disabled={isLoading}
>
  Enviar
</PrimaryButton>
```

### AuthLayout
```tsx
<AuthLayout infoSection={<TuSeccionInfo />}>
  <TuFormulario />
</AuthLayout>
```

## 📝 Comentarios en el Código

Todos los componentes incluyen:
- Descripción del componente
- Props documentadas
- Comentarios en secciones importantes
- Ejemplos de uso donde aplica

## 🐛 Troubleshooting

### Error: Node.js version
```
You are using Node.js 18.x. For Next.js, Node.js version ">=20.9.0" is required.
```
**Solución**: Actualizar Node.js a la versión 20.9.0 o superior

### Error: Module not found
**Solución**: Verificar que el path alias `@/` esté configurado en `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 📧 Contacto

Para dudas o sugerencias sobre la implementación, consulta la documentación de:
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React](https://react.dev)
