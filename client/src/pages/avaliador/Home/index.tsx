import { useEffect, useState } from "react";
import type { EventAttributes } from "../../../api/routes/events/events";
import { Api } from "../../../api/api";
import { EventComponentAv } from "../../../components/avaliador/EventComponentAv";

export function HomeAvaliador() {
  const api = new Api();
  const [events, setEvents] = useState<EventAttributes[]>([]);
  useEffect(() => {
    async function getEvents() {
      const response = (await api.events.getAll()).filter((event) => {
        return event.status === "Andamento";
      });
      setEvents(response);
    }
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Eventos em andamento
        </h1>

        <div className="space-y-6">
          {events.map((event) => (
            <EventComponentAv event={event} />
          ))}
        </div>
      </main>
    </div>
  );
}
