"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Contact2, FolderOpenDot, ListChecks } from "lucide-react";

interface TicketMetrics {
  ticketsByStatus: {
    abiertos: number;
    enProceso: number;
    pendientes: number;
    resueltos: number;
  };
  tiempoPromedio: {
    current: number | null;
    difference: number | null;
    percentage: number;
    isImprovement: boolean;
  };
  totals: {
    currentMonth: number;
    previousMonth: number;
  };
}

export function DashboardStats({ metrics }: { metrics?: TicketMetrics }) {
  // Función auxiliar para formatear números con manejo de null
  const formatTime = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "0.0";
    return value.toFixed(1);
  };

  // Función para calcular el porcentaje con manejo de null
  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return "0";
    return Math.abs(value).toFixed(0);
  };

  // Función para calcular la diferencia de tickets
  const calculateTicketDifference = (current?: number, previous?: number) => {
    const curr = current || 0;
    const prev = previous || 0;
    return `+${curr - prev}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tiempo Promedio de Respuesta
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatTime(metrics?.tiempoPromedio.current)}h
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics?.tiempoPromedio.isImprovement ? "+" : "-"}
            {formatPercentage(metrics?.tiempoPromedio.percentage)}% vs mes
            anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tickets este mes
          </CardTitle>
          <FolderOpenDot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.totals.currentMonth || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {calculateTicketDifference(
              metrics?.totals.currentMonth,
              metrics?.totals.previousMonth
            )}{" "}
            desde el mes anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tickets en Proceso
          </CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus.enProceso || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics?.ticketsByStatus.resueltos || 0} tickets resueltos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tickets Pendientes
          </CardTitle>
          <Contact2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus.pendientes || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics?.ticketsByStatus.abiertos || 0} tickets abiertos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
