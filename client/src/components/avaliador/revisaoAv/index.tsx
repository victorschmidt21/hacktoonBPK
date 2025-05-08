import { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import type { CommentsAttributes } from "../../../api/routes/comments/comments";

const RevisaoAv = ({ articleId }: { articleId: number }) => {
  const [comments, setComments] = useState<CommentsAttributes[]>([]);
  const api = new Api();

  async function getCommentsByArticleId() {
    const response = await api.comments.getByIdArticle(articleId);
    setComments(response);
  }

  useEffect(() => {
    getCommentsByArticleId();
  }, []);

  return (
    <div className=" p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Revisões</h2>

      <div className="space-y-6 select-none">
        {comments.map((comment) => (
          <div
            key={comment.comentario_id}
            className="flex space-x-3 bg-white p-2 rounded-lg shadow-sm"
          >
            <div className="flex-1">
              <div className="flex items-start space-x-2 justify-between">
                <div className="mt-1 max-w-xl w-full">{comment.comentario}</div>
                <div className="mt-1 bg-[#243444] p-2 rounded-md text-gray-100 shadow-sm">
                  <p>Nota: 7.0</p>
                  <p>25/02/2025</p>
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
              max={10}
              step={0.1}
              placeholder="0–10"
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
