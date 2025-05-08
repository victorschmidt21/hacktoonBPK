import type { EventAttributes } from "../../../api/routes/events/events";

export function EventComponentAd({ event }: { event: EventAttributes }) {
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
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <div className="text-sm text-gray-500 mt-1">
            {formatDate(event.dt_start)} - {formatDate(event.dt_end)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <a
              href={`/admin/event/${event.evento_id}`}
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
