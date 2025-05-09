import { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import type { ReviewAttributes } from "../../../api/routes/reviews/reviews";

const RevisaoAv = ({ articleId }: { articleId: number }) => {
  const [reviews, setReviews] = useState<ReviewAttributes[]>([]);
  const api = new Api();

  async function getReviewsByArticleId() {
    const response: ReviewAttributes[] = [{
      article_id: 1,
      comentario: "Muito interessante. Apenas teria pontos de melhoria na questão do resumo.",
      created_at: new Date("05-08-2025").toISOString(),
      nota: 90,
      review_id: 1,
      user_id: "1"
    },
    {
      article_id: 1,
      comentario: "Na seção de metodologia, é necessário uma explicação melhor.",
      created_at: new Date("05-20-2025").toISOString(),
      nota: 70,
      review_id: 1,
      user_id: "1"
    }]
    setReviews(response);
  }

  useEffect(() => {
    getReviewsByArticleId();
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

  return (
    <div className=" p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Revisões</h2>

      <div className="space-y-6 select-none">
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="flex space-x-3 bg-white p-2 rounded-lg shadow-sm"
          >
            <div className="flex-1">
              <div className="flex items-start space-x-2 justify-between">
                <div className="mt-1 max-w-xl w-full">{review.comentario}</div>
                <div className="mt-1 bg-[#243444] p-2 rounded-md text-gray-100 shadow-sm">
                  <p>Nota: {review.nota}</p>
                  <p>{formatDate(review.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex items-start space-x-4">
          {/* Campo de nota */}
          <div className="w-28">
            <label className="block text-md font-semibold text-gray-800 mb-1">
              Nota
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              placeholder="0–100"
              className="w-full p-2 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-[#243444] transition-all text-center text-lg font-medium text-[#243444]"
            />
          </div>

          {/* Campo de texto e botão */}
          <div className="flex-1">
            <textarea
              placeholder="Escreva uma avaliação..."
              className="w-full bg-white p-2 rounded-lg shadow-sm min-h-20 focus:outline-none"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="px-4 py-2 bg-[#243444] text-white rounded-md hover:bg-[#3a556f] transition-colors"
              >
                Avaliar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700"></div>
    </div>
  );
};

export default RevisaoAv;
