"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import {
  Menu,
  FileText,
  LogOut,
  Home,
  Bell,
  Settings,
  CheckCircle,
  Clock,
  Calendar,
  HelpCircle,
  Wrench,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TechnicianLayoutProps {
  children: React.ReactNode
}

export function TechnicianLayout({ children }: TechnicianLayoutProps) {
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Panel de control", href: "/tecnico", icon: Home, current: pathname === "/tecnico" },
    {
      name: "Mis asignaciones",
      href: "/tecnico/asignaciones",
      icon: FileText,
      badge: "4",
      current: pathname === "/tecnico/asignaciones",
    },
    {
      name: "Resueltos hoy",
      href: "/tecnico/resueltos",
      icon: CheckCircle,
      current: pathname === "/tecnico/resueltos",
    },
    {
      name: "Pendientes",
      href: "/tecnico/pendientes",
      icon: Clock,
      badge: "2",
      current: pathname === "/tecnico/pendientes",
    },
    { name: "Mi horario", href: "/tecnico/horario", icon: Calendar, current: pathname === "/tecnico/horario" },
    { name: "Guías técnicas", href: "/tecnico/guias", icon: HelpCircle, current: pathname === "/tecnico/guias" },
    {
      name: "Configuración",
      href: "/tecnico/configuracion",
      icon: Settings,
      current: pathname === "/tecnico/configuracion",
    },
    { name: "Cerrar sesión", href: "/logout", icon: LogOut, current: false },
  ]

  // Determine current page title for breadcrumb
  const getCurrentPageTitle = () => {
    const currentNav = navigation.find((item) => item.current)
    return currentNav ? currentNav.name : "Panel de Técnico"
  }

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-white">
      <div className="flex flex-col items-center border-b p-6">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-blue-100 ring-2 ring-blue-600/10">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar" />
            <AvatarFallback className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 text-xl font-semibold">
              CM
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1.5 ring-2 ring-white" />
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-gray-900">Carlos Mendoza</h2>
          <div className="mt-1 flex items-center justify-center gap-1.5">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-normal">
              Técnico
            </Badge>
          </div>
          <p className="mt-1.5 text-sm text-gray-500">cmendoza@ugel05.gob.pe</p>
          <p className="text-xs text-gray-400">Soporte Técnico</p>
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
                ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800"
                : "text-gray-700 hover:bg-gray-50",
            )}
          >
            <div className="flex items-center">
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  item.current ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500",
                )}
              />
              {item.name}
            </div>
            {item.badge && <Badge className="bg-blue-600 hover:bg-blue-700">{item.badge}</Badge>}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <div className="text-xs text-gray-500">
          <div className="font-semibold text-blue-700">UGEL05 - TÉCNICO</div>
          <div>Equipo de Tecnología de la Información</div>
          <div>© 2023-2024</div>
          <div>Versión: 3.0.0</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-gradient-to-r from-blue-700 to-blue-600 px-4 shadow-md md:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700/50">
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
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">UGEL05 - PANEL DE TÉCNICO</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700/50 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600">
                  4
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
                    <span className="font-medium">Nueva asignación</span>
                    <span className="text-xs text-muted-foreground">Hace 5 min</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Se le ha asignado la solicitud #SOL-2024-0042.</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Solicitud urgente</span>
                    <span className="text-xs text-muted-foreground">Hace 30 min</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    La solicitud #SOL-2024-0040 ha sido marcada como urgente.
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">Recordatorio</span>
                    <span className="text-xs text-muted-foreground">Hace 1 hora</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    La solicitud #SOL-2024-0038 está pendiente de resolución.
                  </p>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm font-medium text-blue-600">
                Ver todas las notificaciones
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="h-8 w-8 border border-white/30">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            <AvatarFallback className="bg-blue-900 text-white text-xs">CM</AvatarFallback>
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
                  <BreadcrumbLink href="/tecnico" className="text-blue-700">
                    <Home className="mr-1 h-3.5 w-3.5" />
                    <span>Panel Técnico</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-medium">{getCurrentPageTitle()}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
