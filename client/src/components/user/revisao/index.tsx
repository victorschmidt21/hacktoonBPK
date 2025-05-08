import { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import type { CommentsAttributes } from "../../../api/routes/comments/comments";

const Revisao = ({ articleId }: { articleId: number }) => {
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

      <div className="mt-6 pt-6 border-t border-gray-700"></div>
    </div>
  );
};

export default Revisao;
