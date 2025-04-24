"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Calendar,
  Phone,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getTechnicianTickets,
  deleteTicket,
  closeTicket,
} from "@/lib/connections";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

// Agregar la interface para las props
interface TechnicianAssignmentsProps {
  onTicketUpdate?: () => void;
}

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

const formatHoursToHm = (decimalHours: number) => {
  const horas = Math.floor(decimalHours);
  const minutos = Math.round((decimalHours - horas) * 60);
  return `${horas} h ${minutos} m`;
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

export function TechnicianAssignments({
  onTicketUpdate,
}: TechnicianAssignmentsProps) {
  const { data: session } = useSession();
  const [filter, setFilter] = useState("all");
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTechnicianAssignments = async () => {
      try {
        if (session?.user?.alf_num) {
          // Asumimos que hay una función para obtener las asignaciones del técnico
          const data = await getTechnicianTickets(session.user.alf_num); // true para indicar que es vista de técnico
          setAssignments(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error al obtener las asignaciones:", err);
        setError("No se pudo cargar las asignaciones");
        setLoading(false);
      }
    };

    fetchTechnicianAssignments();
  }, [session?.user?.alf_num]);

  // Función para cancelar un ticket
  const handleCancelTicket = async (ticketId: string) => {
    try {
      await deleteTicket(ticketId);

      // Actualizar el estado local eliminando el ticket cancelado
      setAssignments((prevAssignments) =>
        prevAssignments.filter((assignment) => assignment.id !== ticketId)
      );

      toast({
        title: "Solicitud cancelada",
        description: "El ticket ha sido cancelado exitosamente.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error al cancelar el ticket:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "No se pudo cancelar el ticket",
        variant: "destructive",
      });
    }
  };
  // En TechnicianAssignments, después de handleCancelTicket
  const handleResolveTicket = async (ticketId: number) => {
    try {
      await closeTicket(ticketId);

      // Actualizar el estado local
      const updatedAssignments = await getTechnicianTickets(
        session?.user?.alf_num || ""
      );
      setAssignments(updatedAssignments);

      toast({
        title: "Ticket resuelto",
        description: "El ticket ha sido marcado como resuelto correctamente.",
        variant: "default",
      });

      if (onTicketUpdate) onTicketUpdate();
    } catch (error) {
      console.error("Error al resolver el ticket:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error desconocido",
        variant: "destructive",
      });
    }
  };
  // Formatear fecha para mostrarla sin la hora
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Filter assignments based on status
  const filteredAssignments = assignments.filter((assignment) => {
    return filter === "all" || assignment.status.toString() === filter;
  });

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
    <div>
      <div className="flex justify-end mb-4">
        <div className="w-48">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
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
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[140px]">Usuario</TableHead>
              <TableHead className="w-[120px]">Departamento</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead className="w-[100px]">Fecha</TableHead>
              <TableHead className="w-[100px]">Total de horas</TableHead>
              <TableHead className="w-[80px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.id}</TableCell>
                  <TableCell>
                    {assignment.user || "Usuario no especificado"}
                  </TableCell>
                  <TableCell>
                    {assignment.type || "Departamento no especificado"}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {assignment.description}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={assignment.status} />
                  </TableCell>
                  <TableCell>
                    {`${formatDate(assignment.fecha_creacion)}\n\n${
                      assignment.fecha_cierre
                        ? formatDate(assignment.fecha_cierre)
                        : "-"
                    }`}
                  </TableCell>
                  <TableCell>
                    {assignment.cantidad_horas_atencion !== null &&
                    assignment.cantidad_horas_atencion !== undefined
                      ? formatHoursToHm(assignment.cantidad_horas_atencion)
                      : "-"}
                  </TableCell>
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
                          {/* <Link href={`/solicitudes/${assignment.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver detalles</span>
                          </Link> */}
                        </DropdownMenuItem>
                        {/* Solo mostrar si el estado NO es resuelto (4) */}
                        {assignment.status !== 4 && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleResolveTicket(assignment.id_ticket)
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Marcar como resuelto</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link
                            href={`https://wa.me/51${
                              assignment.celular || "NUMERO_DE_TELEFONO"
                            }`}
                            target="_blank"
                          >
                            <FaWhatsapp className="mr-2 h-4 w-4" />
                            <span>Abrir Whatsapp</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`tel:${assignment.celular || ""}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            <span>Llamar al usuario</span>
                          </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Programar visita</span>
                        </DropdownMenuItem> */}
                        {[1, 2, 3].includes(assignment.status) && (
                          <DropdownMenuItem
                            onClick={() => handleCancelTicket(assignment.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Cancelar solicitud</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No hay asignaciones que coincidan con el filtro seleccionado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
