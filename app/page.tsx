// app/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { HelpDeskLayout } from "@/components/help-desk-layout";
import { DashboardContainer } from "@/components/dashboard-container";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.id_rol === 2) {
    redirect("/tecnico");
  }
  if (session.user.id_rol === 3) {
    redirect("/admin");
  }

  return (
    <HelpDeskLayout>
      <DashboardContainer />
    </HelpDeskLayout>
  );
}
