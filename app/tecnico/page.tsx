import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { TechnicianLayout } from "@/components/technician-layout";
import { TechnicianContainer } from "@/components/technician-container";

export default async function TechnicianPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  // Verify technician role (id_rol === 2)
  if (session.user.id_rol !== 2) {
    redirect("/");
  }

  return (
    <TechnicianLayout>
      <TechnicianContainer />
    </TechnicianLayout>
  );
}
