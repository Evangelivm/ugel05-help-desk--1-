"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, MoreHorizontal, Phone, Mail, Calendar } from "lucide-react"
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
    status: "unavailable",
    workload: 0,
    assignedTickets: 0,
    completedToday: 0,
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

// Workload component
const Workload = ({ value }: { value: number }) => {
  let color = "bg-green-500"

  if (value > 70) {
    color = "bg-red-500"
  } else if (value > 40) {
    color = "bg-yellow-500"
  }

  return (
    <div className="flex items-center gap-2">
      <Progress value={value} className="h-2" indicatorClassName={color} />
      <span className="text-xs font-medium">{value}%</span>
    </div>
  )
}

export function AdminTechnicians() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Técnico</TableHead>
            <TableHead className="w-[120px]">Estado</TableHead>
            <TableHead>Carga de trabajo</TableHead>
            <TableHead className="w-[100px]">Asignados</TableHead>
            <TableHead className="w-[120px]">Completados hoy</TableHead>
            <TableHead className="w-[80px] text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {techniciansData.map((technician) => (
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
                    <div className="text-xs text-muted-foreground">{technician.department}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={technician.status} />
              </TableCell>
              <TableCell>
                <Workload value={technician.workload} />
              </TableCell>
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
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
