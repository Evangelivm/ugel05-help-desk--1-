"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import {
  Menu,
  Users,
  FileText,
  LogOut,
  Home,
  Bell,
  Settings,
  BarChart2,
  Wrench,
  Shield,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const isMobile = useMobile();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Panel de control",
      href: "/admin",
      icon: BarChart2,
      current: pathname === "/admin",
    },
    {
      name: "Gestión de solicitudes",
      href: "/admin/solicitudes",
      icon: FileText,
      badge: "12",
      current: pathname === "/admin/solicitudes",
    },
    {
      name: "Gestión de usuarios",
      href: "/admin/usuarios",
      icon: Users,
      current: pathname === "/admin/usuarios",
    },
    {
      name: "Técnicos",
      href: "/admin/tecnicos",
      icon: Wrench,
      current: pathname === "/admin/tecnicos",
    },
    {
      name: "Configuración",
      href: "/admin/configuracion",
      icon: Settings,
      current: pathname === "/admin/configuracion",
    },
    { name: "Cerrar sesión", href: "/logout", icon: LogOut, current: false },
  ];

  // Determine current page title for breadcrumb
  const getCurrentPageTitle = () => {
    const currentNav = navigation.find((item) => item.current);
    return currentNav ? currentNav.name : "Panel de Administración";
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-white">
      <div className="flex flex-col items-center border-b p-6">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-red-100 ring-2 ring-red-600/10">
            <AvatarImage
              src="/placeholder.svg?height=80&width=80"
              alt="Avatar"
            />
            <AvatarFallback className="bg-gradient-to-br from-red-50 to-red-100 text-red-700 text-xl font-semibold">
              AA
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1.5 ring-2 ring-white" />
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-gray-900">ASTO ASTO</h2>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <Badge
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200 text-xs font-normal"
            >
              Administrador
            </Badge>
          </div>
          <p className="mt-1.5 text-sm text-gray-500">JASTO@ugel05.gob.pe</p>
          <p className="text-xs text-gray-400">ARH/EEL</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 p-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "group flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-all",
              item.current
                ? "bg-gradient-to-r from-red-50 to-red-100 text-red-800"
                : "text-gray-700 hover:bg-gray-50"
            )}
          >
            <div className="flex items-center">
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  item.current
                    ? "text-red-600"
                    : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              {item.name}
            </div>
            {item.badge && (
              <Badge className="bg-red-600 hover:bg-red-700">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="text-xs text-gray-500">
          <div className="font-semibold text-red-700">UGEL05 - ADMIN</div>
          <div>Equipo de Tecnología de la Información</div>
          <div>© 2023-2024</div>
          <div>Versión: 3.0.0</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-gradient-to-r from-red-800 to-red-700 px-4 shadow-md md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-red-700/50"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">
              UGEL05 - PANEL DE ADMINISTRACIÓN
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-red-700/50 relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600">
                  5
                </span>
                <span className="sr-only">Notificaciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Nueva solicitud</span>
                    <span className="text-xs text-muted-foreground">
                      Hace 5 min
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nueva solicitud #SOL-2024-0042 requiere asignación.
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Solicitud urgente</span>
                    <span className="text-xs text-muted-foreground">
                      Hace 30 min
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    La solicitud #SOL-2024-0040 ha sido marcada como urgente.
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Técnico ausente</span>
                    <span className="text-xs text-muted-foreground">
                      Hace 1 hora
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    El técnico Juan Pérez ha reportado ausencia para hoy.
                  </p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm font-medium text-red-600">
                Ver todas las notificaciones
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="h-8 w-8 border border-white/30">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Avatar"
            />
            <AvatarFallback className="bg-red-900 text-white text-xs">
              AA
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <aside className="w-72 shrink-0 border-r shadow-sm">
            <Sidebar />
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin" className="text-red-700">
                    <Home className="mr-1 h-3.5 w-3.5" />
                    <span>Panel Admin</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-medium">
                    {getCurrentPageTitle()}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
