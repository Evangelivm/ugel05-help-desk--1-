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
import { TechnicianStats } from "@/components/technician-stats";
import { TechnicianAssignments } from "@/components/technician-assignments";
import { TechnicianActivity } from "@/components/technician-activity";
import { RefreshCw, Calendar } from "lucide-react";
import { useState } from "react";

export function TechnicianDashboard({
  onTicketUpdate,
}: {
  onTicketUpdate?: () => void;
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (onTicketUpdate) {
        await onTicketUpdate();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleStatusChange = async () => {
    if (onTicketUpdate) {
      await onTicketUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Panel de Técnico
          </h2>
          <p className="text-muted-foreground">
            Bienvenido al panel de técnico de la Mesa de Ayuda Virtual.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span>Actualizar</span>
          </Button>
          {/* <Button variant="outline" size="sm" className="h-8 gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Mi horario</span>
          </Button> */}
        </div>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="assignments">Asignaciones Actuales</TabsTrigger>
            {/* <TabsTrigger value="activity">Actividad Reciente</TabsTrigger> */}
          </TabsList>
        </div>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Mis Asignaciones</CardTitle>
              <CardDescription>
                Solicitudes de soporte asignadas a usted que requieren atención.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TechnicianAssignments />
              {/* <TechnicianAssignments onStatusChange={handleStatusChange} /> */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Historial de sus actividades y resoluciones recientes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TechnicianActivity />
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
