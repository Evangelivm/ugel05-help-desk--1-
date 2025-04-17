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
