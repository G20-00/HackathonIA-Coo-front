import Link from 'next/link';

export default function PagoExitosoPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Pago exitoso</h1>
        <p className="mb-6 text-sm text-slate-600">
          Tu pago fue aprobado. Recibirás la confirmación en tu correo.
        </p>
        <Link
          href="/dashboard/tienda"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Volver a la tienda
        </Link>
      </div>
    </main>
  );
}
