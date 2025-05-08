import type { EventAttributes } from "../../../api/routes/events/events";

export function EventComponent({ event }: { event: EventAttributes }) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };
  return (
    <div
      key={event.evento_id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
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
            <a
              href={`/eventregistration/new/${event.evento_id}`}
              className="px-4 py-2 bg-[#243444] hover:bg-gray-900 text-white rounded-md cursor-pointer transition-colors"
            >
              Inscrever-se
            </a>
            <a
              href={`/event/${event.evento_id}`}
              className="px-4 py-2 border border-gray-300  text-gray-700 cursor-pointer rounded-md hover:bg-gray-200 transition-colors"
            >
              Detalhes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
