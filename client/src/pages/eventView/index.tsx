import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../api/api";

export interface EventAttributes {
  evento_id: number;
  img_url_evento: string;
  title: string;
  description: string;
  dt_start: string;
  dt_end: string;
  status: string;
  updated_at: string;
  created_at: string;
}

export function EventView() {
  const [event, setEvent] = useState<EventAttributes | null>(null);

  const { id } = useParams();
  const api = new Api();
  useEffect(() => {
    async function getEvents() {
      const response = await api.events.getById(id);
      setEvent(response);
    }
    getEvents();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status) {
      case "Aberto para inscrições":
        return "bg-green-100 text-green-800";
      case "Iniciando":
        return "bg-blue-100 text-blue-800";
      case "Em breve":
        return "bg-yellow-100 text-yellow-800";
      case "Finalizado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl w-full mx-auto  h-64 md:h-80 lg:h-96 overflow-hidden relative">
        <img
          src={event?.img_url_evento}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                event?.status
              )}`}
            >
              {event?.status}
            </span>
            <h1 className="text-white text-3xl md:text-4xl font-bold mt-2">
              {event?.title}
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <article className="bg-white p-8 rounded-lg shadow-sm">
          <header className="mb-8">
            <div className="flex justify-between mx-5 flex-wrap gap-4">
              <div>
                <div className="font-medium text-gray-900">Data de inicio</div>
                <div className="text-gray-500 text-sm">
                  {formatDate(event?.dt_start)}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Data de término</div>
                <div className="text-gray-500 text-sm">
                  {formatDate(event?.dt_start)}
                </div>
              </div>
            </div>
          </header>

          <div className="mt-5 border-t pt-4">
            <div className="flex flex-wrap gap-2 flex-col">
              <h2 className="font-semibold">Sobre o Evento:</h2>
              <div className="text-gray-700">{event?.description}</div>
            </div>
          </div>

          <div className="mt-5 border-t pt-4">
            <div className="flex flex-wrap gap-2 flex-col">
              <div className="mb-4 mt-2">
                <a
                  href={`/eventregistration/new/${event?.evento_id}`}
                  className="px-4 py-2 bg-[#243444] hover:bg-gray-900 text-white rounded-md cursor-pointer transition-colors"
                >
                  Inscrever-se
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
