"use client";
import { TechnicianLayout } from "@/components/technician-layout";
import { TechnicianDashboard } from "@/components/technician-dashboard";
import { useSession } from "next-auth/react";

export default function TechnicianPage() {
  const { data: session, status } = useSession();
  return (
    <TechnicianLayout>
      <TechnicianDashboard />
    </TechnicianLayout>
  );
}
