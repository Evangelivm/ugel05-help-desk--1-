"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, Wrench, AlertTriangle } from "lucide-react";

interface AdminMetrics {
  ticketsByStatus: {
    abiertos: number;
    enProceso: number;
    pendientes: number;
    resueltos: number;
  };
  tiempoPromedio: {
    current: number;
    difference: number;
    percentage: number;
    isImprovement: boolean;
  };
  totals: {
    currentMonth: number;
    previousMonth: number;
  };
  users: {
    totalUsers: number;
    totalTechnicians: number;
  };
  // Add other metrics as needed
}

export function AdminStats({ metrics }: { metrics?: AdminMetrics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Solicitudes Pendientes
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus?.pendientes ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics ? "Requieren atención" : "Cargando datos..."}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Solicitudes Resueltas
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus?.resueltos ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics ? "Total del mes" : "Cargando datos..."}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Técnicos Activos
          </CardTitle>
          <Wrench className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.users?.totalTechnicians ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics ? "En servicio" : "Cargando datos..."}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Tickets en Proceso
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus.enProceso ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            En atención actualmente
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
