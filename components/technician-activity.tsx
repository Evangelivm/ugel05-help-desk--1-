"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Eye, Clock } from "lucide-react"

// Sample data for activity
const activityData = [
  {
    id: "SOL-2024-0037",
    user: "Laura Sánchez",
    description: "Necesito restablecer contraseña de correo",
    action: "resolved",
    date: "2024-04-01 15:30",
    resolutionTime: "0.5h",
    notes: "Se restableció la contraseña y se verificó el acceso con el usuario.",
  },
  {
    id: "SOL-2024-0034",
    user: "Miguel Martínez",
    description: "Problemas con Microsoft Excel",
    action: "resolved",
    date: "2024-03-31 14:20",
    resolutionTime: "1.2h",
    notes: "Se reparó la instalación de Office y se actualizó a la última versión.",
  },
  {
    id: "SOL-2024-0032",
    user: "Javier Herrera",
    description: "Monitor con problemas de visualización",
    action: "resolved",
    date: "2024-03-29 11:45",
    resolutionTime: "1.5h",
    notes: "Se reemplazó el cable HDMI y se ajustó la configuración de pantalla.",
  },
  {
    id: "SOL-2024-0030",
    user: "Elena Castro",
    description: "Problemas con la conexión VPN",
    action: "resolved",
    date: "2024-03-28 16:10",
    resolutionTime: "2.0h",
    notes: "Se reinstalaron los certificados de seguridad y se configuró correctamente el cliente VPN.",
  },
  {
    id: "SOL-2024-0028",
    user: "Roberto Díaz",
    description: "Impresora no imprime documentos PDF",
    action: "resolved",
    date: "2024-03-27 10:30",
    resolutionTime: "1.0h",
    notes: "Se actualizó el driver de la impresora y se reinstalaron los componentes de Adobe.",
  },
]

export function TechnicianActivity() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[140px]">Usuario</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead className="w-[120px]">Fecha</TableHead>
            <TableHead className="w-[100px]">Tiempo</TableHead>
            <TableHead className="w-[80px] text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activityData.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">{activity.id}</TableCell>
              <TableCell>{activity.user}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                <div>
                  <div>{activity.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{activity.notes}</div>
                </div>
              </TableCell>
              <TableCell>{activity.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{activity.resolutionTime}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge className="bg-green-600 hover:bg-green-700 mr-2">
                  <CheckCircle className="mr-1 h-3 w-3" /> Resuelto
                </Badge>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver detalles</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
