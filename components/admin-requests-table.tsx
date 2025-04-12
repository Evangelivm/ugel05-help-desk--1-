"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, CheckCircle, Clock, AlertTriangle, XCircle, UserCog, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for the requests
const requestsData = [
  {
    id: "SOL-2024-0042",
    user: "María Rodríguez",
    department: "Dirección",
    type: "Hardware",
    description: "Computadora no enciende",
    status: "pending",
    priority: "high",
    date: "2024-04-04",
    technician: null,
  },
  {
    id: "SOL-2024-0041",
    user: "Juan Pérez",
    department: "Recursos Humanos",
    type: "Software",
    description: "No puedo acceder al sistema de notas",
    status: "pending",
    priority: "medium",
    date: "2024-04-03",
    technician: null,
  },
  {
    id: "SOL-2024-0040",
    user: "Carlos López",
    department: "Administración",
    type: "Network",
    description: "Sin acceso a internet en toda el área",
    status: "in-progress",
    priority: "critical",
    date: "2024-04-03",
    technician: "Ana García",
  },
  {
    id: "SOL-2024-0039",
    user: "Ana Torres",
    department: "Secretaría",
    type: "Hardware",
    description: "Mi impresora no funciona correctamente",
    status: "in-progress",
    priority: "medium",
    date: "2024-04-02",
    technician: "María López",
  },
  {
    id: "SOL-2024-0038",
    user: "Pedro Gómez",
    department: "Contabilidad",
    type: "Software",
    description: "Error al generar reportes mensuales",
    status: "in-progress",
    priority: "high",
    date: "2024-04-02",
    technician: "Carlos Mendoza",
  },
  {
    id: "SOL-2024-0037",
    user: "Laura Sánchez",
    department: "Dirección",
    type: "Account",
    description: "Necesito restablecer contraseña de correo",
    status: "resolved",
    priority: "low",
    date: "2024-04-01",
    technician: "Juan Pérez",
  },
  {
    id: "SOL-2024-0036",
    user: "Roberto Díaz",
    department: "Informática",
    type: "Network",
    description: "No tengo conexión a internet en mi oficina",
    status: "resolved",
    priority: "medium",
    date: "2024-04-01",
    technician: "Juan Pérez",
  },
  {
    id: "SOL-2024-0035",
    user: "Carmen Flores",
    department: "Recursos Humanos",
    type: "Hardware",
    description: "Teclado no funciona correctamente",
    status: "resolved",
    priority: "low",
    date: "2024-03-31",
    technician: "María López",
  },
  {
    id: "SOL-2024-0034",
    user: "Miguel Martínez",
    department: "Administración",
    type: "Software",
    description: "Problemas con Microsoft Excel",
    status: "resolved",
    priority: "medium",
    date: "2024-03-31",
    technician: "Carlos Mendoza",
  },
  {
    id: "SOL-2024-0033",
    user: "Sofía Ramírez",
    department: "Secretaría",
    type: "Software",
    description: "Necesito instalar Microsoft Office",
    status: "cancelled",
    priority: "low",
    date: "2024-03-30",
    technician: null,
  },
  {
    id: "SOL-2024-0032",
    user: "Javier Herrera",
    department: "Contabilidad",
    type: "Hardware",
    description: "Monitor con problemas de visualización",
    status: "resolved",
    priority: "medium",
    date: "2024-03-29",
    technician: "Ana García",
  },
  {
    id: "SOL-2024-0031",
    user: "Elena Castro",
    department: "Dirección",
    type: "Network",
    description: "Problemas con la conexión VPN",
    status: "resolved",
    priority: "high",
    date: "2024-03-29",
    technician: "Juan Pérez",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="mr-1 h-3 w-3" /> Pendiente
        </Badge>
      )
    case "in-progress":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <AlertTriangle className="mr-1 h-3 w-3" /> En proceso
        </Badge>
      )
    case "resolved":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="mr-1 h-3 w-3" /> Resuelto
        </Badge>
      )
    case "cancelled":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          <XCircle className="mr-1 h-3 w-3" /> Cancelado
        </Badge>
      )
    default:
      return null
  }
}

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "low":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          Baja
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Media
        </Badge>
      )
    case "high":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Alta
        </Badge>
      )
    case "critical":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Crítica
        </Badge>
      )
    default:
      return null
  }
}

interface AdminRequestsTableProps {
  limit?: number
}

export function AdminRequestsTable({ limit }: AdminRequestsTableProps) {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter requests based on status and search term
  let filteredRequests = requestsData.filter((request) => {
    const matchesFilter = filter === "all" || request.status === filter
    const matchesSearch =
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Apply limit if provided
  if (limit) {
    filteredRequests = filteredRequests.slice(0, limit)
  }

  return (
    <div>
      {!limit && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por ID, usuario, departamento o descripción..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-64">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="in-progress">En proceso</SelectItem>
                <SelectItem value="resolved">Resueltos</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[140px]">Usuario</TableHead>
              <TableHead className="w-[120px]">Departamento</TableHead>
              <TableHead className="w-[100px]">Tipo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead className="w-[80px]">Prioridad</TableHead>
              <TableHead className="w-[100px]">Fecha</TableHead>
              <TableHead className="w-[120px]">Técnico</TableHead>
              <TableHead className="w-[80px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.user}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{request.description}</TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={request.priority} />
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.technician || "-"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver detalles</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Asignar técnico</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Marcar como resuelto</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Cancelar solicitud</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No se encontraron solicitudes que coincidan con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
