/**
 * Página de Registro
 * Implementa un formulario de registro con diseño split screen
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
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  
  // Estados del formulario
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    firstName?: string;
    lastName?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string;
    general?: string 
  }>({});
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
    const newErrors: typeof errors = {};

    // Validar nombre
    if (!firstName) {
      newErrors.firstName = 'El nombre es requerido';
    } else if (firstName.length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido
    if (!lastName) {
      newErrors.lastName = 'El apellido es requerido';
    } else if (lastName.length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    }

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

    // Validar confirmación de password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});
    setLoading(true);
    
    try {
      await register({ firstName, lastName, email, password });
      
      // Obtener usuario del localStorage para verificar rol
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      // Redirigir según el rol del usuario
      if (user?.role === 'ADMIN' || user?.rol === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard/tienda');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sección informativa del lado izquierdo
   */
  const InfoSection = () => (
    <>
      <div className="mb-8">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Únete a nuestra plataforma
        </h2>
        <p className="text-lg text-blue-100">
          Crea tu cuenta y accede a todos los beneficios que tenemos para ti.
        </p>
      </div>

      <InfoCard
        title="Beneficios de registrarte"
        items={[
          'Acceso a todos los servicios exclusivos',
          'Recomendaciones personalizadas con IA',
          'Descuentos y promociones especiales',
          'Gestión centralizada de tus servicios',
          'Soporte prioritario 24/7',
        ]}
      />
    </>
  );

  return (
    <AuthLayout infoSection={<InfoSection />}>
      <AuthCard
        title="Crear cuenta"
        subtitle="Completa tus datos para registrarte"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mensaje de error general */}
          {errors.general && (
            <div className="rounded-lg bg-red-50 p-4 border border-red-200">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-red-800">{errors.general}</p>
              </div>
            </div>
          )}

          {/* Campo de nombre */}
          <InputField
            label="Nombre"
            id="firstName"
            type="text"
            placeholder="Tu nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
            autoComplete="given-name"
          />

          {/* Campo de apellido */}
          <InputField
            label="Apellido"
            id="lastName"
            type="text"
            placeholder="Tu apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            autoComplete="family-name"
          />

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
            autoComplete="new-password"
          />

          {/* Campo de confirmar password */}
          <InputField
            label="Confirmar contraseña"
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          {/* Botón primario - Registrar */}
          <PrimaryButton
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </PrimaryButton>

          {/* Botón secundario - Ya tengo cuenta */}
          <SecondaryButton
            type="button"
            onClick={() => router.push('/')}
          >
            Ya tengo una cuenta
          </SecondaryButton>

          {/* Links de términos y privacidad */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              Al registrarte, aceptas nuestros{' '}
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
