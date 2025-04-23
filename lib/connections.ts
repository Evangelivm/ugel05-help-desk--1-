import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Reemplaza con la URL de tu backend

interface TicketData {
  alf_num_usuario: string;
  id_tipo_soporte: number | null;
  descripcion: string;
  id_estado_ticket: number;
}

interface SupportType {
  value: number;
  label: string;
}

interface TicketMetricsResponse {
  ticketsByStatus: {
    abiertos: number;
    enProceso: number;
    pendientes: number;
    resueltos: number;
  };
  tiempoPromedio: {
    current: number;
    difference: number;
    percentage: number;
    isImprovement: boolean;
  };
  totals: {
    currentMonth: number;
    previousMonth: number;
  };
}

interface MySQLUserData {
  alf_num: string;
  nombres: string; // Cambiado de user_firstname a nombres
  apellidos: string; // Cambiado de user_lastname a apellidos
  email: string;
  id_rol: number;
  dni: string;
  celular: string; // Cambiado de telefono a celular
  activo: boolean; // Nuevo campo
}

interface AssignTechnicianDto {
  id_ticket: number;
  alf_num_tecnico_asignado: string;
}

interface AssignedTicketResponse {
  id_ticket: number;
  alf_num_tecnico_asignado: string;
  id_estado_ticket: number;
  fecha_asignacion: string;
}

interface AdminMetricsResponse {
  ticketsByStatus: {
    abiertos: number;
    enProceso: number;
    pendientes: number;
    resueltos: number;
  };
  tiempoPromedio: {
    current: number;
    difference: number;
    percentage: number;
    isImprovement: boolean;
  };
  totals: {
    currentMonth: number;
    previousMonth: number;
  };
  users: {
    totalUsers: number;
    totalTechnicians: number;
  };
}

interface Technician {
  alf_num: string;
  user: string;
  email: string;
  num_tickets: number;
}

// Función para obtener los tipos de soporte disponibles
export const getSupportTypes = async (): Promise<SupportType[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/tickets/support-types`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los tipos de soporte:", error);
    throw error;
  }
};

// Función para enviar un nuevo ticket de soporte
export const submitSupportTicket = async (ticketData: TicketData) => {
  try {
    // Validar que el tipo de soporte no sea nulo
    if (ticketData.id_tipo_soporte === null) {
      throw new Error("Debe seleccionar un tipo de soporte");
    }

    const response = await axios.post(
      `${BASE_URL}/tickets/support-request/`,
      ticketData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al enviar el ticket de soporte:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      // Puedes personalizar el mensaje de error según la respuesta del servidor
      if (error.response?.status === 400) {
        throw new Error("Datos inválidos: " + error.response.data.message);
      } else if (error.response?.status === 401) {
        throw new Error("No autorizado. Por favor inicie sesión.");
      }
    }

    throw error;
  }
};

// Función para obtener el historial de tickets de un usuario
export const getTicketHistory = async (id_alfnum: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/tickets/user/${id_alfnum}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el historial de tickets:", error);
    throw error;
  }
};

// Función para obtener los detalles de un ticket específico
export const getTicketDetails = async (ticketId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/tickets/details/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del ticket:", error);
    throw error;
  }
};

// Función para eliminar un ticket basado en el código_consulta
export const deleteTicket = async (codigoConsulta: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/tickets/${codigoConsulta}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el ticket:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      if (error.response?.status === 404) {
        throw new Error("Ticket no encontrado");
      } else if (error.response?.status === 403) {
        throw new Error("No tienes permisos para eliminar este ticket");
      }
    }

    throw error;
  }
};

// Función para obtener métricas de tickets del usuario
export const getTicketMetrics = async (
  userId: string
): Promise<TicketMetricsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/tickets/metrics/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener métricas de tickets:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      if (error.response?.status === 404) {
        throw new Error("Usuario no encontrado");
      } else if (error.response?.status === 400) {
        throw new Error("Datos inválidos para la consulta");
      }
    }

    // Retorno de valores por defecto en caso de error
    return {
      ticketsByStatus: {
        abiertos: 0,
        enProceso: 0,
        pendientes: 0,
        resueltos: 0,
      },
      tiempoPromedio: {
        current: 0,
        difference: 0,
        percentage: 0,
        isImprovement: false,
      },
      totals: {
        currentMonth: 0,
        previousMonth: 0,
      },
    };
  }
};

// Función para enviar datos del usuario a MySQL
export const sendUserToMySQL = async (userData: MySQLUserData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/admin/create-user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Usuario enviado a MySQL:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al enviar el usuario a MySQL:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      // Puedes personalizar el mensaje de error según la respuesta del servidor
      if (error.response?.status === 400) {
        throw new Error("Datos inválidos: " + error.response.data.message);
      } else if (error.response?.status === 500) {
        throw new Error("Error interno del servidor en MySQL");
      }
    }

    throw error;
  }
};

export const assignTechnicianToTicket = async (
  assignData: AssignTechnicianDto
): Promise<AssignedTicketResponse> => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/tickets/assign-technician`,
      assignData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al asignar técnico al ticket:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      // Manejo específico de errores
      if (error.response?.status === 400) {
        throw new Error(
          `Datos inválidos: ${JSON.stringify(error.response.data.errors)}`
        );
      } else if (error.response?.status === 404) {
        throw new Error(
          error.response.data.message || "Ticket o técnico no encontrado"
        );
      }
    }

    throw new Error("Error al asignar técnico al ticket");
  }
};

// Función para obtener métricas del panel de administrador
export const getAdminMetrics = async (): Promise<AdminMetricsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/metrics`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener métricas del admin:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      if (error.response?.status === 403) {
        throw new Error("No tienes permisos para acceder a estas métricas");
      }
    }

    // Retorno de valores por defecto en caso de error
    return {
      ticketsByStatus: {
        abiertos: 0,
        enProceso: 0,
        pendientes: 0,
        resueltos: 0,
      },
      tiempoPromedio: {
        current: 0,
        difference: 0,
        percentage: 0,
        isImprovement: false,
      },
      totals: {
        currentMonth: 0,
        previousMonth: 0,
      },
      users: {
        totalUsers: 0,
        totalTechnicians: 0,
      },
    };
  }
};

export const getAllTickets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/tickets`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los tickets:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      if (error.response?.status === 403) {
        throw new Error("No tienes permisos para ver todos los tickets");
      }
    }

    throw error;
  }
};

// Función para obtener la lista de técnicos con sus estadísticas
export const getTechniciansList = async (): Promise<Technician[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/technicians`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la lista de técnicos:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      if (error.response?.status === 403) {
        throw new Error("No tienes permisos para acceder a esta información");
      } else if (error.response?.status === 404) {
        throw new Error("No se encontraron técnicos registrados");
      }
    }

    // Retornar array vacío en caso de error
    return [];
  }
};

// Función para cerrar un ticket como administrador
export const closeTicket = async (
  ticketId: number
): Promise<{ message: string }> => {
  try {
    // Capturar la fecha y hora local exacta con offset
    function getLocalISOString() {
      const now = new Date();

      // Obtener el offset en minutos y convertirlo a formato de string "+/-HH:MM"
      const offsetMinutes = now.getTimezoneOffset();
      const offsetSign = offsetMinutes <= 0 ? "+" : "-";
      const offsetString = `${offsetSign}00:00`; // Cambiado a 00:00 para evitar problemas de formato

      // Formato: YYYY-MM-DDTHH:MM:SS.sss+/-HH:MM
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetString}`;
    }

    const fecha_cierre = getLocalISOString();
    console.log(fecha_cierre);

    const response = await axios.patch(
      `${BASE_URL}/admin/close/`,
      {
        id_ticket: ticketId,
        fecha_cierre: fecha_cierre,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al cerrar el ticket:", error);

    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Mensaje:", error.response?.data);

      // Manejo específico de errores
      if (error.response?.status === 400) {
        throw new Error(
          `Datos inválidos: ${JSON.stringify(error.response.data.errors)}`
        );
      } else if (error.response?.status === 404) {
        throw new Error("Ticket no encontrado");
      } else if (error.response?.status === 403) {
        throw new Error("No tienes permisos para cerrar este ticket");
      }
    }

    throw new Error("Error al intentar cerrar el ticket");
  }
};
