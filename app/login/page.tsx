import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Banner lateral */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-700 to-red-900 text-white p-8 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
              <span className="font-bold text-white text-xl">U5</span>
            </div>
            <h1 className="text-2xl font-bold">UGEL05</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Mesa de Ayuda Virtual</h2>
          <p className="text-white/80 max-w-md mb-8">
            Sistema de gestión de soporte técnico para la Unidad de Gestión
            Educativa Local 05. Acceda a su cuenta para solicitar soporte,
            revisar el estado de sus solicitudes o gestionar incidencias
            técnicas.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Soporte Técnico</h3>
              <p className="text-sm text-white/70">
                Gestión de incidencias y solicitudes de soporte técnico
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Seguimiento</h3>
              <p className="text-sm text-white/70">
                Seguimiento en tiempo real del estado de sus solicitudes
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Notificaciones</h3>
              <p className="text-sm text-white/70">
                Reciba notificaciones sobre el estado de sus solicitudes
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Reportes</h3>
              <p className="text-sm text-white/70">
                Acceda a reportes y estadísticas de soporte técnico
              </p>
            </div>
          </div>
        </div>
        <div className="text-sm text-white/60 mt-8">
          <p>© 2024 UGEL05 - Unidad de Gestión Educativa Local 05</p>
          <p>Equipo de Tecnología de la Información</p>
        </div>
      </div>

      {/* Formulario de login */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-600 mb-2">
              <span className="font-bold text-white text-xl">U5</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              UGEL05 - Mesa de Ayuda Virtual
            </h1>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Iniciar Sesión
              </h2>
              <p className="text-gray-600 mt-1">
                Ingrese sus credenciales para acceder al sistema
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                ¿Problemas para acceder?{" "}
                <Link
                  href="/ayuda"
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Contacte a soporte
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              Al acceder al sistema, usted acepta nuestros{" "}
              <Link
                href="/terminos"
                className="text-red-600 hover:text-red-800"
              >
                Términos de servicio
              </Link>{" "}
              y{" "}
              <Link
                href="/privacidad"
                className="text-red-600 hover:text-red-800"
              >
                Política de privacidad
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
