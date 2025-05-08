import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../../api/api";
import type { ArticleAttributes } from "../../../api/routes/article/article";

import { ArticleEditAv } from "../../../components/avaliador/articleEditAv";

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



export function EventViewAv() {
  const [event, setEvent] = useState<EventAttributes | null>(null);
  const [status, setStatus] = useState("pendente");
  const [articles, setArticles] = useState<ArticleAttributes[]>([]);
  const { id } = useParams();
  const api = new Api();

  async function getArticles(eventoId: number) {
    console.log(eventoId);
    const response = (await api.articles.getAll()).filter((article) => {
      return article.evento_id === eventoId;
    });
    console.log("articles: ", response);
    setArticles(response);
  }

  useEffect(() => {
    async function getEvents() {
      const response = (await api.events.getAll()).filter((event) =>{
        return event?.evento_id === Number(id);
      })[0];

      console.log(response)
      setEvent(response);

      getArticles(response.evento_id);
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
      case "Finalizado":
        return "bg-green-100 text-green-800";
      case "Em breve":
        return "bg-blue-100 text-blue-800";
      case "Em andamento":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderArticles = () => {
    if(status === "pendente") {
      return articles.filter((article) => {
        return article.status === "criado" || article.status === "andamento"
      }).map((article) => <ArticleEditAv article={article} />)
    }else {
      return articles.filter((article) => {
        return article.status === "aprovado" || article.status === "revisado" || article.status === "rejeitado"
      }).map((article) => <ArticleEditAv article={article} />)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <article className="bg-white p-8 rounded-lg shadow-sm">
          <header className="mb-8">
            <div className="w-full flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-gray-900 text-3xl md:text-4xl font-bold mt-2">
                {event?.title}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  event?.status
                )}`}
              >
                {event?.status}
              </span>
            </div>
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
        </article>
      </main>
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <article className="bg-white py-4 px-2 space-x-2 rounded-lg shadow-sm">
          <button
            className={`text-[#243444] cursor-pointer  hover:text-[#3a556f] px-3 py-1 text-lg font-medium select-none transition-all duration-300 ease-in-out ${
              status == "pendente"
                ? "border-b-2 border-[#243444]"
                : "border-b-2 border-transparent hover:border-[#3a556f]"
            }`}
            onClick={() => setStatus("pendente")}
          >
            Pendentes
          </button>
          <button
            className={`text-[#243444] cursor-pointer  hover:text-[#3a556f] px-3 py-1 text-lg font-medium select-none transition-all duration-300 ease-in-out ${
              status == "revisado"
                ? "border-b-2 border-[#243444]"
                : "border-b-2 border-transparent hover:border-[#3a556f]"
            }`}
            onClick={() => setStatus("revisado")}
          >
            Revisados
          </button>
        </article>
        <div className="space-y-8 mt-4">
          {renderArticles()}
        </div>
      </main>
    </div>
  );
}
