"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  UserCog,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
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
  getAllTickets,
  getTechniciansList,
  assignTechnicianToTicket,
  deleteTicket,
  closeTicket,
} from "@/lib/connections";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

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

interface Technician {
  alf_num: string;
  user: string;
  email: string;
  num_tickets: number;
}

interface Ticket {
  id_ticket: number;
  id: string;
  user: string;
  id_area: string | null;
  type: string;
  description: string;
  status: number;
  fecha_creacion: string;
  fecha_cierre: string;
  cantidad_horas_atencion: number;
  technician: string | null;
}

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

interface AdminRequestsTableProps {
  limit?: number;
  onTicketUpdate?: () => void;
  itemsPerPage?: number;
}

export function AdminRequestsTable({
  limit,
  onTicketUpdate,
  itemsPerPage = 10,
}: AdminRequestsTableProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<number | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Ticket | null>(null);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);
  const [technicianSearchTerm, setTechnicianSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllTickets();
        setRequests(data);
        setLoading(false);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const filteredRequests = requests.filter((request) => {
    const matchesFilter = filter === "all" || request.status === filter;
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      request.id.toLowerCase().includes(searchTermLower) ||
      request.user.toLowerCase().includes(searchTermLower) ||
      (request.description &&
        request.description.toLowerCase().includes(searchTermLower)) ||
      (request.technician &&
        request.technician.toLowerCase().includes(searchTermLower));

    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredRequests.length / itemsPerPage));
    setCurrentPage(1);
  }, [filteredRequests, itemsPerPage]);

  const getPaginatedRequests = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRequests.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Función para marcar un ticket como resuelto
  const handleResolveTicket = async (ticketId: number) => {
    try {
      // 1. Cerrar el ticket (esto activará el trigger en la BD)
      await closeTicket(ticketId);

      // 2. Obtener los datos actualizados del ticket desde el backend
      const updatedTickets = await getAllTickets(); // O usa una función específica como getTicketById(ticketId)
      // Añade anotación de tipo al parámetro 't' (t: Ticket)
      const updatedTicket = updatedTickets.find(
        (t: Ticket) => t.id_ticket === ticketId
      );

      if (!updatedTicket) {
        throw new Error("No se pudo obtener el ticket actualizado");
      }

      // 3. Actualizar el estado local con los nuevos datos
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id_ticket === ticketId
            ? {
                ...request,
                status: 4, // Resuelto
                fecha_cierre: updatedTicket.fecha_cierre,
                cantidad_horas_atencion: updatedTicket.cantidad_horas_atencion, // Actualizado por el trigger
              }
            : request
        )
      );

      toast({
        title: "Ticket resuelto",
        description:
          "El ticket ha sido marcado como resuelto con la hora de atención calculada.",
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
  // Función para formatear horas decimales a "X h Y m"
  const formatHoursToHm = (decimalHours: number) => {
    const horas = Math.floor(decimalHours);
    const minutos = Math.round((decimalHours - horas) * 60);
    return `${horas} h ${minutos} m`;
  };
  // Función para cancelar un ticket
  const handleCancelTicket = async (ticketId: string) => {
    try {
      await deleteTicket(ticketId);

      // Actualizar el estado local eliminando el ticket cancelado
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== ticketId)
      );

      // Llamar a la función de actualización
      if (onTicketUpdate) {
        onTicketUpdate();
      }

      toast({
        title: "Solicitud cancelada",
        description: "El ticket ha sido cancelado exitosamente.",
        variant: "default",
      });

      // Recargar la página para asegurar la sincronización
      router.refresh();
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

  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.user.toLowerCase().includes(technicianSearchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(technicianSearchTerm.toLowerCase()) ||
      tech.alf_num.toLowerCase().includes(technicianSearchTerm.toLowerCase())
  );

  const WorkloadIndicator = ({ numTickets }: { numTickets: number }) => {
    const workloadPercentage = Math.min(100, (numTickets / 10) * 100);

    return (
      <div className="w-full">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Carga de trabajo</span>
          <span>{numTickets} tickets</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              workloadPercentage < 30
                ? "bg-green-500"
                : workloadPercentage < 70
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${workloadPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const openAssignDialog = async (request: Ticket) => {
    setSelectedRequest(request);
    setSelectedTechnician(null);
    setTechnicianSearchTerm("");
    setIsAssignDialogOpen(true);
    setOpenMenuId(null);

    try {
      const techList = await getTechniciansList();
      setTechnicians(techList);
    } catch (error) {
      console.error("Error cargando técnicos:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los técnicos",
        variant: "destructive",
      });
    }
  };

  const assignTechnician = async () => {
    if (!selectedRequest || !selectedTechnician) return;

    try {
      await assignTechnicianToTicket({
        id_ticket: selectedRequest.id_ticket,
        alf_num_tecnico_asignado: selectedTechnician.alf_num,
      });

      const updatedRequests = requests.map((req) =>
        req.id_ticket === selectedRequest.id_ticket
          ? {
              ...req,
              technician: selectedTechnician.user,
              status: 2,
            }
          : req
      );

      setRequests(updatedRequests);
      setIsAssignDialogOpen(false);

      toast({
        title: "Éxito",
        description: "Técnico asignado correctamente",
        variant: "default",
      });

      if (onTicketUpdate) {
        onTicketUpdate();
      }
    } catch (error) {
      console.error("Error asignando técnico:", error);
      toast({
        title: "Error",
        description: "No se pudo asignar el técnico",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {!limit && (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar por ID, usuario, descripción o técnico..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-64">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select
              value={filter === "all" ? "all" : filter.toString()}
              onValueChange={(value) =>
                setFilter(value === "all" ? "all" : Number(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="1">Abiertos</SelectItem>
                <SelectItem value="2">En proceso</SelectItem>
                <SelectItem value="3">Pendientes</SelectItem>
                <SelectItem value="4">Resueltos</SelectItem>
                <SelectItem value="5">Cerrados</SelectItem>
                <SelectItem value="6">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID Ticket</TableHead>
              <TableHead className="w-[140px]">Usuario</TableHead>
              <TableHead className="w-[120px]">Departamento</TableHead>
              <TableHead className="w-[120px]">Tipo</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead className="w-[100px]">Fecha</TableHead>
              <TableHead className="w-[100px]">Total de horas</TableHead>
              <TableHead className="w-[120px]">Técnico</TableHead>
              <TableHead className="w-[80px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  Cargando solicitudes...
                </TableCell>
              </TableRow>
            ) : getPaginatedRequests().length > 0 ? (
              getPaginatedRequests().map((request) => (
                <TableRow key={request.id_ticket}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.user}</TableCell>
                  <TableCell>{request.id_area || "-"}</TableCell>
                  <TableCell>{request.type}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {request.description}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell>
                    {`${formatDate(request.fecha_creacion)}\n\n${
                      request.fecha_cierre
                        ? formatDate(request.fecha_cierre)
                        : "-"
                    }`}
                  </TableCell>
                  <TableCell>
                    {request.cantidad_horas_atencion !== null &&
                    request.cantidad_horas_atencion !== undefined
                      ? formatHoursToHm(request.cantidad_horas_atencion)
                      : "-"}
                  </TableCell>
                  <TableCell>{request.technician || "-"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      open={openMenuId === request.id_ticket}
                      onOpenChange={(open) =>
                        setOpenMenuId(open ? request.id_ticket : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenMenuId((prev) =>
                              prev === request.id_ticket
                                ? null
                                : request.id_ticket
                            );
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        onInteractOutside={(e) => {
                          const target = e.target as HTMLElement;
                          if (!target.closest(".dialog-content")) {
                            setOpenMenuId(null);
                          }
                        }}
                      >
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openAssignDialog(request);
                          }}
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Asignar técnico</span>
                        </DropdownMenuItem>
                        {[2, 3].includes(request.status) && (
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleResolveTicket(request.id_ticket);
                            }}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Marcar como resuelto</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCancelTicket(request.id);
                          }}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Cancelar solicitud</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No se encontraron solicitudes que coincidan con los criterios
                  de búsqueda.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!limit && filteredRequests.length > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Mostrando{" "}
            <strong>
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                filteredRequests.length
              )}
              -{Math.min(currentPage * itemsPerPage, filteredRequests.length)}
            </strong>{" "}
            de <strong>{filteredRequests.length}</strong> tickets
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-2">...</span>
              )}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="dialog-content sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Asignar Técnico</DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <>
                  Solicitud:{" "}
                  <span className="font-medium">
                    SOL-{selectedRequest.id_ticket.toString().padStart(5, "0")}
                  </span>{" "}
                  - {selectedRequest.description}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Técnicos disponibles</p>
              <p className="text-xs text-muted-foreground mb-4">
                Seleccione un técnico para asignar esta solicitud.
              </p>
              <Input
                placeholder="Buscar por nombre, email o ALF..."
                className="mb-4"
                value={technicianSearchTerm}
                onChange={(e) => setTechnicianSearchTerm(e.target.value)}
              />
            </div>

            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {filteredTechnicians.map((technician) => (
                  <div
                    key={technician.alf_num}
                    className={`rounded-lg border p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedTechnician?.alf_num === technician.alf_num
                        ? "border-red-500 bg-red-50"
                        : ""
                    }`}
                    onClick={() => setSelectedTechnician(technician)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarImage
                            src={`/avatars/${technician.alf_num}.jpg`}
                            alt={technician.user}
                          />
                          <AvatarFallback className="bg-red-50 text-red-700 text-xs">
                            {technician.user
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{technician.user}</div>
                          <div className="text-xs text-muted-foreground">
                            {technician.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ALF: {technician.alf_num}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          technician.num_tickets < 3 ? "default" : "destructive"
                        }
                      >
                        {technician.num_tickets < 3 ? "Disponible" : "Ocupado"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <WorkloadIndicator numTickets={technician.num_tickets} />
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">
                          {technician.num_tickets}
                        </span>{" "}
                        tickets asignados actualmente
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={assignTechnician}
              disabled={!selectedTechnician}
            >
              <UserCog className="mr-2 h-4 w-4" />
              Asignar técnico
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
