"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react";

interface TechnicianMetrics {
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
}

export function TechnicianStats({ metrics }: { metrics?: TechnicianMetrics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Tickets Asignados
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.totals.currentMonth ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            Total asignado actualmente
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Tickets Resueltos
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus.resueltos ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">Resueltos este mes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Tickets Pendientes
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus.pendientes ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">Requieren atención</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
          <Clock className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.tiempoPromedio.current
              ? `${metrics.tiempoPromedio.current.toFixed(1)}h`
              : "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics?.tiempoPromedio.isImprovement
              ? "Mejora vs mes anterior"
              : "Incremento vs mes anterior"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
