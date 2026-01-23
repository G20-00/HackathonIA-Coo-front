/**
 * Página de Login
 * Implementa un formulario de autenticación con diseño split screen
 * - Validaciones básicas de frontend
 * - Diseño responsive mobile-first
 * - Componentes reutilizables
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthCard from '@/components/auth/AuthCard';
import InputField from '@/components/ui/InputField';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import InfoCard from '@/components/ui/InfoCard';

export default function LoginPage() {
  // Router para navegación
  const router = useRouter();
  
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  /**
   * Valida el formato del email
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Valida el formulario antes de enviar
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    // Validar email
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validar password
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    // Simular proceso de login
    setLoading(true);
    
    // TODO: Implementar autenticación real
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setLoading(false);
      
      // Redirigir al dashboard después de login exitoso
      router.push('/dashboard');
    }, 2000);
  };

  /**
   * Sección informativa del lado izquierdo
   */
  const InfoSection = () => (
    <>
      {/* Título y descripción */}
      <div className="mb-8">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Bienvenido a nuestra plataforma
        </h2>
        <p className="text-lg text-blue-100">
          Accede a tu cuenta y disfruta de todas las funcionalidades de forma segura y confiable.
        </p>
      </div>

      {/* Card con características */}
      <InfoCard
        title="Vista rápida"
        items={[
          'Autenticación de dos factores (2FA) para mayor seguridad',
          'Gestión de sesiones activas en múltiples dispositivos',
          'Protección contra ataques con rate limiting',
          'Recuperación de contraseña fácil y segura',
          'Encriptación de extremo a extremo',
        ]}
      />
    </>
  );

  return (
    <AuthLayout infoSection={<InfoSection />}>
      <AuthCard
        title="Iniciar sesión"
        subtitle="Ingresa tus credenciales para acceder a tu cuenta"
      >
        {/* Formulario de login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de email */}
          <InputField
            label="Correo electrónico"
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />

          {/* Campo de password */}
          <InputField
            label="Contraseña"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />

          {/* Link de olvidé contraseña */}
          <div className="flex items-center justify-end">
            <a
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Características de seguridad */}
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="mb-2 text-xs font-semibold text-slate-700">
              Características de seguridad activas:
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                2FA Disponible
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Sesión Segura
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Rate Limiting
              </span>
            </div>
          </div>

          {/* Botón primario - Entrar */}
          <PrimaryButton
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </PrimaryButton>

          {/* Botón secundario - Crear cuenta */}
          <SecondaryButton
            type="button"
            onClick={() => {
              // TODO: Navegar a página de registro
              console.log('Navegar a crear cuenta');
            }}
          >
            Crear cuenta
          </SecondaryButton>

          {/* Links de términos y privacidad */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              Al iniciar sesión, aceptas nuestros{' '}
              <a
                href="/terms"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Términos de Servicio
              </a>
              {' '}y{' '}
              <a
                href="/privacy"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Política de Privacidad
              </a>
            </p>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
