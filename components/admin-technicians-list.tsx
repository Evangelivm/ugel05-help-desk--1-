"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  Phone,
  Mail,
  Calendar,
  Search,
  Filter,
  UserCog,
  FileText,
  ShieldAlert,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for technicians
const techniciansData = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "jperez@ugel05.gob.pe",
    phone: "987654321",
    department: "Soporte Técnico",
    specialties: ["Hardware", "Software"],
    status: "available",
    workload: 60,
    assignedTickets: 3,
    completedToday: 2,
    avatar: null,
  },
  {
    id: 2,
    name: "María López",
    email: "mlopez@ugel05.gob.pe",
    phone: "987654322",
    department: "Soporte Técnico",
    specialties: ["Software", "Network"],
    status: "busy",
    workload: 80,
    assignedTickets: 4,
    completedToday: 1,
    avatar: null,
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    email: "cmendoza@ugel05.gob.pe",
    phone: "987654323",
    department: "Soporte Técnico",
    specialties: ["Hardware", "Account"],
    status: "available",
    workload: 40,
    assignedTickets: 2,
    completedToday: 3,
    avatar: null,
  },
  {
    id: 4,
    name: "Ana García",
    email: "agarcia@ugel05.gob.pe",
    phone: "987654324",
    department: "Soporte Técnico",
    specialties: ["Network", "Software"],
    status: "available",
    workload: 20,
    assignedTickets: 1,
    completedToday: 4,
    avatar: null,
  },
  {
    id: 5,
    name: "Roberto Díaz",
    email: "rdiaz@ugel05.gob.pe",
    phone: "987654325",
    department: "Soporte Técnico",
    specialties: ["Hardware", "Software", "Network"],
    status: "unavailable",
    workload: 0,
    assignedTickets: 0,
    completedToday: 0,
    avatar: null,
  },
  {
    id: 6,
    name: "Laura Sánchez",
    email: "lsanchez@ugel05.gob.pe",
    phone: "987654326",
    department: "Soporte Técnico",
    specialties: ["Software", "Account"],
    status: "available",
    workload: 50,
    assignedTickets: 2,
    completedToday: 2,
    avatar: null,
  },
  {
    id: 7,
    name: "Miguel Torres",
    email: "mtorres@ugel05.gob.pe",
    phone: "987654327",
    department: "Soporte Técnico",
    specialties: ["Hardware", "Network"],
    status: "busy",
    workload: 70,
    assignedTickets: 3,
    completedToday: 1,
    avatar: null,
  },
  {
    id: 8,
    name: "Carmen Flores",
    email: "cflores@ugel05.gob.pe",
    phone: "987654328",
    department: "Soporte Técnico",
    specialties: ["Software", "Account"],
    status: "available",
    workload: 30,
    assignedTickets: 1,
    completedToday: 2,
    avatar: null,
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "available":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="mr-1 h-3 w-3" /> Disponible
        </Badge>
      )
    case "busy":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="mr-1 h-3 w-3" /> Ocupado
        </Badge>
      )
    case "unavailable":
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          <XCircle className="mr-1 h-3 w-3" /> No disponible
        </Badge>
      )
    default:
      return null
  }
}

// Specialty badge component
const SpecialtyBadge = ({ specialty }: { specialty: string }) => {
  switch (specialty) {
    case "Hardware":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mr-1">
          Hardware
        </Badge>
      )
    case "Software":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 mr-1">
          Software
        </Badge>
      )
    case "Network":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mr-1">
          Red
        </Badge>
      )
    case "Account":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 mr-1">
          Cuentas
        </Badge>
      )
    default:
      return null
  }
}

export function AdminTechniciansList() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter technicians based on status and search term
  const filteredTechnicians = techniciansData.filter((technician) => {
    const matchesFilter = filter === "all" || technician.status === filter
    const matchesSearch =
      technician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technician.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technician.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por nombre, correo o especialidad..."
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
              <SelectItem value="available">Disponibles</SelectItem>
              <SelectItem value="busy">Ocupados</SelectItem>
              <SelectItem value="unavailable">No disponibles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Técnico</TableHead>
              <TableHead className="w-[120px]">Estado</TableHead>
              <TableHead className="w-[200px]">Especialidades</TableHead>
              <TableHead className="w-[120px]">Teléfono</TableHead>
              <TableHead className="w-[100px]">Asignados</TableHead>
              <TableHead className="w-[120px]">Completados hoy</TableHead>
              <TableHead className="w-[80px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTechnicians.length > 0 ? (
              filteredTechnicians.map((technician) => (
                <TableRow key={technician.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-gray-200">
                        <AvatarImage
                          src={technician.avatar || "/placeholder.svg?height=32&width=32"}
                          alt={technician.name}
                        />
                        <AvatarFallback className="bg-red-50 text-red-700 text-xs">
                          {technician.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{technician.name}</div>
                        <div className="text-xs text-muted-foreground">{technician.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={technician.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {technician.specialties.map((specialty, index) => (
                        <SpecialtyBadge key={index} specialty={specialty} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{technician.phone}</TableCell>
                  <TableCell className="text-center">{technician.assignedTickets}</TableCell>
                  <TableCell className="text-center">{technician.completedToday}</TableCell>
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
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Editar perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Ver asignaciones</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          <span>Llamar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Enviar correo</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Ver horario</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          <span>Cambiar permisos</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron técnicos que coincidan con los criterios de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
