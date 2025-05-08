import { useEffect, useState } from "react";
import type { EventAttributes } from "../../../api/routes/events/events";
import { Api } from "../../../api/api";
import { EventComponentAd } from "../../../components/admin/EvenComponentAd";
import { MdAdd } from "react-icons/md";

export function HomeAd() {
  const api = new Api();
  const [events, setEvents] = useState<EventAttributes[]>([]);
  useEffect(() => {
    async function getEvents() {
      const response = await api.events.getAll();
      setEvents(response);
    }
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Eventos</h1>
          <a href="/admin/event/new" className="px-4 py-2 bg-[#243444] hover:bg-gray-900 text-white flex items-center gap-2 rounded-md cursor-pointer transition-colors">
            <span>Criar evento</span>
            <MdAdd />
          </a>
        </div>

        <div className="space-y-6">
          {events.map((event) => (
            <EventComponentAd event={event} />
          ))}
        </div>
      </main>
    </div>
  );
}
