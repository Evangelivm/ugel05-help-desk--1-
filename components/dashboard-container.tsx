// components/dashboard-container.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { DashboardStats } from "./dashboard-stats";
import { MyRequests } from "./my-requests";
import { getTicketMetrics } from "@/lib/connections";

export function DashboardContainer() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<any>(null);

  const fetchMetrics = async () => {
    if (session?.user?.alf_num) {
      try {
        const data = await getTicketMetrics(session.user.alf_num);
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    }
  };

  // Función para actualizar las métricas que pasaremos a MyRequests
  const handleTicketUpdate = () => {
    fetchMetrics();
  };

  useEffect(() => {
    fetchMetrics();
  }, [session?.user?.alf_num]);

  return (
    <div className="space-y-6">
      <DashboardStats metrics={metrics} />
      <MyRequests onTicketUpdate={handleTicketUpdate} />
    </div>
  );
}
