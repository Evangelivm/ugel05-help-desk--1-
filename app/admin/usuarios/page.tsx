import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Plus, Search, MoreHorizontal, UserCog, Mail, ShieldAlert, UserX } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for users
const usersData = [
  {
    id: 1,
    name: "María Rodríguez",
    email: "mrodriguez@ugel05.gob.pe",
    department: "Dirección",
    role: "admin",
    status: "active",
    lastLogin: "2024-04-04 09:15",
    avatar: null,
  },
  {
    id: 2,
    name: "Juan Pérez",
    email: "jperez@ugel05.gob.pe",
    department: "Recursos Humanos",
    role: "user",
    status: "active",
    lastLogin: "2024-04-04 08:30",
    avatar: null,
  },
  {
    id: 3,
    name: "Carlos López",
    email: "clopez@ugel05.gob.pe",
    department: "Administración",
    role: "user",
    status: "active",
    lastLogin: "2024-04-03 15:45",
    avatar: null,
  },
  {
    id: 4,
    name: "Ana Torres",
    email: "atorres@ugel05.gob.pe",
    department: "Secretaría",
    role: "user",
    status: "active",
    lastLogin: "2024-04-03 14:20",
    avatar: null,
  },
  {
    id: 5,
    name: "Pedro Gómez",
    email: "pgomez@ugel05.gob.pe",
    department: "Contabilidad",
    role: "user",
    status: "inactive",
    lastLogin: "2024-03-28 10:10",
    avatar: null,
  },
  {
    id: 6,
    name: "Laura Sánchez",
    email: "lsanchez@ugel05.gob.pe",
    department: "Dirección",
    role: "admin",
    status: "active",
    lastLogin: "2024-04-04 07:55",
    avatar: null,
  },
  {
    id: 7,
    name: "Roberto Díaz",
    email: "rdiaz@ugel05.gob.pe",
    department: "Informática",
    role: "technician",
    status: "active",
    lastLogin: "2024-04-04 08:05",
    avatar: null,
  },
  {
    id: 8,
    name: "Carmen Flores",
    email: "cflores@ugel05.gob.pe",
    department: "Recursos Humanos",
    role: "user",
    status: "active",
    lastLogin: "2024-04-02 16:30",
    avatar: null,
  },
]

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h2>
            <p className="text-muted-foreground">Administre los usuarios del sistema de Mesa de Ayuda Virtual.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Exportar</span>
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span>Nuevo usuario</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Usuarios del sistema</CardTitle>
            <CardDescription>Lista de todos los usuarios registrados en el sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Buscar por nombre, correo o departamento..." className="pl-8" />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Usuario</TableHead>
                    <TableHead className="w-[150px]">Departamento</TableHead>
                    <TableHead className="w-[100px]">Rol</TableHead>
                    <TableHead className="w-[100px]">Estado</TableHead>
                    <TableHead className="w-[150px]">Último acceso</TableHead>
                    <TableHead className="w-[80px] text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-gray-200">
                            <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} alt={user.name} />
                            <AvatarFallback className="bg-red-50 text-red-700 text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        {user.role === "admin" ? (
                          <Badge className="bg-red-600 hover:bg-red-700">Admin</Badge>
                        ) : user.role === "technician" ? (
                          <Badge className="bg-blue-600 hover:bg-blue-700">Técnico</Badge>
                        ) : (
                          <Badge variant="outline">Usuario</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Activo
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            Inactivo
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
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
                              <span>Editar usuario</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Enviar correo</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShieldAlert className="mr-2 h-4 w-4" />
                              <span>Cambiar permisos</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <UserX className="mr-2 h-4 w-4" />
                              <span>Desactivar usuario</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
