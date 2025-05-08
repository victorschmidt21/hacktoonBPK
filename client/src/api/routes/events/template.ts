import type { EventAttributes } from "./events";

export const templateGetAllEvents: EventAttributes[] = [
  {
    evento_id: 1,
    img_url_evento: "https://example.com/images/evento1.jpg",
    title: "Workshop de Desenvolvimento Web",
    description:
      "Aprenda os fundamentos de HTML, CSS e JavaScript em um workshop prático de 8 horas.",
    dt_start: "2025-05-10T09:00:00",
    dt_end: "2025-05-10T17:00:00",
    status: "Iniciando",
    updated_at: "2025-05-07T14:30:22",
    created_at: "2025-05-01T10:15:45",
  },
  {
    evento_id: 2,
    img_url_evento: "https://example.com/images/evento2.jpg",
    title: "Conferência de Inteligência Artificial",
    description:
      "Palestras e debates sobre os avanços recentes em IA e suas aplicações práticas no mercado.",
    dt_start: "2025-05-15T08:30:00",
    dt_end: "2025-05-16T18:00:00",
    status: "Iniciando",
    updated_at: "2025-05-07T11:20:15",
    created_at: "2025-04-20T09:45:30",
  },
];

export const templateGetByIdEvent: EventAttributes = {
  evento_id: 1,
  img_url_evento: "https://example.com/images/evento1.jpg",
  title: "Workshop de Desenvolvimento Web",
  description:
    "Aprenda os fundamentos de HTML, CSS e JavaScript em um workshop prático de 8 horas.",
  dt_start: "2025-05-10T09:00:00",
  dt_end: "2025-05-10T17:00:00",
  status: "Iniciando",
  updated_at: "2025-05-07T14:30:22",
  created_at: "2025-05-01T10:15:45",
};
