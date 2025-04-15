"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AdminStats } from "@/components/admin-stats";
import { AdminRequestsTable } from "@/components/admin-requests-table";
import { AdminTechnicians } from "@/components/admin-technicians";
import { Download, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminDashboard() {
  const router = useRouter();
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleManageRequests = () => {
    router.push("/admin/solicitudes");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Panel de Administración
          </h2>
          <p className="text-muted-foreground">
            Bienvenido al panel de administración de la Mesa de Ayuda Virtual.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Actualizar</span>
          </Button>
          {/* <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Exportar</span>
          </Button> */}
        </div>
      </div>

      {/* Resto del código permanece igual */}
      <AdminStats />

      <Tabs defaultValue="recent" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="recent">Solicitudes Recientes</TabsTrigger>
            <TabsTrigger value="technicians">Técnicos Disponibles</TabsTrigger>
          </TabsList>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleManageRequests}
          >
            Gestionar Solicitudes
          </Button>
        </div>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Solicitudes Recientes</CardTitle>
              <CardDescription>
                Se muestran las 10 solicitudes más recientes que requieren
                atención.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminRequestsTable limit={10} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicians" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Técnicos Disponibles</CardTitle>
              <CardDescription>
                Estado actual y carga de trabajo de los técnicos de soporte.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminTechnicians />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
