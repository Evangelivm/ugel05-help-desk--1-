"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Send,
  Loader2,
  Upload,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchSelect } from "./search-select";
import { submitSupportTicket } from "@/lib/connections";
import { useSession } from "next-auth/react";

const supportTypes = [
  { value: 1, label: "Soporte al correo institucional" },
  { value: 2, label: "Soporte del SINAD" },
  { value: 3, label: "Soporte de la Red Privada Virtual (VPN)" },
  { value: 4, label: "Soporte al sistema SIGA" },
  { value: 5, label: "Soporte del aplicativo RAP" },
  { value: 6, label: "Soporte al sistema SIAF" },
  { value: 7, label: "Soporte presencial a la PC de la UGEL 05" },
  { value: 8, label: "Soporte a aplicativos de videoconferencia" },
  { value: 9, label: "Soporte al sistema NEXUS" },
  { value: 10, label: "Soporte al sistema SUP, ACM, MCAP, MCT" },
  { value: 11, label: "Soporte al sistema TCP" },
  { value: 12, label: "Soporte al sistema LOTUS" },
  { value: 13, label: "Soporte al sistema LEGIX" },
  { value: 14, label: "Soporte Central Telefónica o Anexos IP" },
  { value: 15, label: "Soporte Cámaras de Video Vigilancia o NVR" },
  { value: 16, label: "Soporte o Instalación de Certificado Digital" },
  { value: 17, label: "Soporte o instalación de antivirus, programas" },
  { value: 18, label: "Soporte al sistema MONASIS" },
  { value: 19, label: "Soporte al sistema SIGERD, CONHAB" },
  { value: 20, label: "Soporte al sistema de mesa de partes virtual" },
  { value: 21, label: "Soporte a la red cableada" },
  { value: 22, label: "Soporte a la red inalámbrica" },
  { value: 23, label: "Centro de datos - Mantenimiento de Servidores" },
  {
    value: 24,
    label: "Centro de datos - Mantenimiento de Servidores Virtuales",
  },
  { value: 25, label: "Centro de datos - Mantenimiento equipos proveedores" },
  { value: 26, label: "Centro de datos - Mantenimiento NVR Hikvision" },
  { value: 27, label: "Centro de datos - Mantenimiento Central Telefónica" },
  { value: 28, label: "Centro de datos - Mantenimiento switches" },
  { value: 29, label: "Centro de datos - Mantenimiento aire acondicionado" },
  { value: 30, label: "Centro de datos - Mantenimiento UPS-Electricidad" },
  { value: 31, label: "Soporte a impresoras y escáneres" },
  { value: 32, label: "Soporte al sistema SICO" },
  { value: 33, label: "Soporte al sistema MELISSA" },
  { value: 34, label: "Soporte al sistema SIGEX" },
  { value: 35, label: "Soporte al sistema QUEUESMART" },
  { value: 36, label: "Soporte al Sistema SINOE" },
  {
    value: 37,
    label: "Soporte Instalación de equipo de sonido, proyector, laptop",
  },
  { value: 38, label: "Soporte al sistema ESINAD" },
];

const formSchema = z.object({
  alf_num_usuario: z.string(),
  id_tipo_soporte: z
    .number({
      required_error: "Por favor seleccione un tipo de soporte",
      invalid_type_error: "Debe ser un número",
    })
    .nullable(),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede exceder los 500 caracteres"),
  id_estado_ticket: z.number(),
});

export function SupportRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alf_num_usuario: session?.user?.alf_num?.toString() || "", // Valor fijo
      id_tipo_soporte: null, // Valor inicial no seleccionado
      descripcion: "",
      id_estado_ticket: 1, // Valor fijo
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Capturar la fecha y hora local exacta con offset
    function getLocalISOString() {
      const now = new Date();

      // Obtener el offset en minutos y convertirlo a formato de string "+/-HH:MM"
      const offsetMinutes = now.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offsetMinutes / 60))
        .toString()
        .padStart(2, "0");
      const offsetMins = Math.abs(offsetMinutes % 60)
        .toString()
        .padStart(2, "0");
      const offsetSign = offsetMinutes <= 0 ? "+" : "-";
      //const offsetString = `${offsetSign}${offsetHours}:${offsetMins}`;
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

    const fecha_creacion = getLocalISOString();

    // Agregar la fecha y hora al objeto de valores
    const payload = {
      ...values,
      alf_num_usuario: String(values.alf_num_usuario),
      fecha_creacion,
    };
    //console.log(payload);
    submitSupportTicket(payload)
      .then((response) => {
        toast.success("Solicitud enviada", {
          description: `Su solicitud de soporte ha sido registrada con el número ${response.ticketNumber}.`,
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          position: "top-center",
          duration: 5000,
        });
        form.reset();
      })
      .catch((error) => {
        toast.error("Error al enviar la solicitud", {
          description: error.message,
          icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
          position: "top-center",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Card className="mx-auto shadow-sm border-t-4 border-t-red-600">
      <CardHeader className="bg-gradient-to-r from-red-50 to-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-red-800 flex items-center gap-2">
              REGISTRO DE ATENCIÓN DE SOPORTE REMOTO
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <HelpCircle className="h-4 w-4 text-red-600" />
                      <span className="sr-only">Ayuda</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Complete este formulario para solicitar asistencia
                      técnica. Recibirá una respuesta en un máximo de 4 horas
                      laborables.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription className="text-gray-600">
              Complete el formulario para solicitar soporte técnico remoto
            </CardDescription>
          </div>
          <div className="hidden md:block">
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 text-red-600" />
              <span>Tiempo estimado de respuesta: 1-4 horas</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="new" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">Nueva Solicitud</TabsTrigger>
            <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="id_tipo_soporte"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Tipo de Atención
                      </FormLabel>
                      <FormControl>
                        <SearchSelect
                          options={supportTypes}
                          value={field.value}
                          onChange={(value) => field.onChange(value)}
                          placeholder="-- Seleccione el tipo de soporte --"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Descripción Detallada
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describa detalladamente su problema..."
                          className="min-h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Proporcione todos los detalles relevantes para ayudarnos
                        a resolver su problema más rápido.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Upload className="h-4 w-4" />
                    <span className="font-medium">Adjuntar archivos (opcional)</span>
                  </div>
                  <Input type="file" className="text-sm" />
                  <p className="text-xs text-gray-500 mt-2">Formatos permitidos: JPG, PNG, PDF. Tamaño máximo: 5MB</p>
                </div> */}

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar solicitud
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="faq">
            <div className="bg-white rounded-md border p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    ¿Cuál es el tiempo de respuesta para las solicitudes?
                  </AccordionTrigger>
                  <AccordionContent>
                    El tiempo de respuesta varía según la prioridad de la
                    solicitud. Para solicitudes de prioridad media, el tiempo
                    promedio de respuesta es de 1-4 horas en días laborables.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    ¿Cómo puedo dar seguimiento a mi solicitud?
                  </AccordionTrigger>
                  <AccordionContent>
                    Puede dar seguimiento a su solicitud en la sección "Mis
                    solicitudes" del menú principal. Allí encontrará el estado
                    actual y el historial de todas sus solicitudes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    ¿Qué debo hacer si mi problema es urgente?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para problemas urgentes, seleccione la prioridad "Alta" o
                    "Crítica" en el formulario. También puede contactar
                    directamente al equipo de soporte al número de extensión
                    1234.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    ¿Puedo cancelar una solicitud enviada?
                  </AccordionTrigger>
                  <AccordionContent>
                    Sí, puede cancelar una solicitud siempre que no haya sido
                    asignada a un técnico. Para hacerlo, vaya a "Mis
                    solicitudes", seleccione la solicitud y haga clic en
                    "Cancelar".
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
