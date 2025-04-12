import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/login", "/register", "/recuperar-contrasena"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isPublicPath = publicRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Si es una ruta pública y hay token, redirigir al dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si no es una ruta pública y no hay token, redirigir a login
  if (!isPublicPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url); // Guardar la URL original para redirigir después del login
    return NextResponse.redirect(loginUrl);
  }

  // Permitir acceso a rutas protegidas si hay token
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas excepto:
     * 1. /api (rutas API)
     * 2. /_next (archivos estáticos de Next.js)
     * 3. /favicon.ico, etc.
     */
    "/((?!api|_next|static|favicon.ico).*)",
  ],
};
