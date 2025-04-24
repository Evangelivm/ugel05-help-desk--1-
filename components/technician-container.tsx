"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TechnicianStats } from "./technician-stats";
import { TechnicianDashboard } from "./technician-dashboard";
import { getTechnicianMetrics } from "@/lib/connections";

export function TechnicianContainer() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<any>(null);

  const fetchMetrics = async () => {
    if (session?.user?.alf_num) {
      try {
        const data = await getTechnicianMetrics(session.user.alf_num);
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching technician metrics:", error);
      }
    }
  };

  const handleTicketUpdate = () => {
    fetchMetrics();
  };

  useEffect(() => {
    fetchMetrics();
  }, [session?.user?.alf_num]);

  return (
    <div className="space-y-6">
      <TechnicianStats metrics={metrics} />
      <TechnicianDashboard onTicketUpdate={handleTicketUpdate} />
    </div>
  );
}
