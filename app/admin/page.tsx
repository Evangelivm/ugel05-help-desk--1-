import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AdminLayout } from "@/components/admin-layout";
import { AdminContainer } from "@/components/admin-container";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  // Verify admin role (id_rol === 3)
  if (session.user.id_rol !== 3) {
    redirect("/");
  }

  return (
    <AdminLayout>
      <AdminContainer />
    </AdminLayout>
  );
}
