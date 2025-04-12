import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { HelpDeskLayout } from "@/components/help-desk-layout";
import { MyRequests } from "@/components/my-requests";
import { DashboardStats } from "@/components/dashboard-stats";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Si no hay sesión, redirigir a /login
  if (!session) {
    redirect("/login");
  }

  return (
    <HelpDeskLayout>
      <div className="space-y-6">
        <DashboardStats />
        <MyRequests />
      </div>
    </HelpDeskLayout>
  );
}
