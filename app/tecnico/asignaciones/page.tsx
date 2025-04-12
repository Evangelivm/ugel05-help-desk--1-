import { TechnicianLayout } from "@/components/technician-layout"
import { TechnicianAssignments } from "@/components/technician-assignments"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function TechnicianAssignmentsPage() {
  return (
    <TechnicianLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Mis Asignaciones</h2>
            <p className="text-muted-foreground">Gestione las solicitudes de soporte asignadas a usted.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Actualizar</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Solicitudes Asignadas</CardTitle>
            <CardDescription>Lista de todas las solicitudes de soporte asignadas a usted.</CardDescription>
          </CardHeader>
          <CardContent>
            <TechnicianAssignments />
          </CardContent>
        </Card>
      </div>
    </TechnicianLayout>
  )
}
