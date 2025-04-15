import { AdminLayout } from "@/components/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminTechniciansList } from "@/components/admin-technicians-list";
import { AdminTechnicianPerformance } from "@/components/admin-technician-performance";
import { Download, Plus } from "lucide-react";

export default function AdminTechniciansPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Gestión de Técnicos
            </h2>
            <p className="text-muted-foreground">
              Administre el equipo de soporte técnico y sus asignaciones.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Exportar</span>
            </Button> */}
            <Button className="bg-red-600 hover:bg-red-700 text-white h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span>Nuevo técnico</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">Lista de Técnicos</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Equipo de Soporte Técnico</CardTitle>
                <CardDescription>
                  Gestione los técnicos, sus especialidades y disponibilidad.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminTechniciansList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Rendimiento de Técnicos</CardTitle>
                <CardDescription>
                  Análisis de rendimiento y productividad del equipo técnico.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminTechnicianPerformance />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
