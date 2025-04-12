"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
  MessageSquare,
  History,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Plus } from "lucide-react";
import { getTicketHistory } from "@/lib/connections";

// Mapeo de estados numéricos a texto y colores
const statusMap = {
  1: {
    text: "Abierto",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: <Clock className="mr-1 h-3 w-3" />,
  },
  2: {
    text: "En Proceso",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: <AlertTriangle className="mr-1 h-3 w-3" />,
  },
  3: {
    text: "Pendiente",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: <Clock className="mr-1 h-3 w-3" />,
  },
  4: {
    text: "Resuelto",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: <CheckCircle className="mr-1 h-3 w-3" />,
  },
  5: {
    text: "Cerrado",
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: <CheckCircle className="mr-1 h-3 w-3" />,
  },
  6: {
    text: "Cancelado",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: <XCircle className="mr-1 h-3 w-3" />,
  },
};

// Status badge component
const StatusBadge = ({ status }: { status: number }) => {
  const statusInfo = statusMap[status as keyof typeof statusMap] || {
    text: "Desconocido",
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: null,
  };

  return (
    <Badge
      variant="outline"
      className={`${statusInfo.color} flex items-center`}
    >
      {statusInfo.icon}
      {statusInfo.text}
    </Badge>
  );
};

export function MyRequests() {
  const { data: session } = useSession();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketHistory = async () => {
      try {
        if (session?.user?.alf_num) {
          const data = await getTicketHistory(session.user.alf_num);
          setRequests(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error al obtener el historial de tickets:", err);
        setError("No se pudo cargar el historial de solicitudes");
        setLoading(false);
      }
    };

    fetchTicketHistory();
  }, [session?.user?.alf_num]);

  // Filter requests based on status and search term
  const filteredRequests = requests.filter((request) => {
    const matchesFilter =
      filter === "all" || request.status.toString() === filter;
    const matchesSearch =
      request.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Formatear fecha para mostrarla sin la hora
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gradient-to-r from-red-50 to-white border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-red-800">
              MIS SOLICITUDES DE SOPORTE
            </CardTitle>
            <CardDescription className="text-gray-600">
              Historial y seguimiento de sus solicitudes de soporte técnico
            </CardDescription>
          </div>
          <Link href="/solicitar-soporte">
            <Button className="bg-red-600 hover:bg-red-700 text-white h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span>Nueva solicitud</span>
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por ID o descripción..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-64">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="1">Abierto</SelectItem>
                <SelectItem value="2">En Proceso</SelectItem>
                <SelectItem value="3">Pendiente</SelectItem>
                <SelectItem value="4">Resuelto</SelectItem>
                <SelectItem value="5">Cerrado</SelectItem>
                <SelectItem value="6">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">ID</TableHead>
                <TableHead className="w-[150px]">Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="w-[140px]">Estado</TableHead>
                <TableHead className="w-[100px]">Fecha</TableHead>
                <TableHead className="w-[150px]">Técnico</TableHead>
                <TableHead className="w-[80px] text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {request.description}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell>{formatDate(request.fecha)}</TableCell>
                    <TableCell>{request.technician || "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Acciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            {/* <Link href={`/solicitudes/${request.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Ver detalles</span>
                            </Link> */}
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Enviar mensaje</span>
                          </DropdownMenuItem> */}
                          {[1, 3].includes(request.status) && ( // Abierto o Pendiente
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Cancelar solicitud</span>
                            </DropdownMenuItem>
                          )}
                          {/* {[2].includes(request.status) && ( // En Proceso
                            <DropdownMenuItem>
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              <span>Solicitar prioridad</span>
                            </DropdownMenuItem>
                          )} */}
                          {/* {[4].includes(request.status) && ( // Resuelto
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Confirmar resolución</span>
                            </DropdownMenuItem>
                          )} */}
                          {/* <DropdownMenuItem>
                            <History className="mr-2 h-4 w-4" />
                            <span>Ver historial</span>
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No se encontraron solicitudes que coincidan con los
                    criterios de búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
