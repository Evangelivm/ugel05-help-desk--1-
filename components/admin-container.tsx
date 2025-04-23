"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AdminStats } from "./admin-stats";
import { AdminRequestsTable } from "./admin-requests-table";
import { getAdminMetrics } from "@/lib/connections";

export function AdminContainer() {
  const { data: session } = useSession();
  const [metrics, setMetrics] = useState<any>(null);

  const fetchMetrics = async () => {
    if (session?.user?.alf_num) {
      try {
        const data = await getAdminMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching admin metrics:", error);
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
      <AdminStats metrics={metrics} />
      <AdminRequestsTable onTicketUpdate={handleTicketUpdate} />
    </div>
  );
}
