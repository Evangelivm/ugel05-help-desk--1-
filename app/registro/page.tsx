import { RegistrationForm } from "@/components/registration-form";
import Link from "next/link";

export default function RegistrationPage() {
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
          <h2 className="text-3xl font-bold mb-4">Registro de Usuario</h2>
          <p className="text-white/80 max-w-md mb-8">
            Complete el formulario para crear una cuenta en el sistema de Mesa
            de Ayuda Virtual de UGEL05. Una vez registrado, podrá solicitar
            soporte técnico y dar seguimiento a sus solicitudes.
          </p>
          <div className="space-y-4 max-w-md">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">Información importante</h3>
              <ul className="text-sm text-white/70 space-y-2 list-disc pl-4">
                <li>
                  Utilice su correo electrónico institucional (@ugel05.gob.pe)
                </li>
                <li>
                  Su solicitud de registro será revisada por el administrador
                  del sistema
                </li>
                <li>
                  Recibirá un correo de confirmación cuando su cuenta sea
                  activada
                </li>
                <li>
                  Complete todos los campos con información precisa y
                  actualizada
                </li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-1">¿Ya tiene una cuenta?</h3>
              <p className="text-sm text-white/70">
                Si ya tiene una cuenta en el sistema, puede{" "}
                <Link
                  href="/login"
                  className="text-white underline hover:text-white/90"
                >
                  iniciar sesión aquí
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="text-sm text-white/60 mt-8">
          <p>© 2024 UGEL05 - Unidad de Gestión Educativa Local 05</p>
          <p>Equipo de Tecnología de la Información</p>
        </div>
      </div>

      {/* Formulario de registro */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10 bg-gray-50">
        <div className="w-full max-w-2xl">
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
                Registro de Usuario
              </h2>
              <p className="text-gray-600 mt-1">
                Complete el formulario para crear una cuenta en el sistema
              </p>
            </div>

            <RegistrationForm />

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                ¿Ya tiene una cuenta?{" "}
                <Link
                  href="/login"
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>
              Al registrarse en el sistema, usted acepta nuestros{" "}
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
