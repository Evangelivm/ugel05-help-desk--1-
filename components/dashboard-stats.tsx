"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";

interface TicketMetrics {
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

export function DashboardStats({ metrics }: { metrics?: TicketMetrics }) {
  // Calcular total pendientes (abiertos + en proceso + pendientes)
  const totalPendientes = metrics
    ? metrics.ticketsByStatus.abiertos +
      metrics.ticketsByStatus.enProceso +
      metrics.ticketsByStatus.pendientes
    : 0;

  // Calcular diferencia para pendientes
  const diferenciaPendientes = metrics
    ? metrics.totals.currentMonth - metrics.totals.previousMonth
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Solicitudes Pendientes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Solicitudes Pendientes
          </CardTitle>
          <Clock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics ? totalPendientes : "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics ? (
              <>
                {diferenciaPendientes >= 0 ? "+" : ""}
                {diferenciaPendientes} desde el mes pasado
              </>
            ) : (
              "Cargando datos..."
            )}
          </p>
        </CardContent>
      </Card>

      {/* Solicitudes Resueltas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Solicitudes Resueltas
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus.resueltos ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics
              ? `${metrics.totals.currentMonth} este mes`
              : "Cargando datos..."}
          </p>
        </CardContent>
      </Card>

      {/* Tiempo Promedio */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
          <BarChart3 className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics ? `${metrics.tiempoPromedio.current.toFixed(1)}h` : "--"}
          </div>
          <p
            className={`text-xs ${
              metrics?.tiempoPromedio.isImprovement
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {metrics ? (
              <>
                {metrics.tiempoPromedio.difference >= 0 ? "+" : ""}
                {metrics.tiempoPromedio.difference.toFixed(1)}h desde el mes
                pasado
              </>
            ) : (
              "Cargando datos..."
            )}
          </p>
        </CardContent>
      </Card>

      {/* Tickets en Proceso */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Tickets en Proceso
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.ticketsByStatus.enProceso ?? "--"}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics
              ? `${metrics.ticketsByStatus.abiertos} abiertos`
              : "Cargando datos..."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
