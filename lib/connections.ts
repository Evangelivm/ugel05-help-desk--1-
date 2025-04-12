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
