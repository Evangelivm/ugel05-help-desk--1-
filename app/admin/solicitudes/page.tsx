import { AdminLayout } from "@/components/admin-layout";
import { AdminRequestsTable } from "@/components/admin-requests-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function AdminRequestsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Gestión de Solicitudes
            </h2>
            <p className="text-muted-foreground">
              Administre todas las solicitudes de soporte técnico.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Exportar</span>
            </Button> */}
            <Button className="bg-red-600 hover:bg-red-700 text-white h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span>Nueva solicitud</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Todas las solicitudes</CardTitle>
            <CardDescription>
              Visualice, filtre y gestione todas las solicitudes de soporte
              técnico.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRequestsTable />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
