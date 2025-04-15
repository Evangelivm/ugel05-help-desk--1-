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

  const pathname = request.nextUrl.pathname;

  // Si es una ruta pública, permitir acceso
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Si no hay token, redirigir a login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirigir según el id_rol del usuario
  if (token.id_rol === 1 && pathname.startsWith("/tecnico")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token.id_rol === 1 && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token.id_rol === 2 && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/tecnico", request.url));
  }
  if (token.id_rol === 3 && pathname.startsWith("/tecnico")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
