import React, { useEffect, useState } from "react";
import type { EventAttributes } from "../../api/routes/events/events";
import { Api } from "../../api/api";

const EventsListing: React.FC = () => {
  const api = new Api();
  const [events, setEvents] = useState<EventAttributes[]>([]);
  useEffect(() => {
    async function getEvents() {
      const response = await api.events.getAll();
      setEvents(response);
    }
    getEvents();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Eventos</h1>

        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.evento_id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {event.title}
                    </h2>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatDate(event.dt_start)} - {formatDate(event.dt_end)}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === "Em breve"
                        ? "bg-neutral-200 text-neutral-700"
                        : event.status === "Em andamento"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-200 text-green-500"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-6">{event.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-[#243444] text-white rounded-md cursor-pointer transition-colors">
                      Inscrever-se
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 cursor-pointer rounded-md hover:bg-gray-50 transition-colors">
                      Detalhes
                    </button>
                  </div>         
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventsListing;
