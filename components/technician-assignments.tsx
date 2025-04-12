"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, AlertTriangle, MoreHorizontal, Eye, MessageSquare, Calendar, Phone } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for assignments
const assignmentsData = [
  {
    id: "SOL-2024-0042",
    user: "María Rodríguez",
    department: "Dirección",
    type: "Hardware",
    description: "Computadora no enciende",
    status: "pending",
    priority: "high",
    assignedDate: "2024-04-04 09:30",
    estimatedTime: "2h",
  },
  {
    id: "SOL-2024-0040",
    user: "Carlos López",
    department: "Administración",
    type: "Network",
    description: "Sin acceso a internet en toda el área",
    status: "in-progress",
    priority: "critical",
    assignedDate: "2024-04-03 14:15",
    estimatedTime: "3h",
  },
  {
    id: "SOL-2024-0038",
    user: "Pedro Gómez",
    department: "Contabilidad",
    type: "Software",
    description: "Error al generar reportes mensuales",
    status: "in-progress",
    priority: "high",
    assignedDate: "2024-04-02 11:20",
    estimatedTime: "1.5h",
  },
  {
    id: "SOL-2024-0035",
    user: "Carmen Flores",
    department: "Recursos Humanos",
    type: "Hardware",
    description: "Teclado no funciona correctamente",
    status: "pending",
    priority: "low",
    assignedDate: "2024-03-31 16:45",
    estimatedTime: "0.5h",
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

export function TechnicianAssignments() {
  const [filter, setFilter] = useState("all")

  // Filter assignments based on status
  const filteredAssignments = assignmentsData.filter((assignment) => {
    return filter === "all" || assignment.status === filter
  })

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="w-48">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="in-progress">En proceso</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[140px]">Usuario</TableHead>
              <TableHead className="w-[120px]">Departamento</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead className="w-[80px]">Prioridad</TableHead>
              <TableHead className="w-[100px]">Tiempo est.</TableHead>
              <TableHead className="w-[80px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.id}</TableCell>
                  <TableCell>{assignment.user}</TableCell>
                  <TableCell>{assignment.department}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{assignment.description}</TableCell>
                  <TableCell>
                    <StatusBadge status={assignment.status} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={assignment.priority} />
                  </TableCell>
                  <TableCell>{assignment.estimatedTime}</TableCell>
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
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Marcar como resuelto</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Enviar mensaje</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          <span>Llamar al usuario</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Programar visita</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No hay asignaciones que coincidan con el filtro seleccionado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
