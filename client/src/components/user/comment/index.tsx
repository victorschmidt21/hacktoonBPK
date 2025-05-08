import { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import type {
  CommentsAttributes,
  CommentsDTOPost,
} from "../../../api/routes/comments/comments";
import { useUserStore } from "../../../context/userContext";

const CommentSection = ({ articleId }: { articleId: number }) => {
  const [comments, setComments] = useState<CommentsAttributes[]>([]);
  const api = new Api();
  const [newCommentText, setNewCommentText] = useState<string>("");
  const { user } = useUserStore();

  async function getCommentsByArticleId() {
    setComments([]);
  }

  useEffect(() => {
    getCommentsByArticleId();
  }, []);

  const handleReplyClick = (username: string) => {
    setNewCommentText(`@${username} `);
  };

  const handleSubmitComment = () => {
    if (newCommentText.trim()) {
      const newComment: CommentsDTOPost = {
        article_id: articleId,
        comentario: newCommentText,
        user_id: user!.id,
      };
      try {
        api.comments.post(newComment);
        getCommentsByArticleId();
        setNewCommentText("");
      } catch (error) {
        getCommentsByArticleId();
        setNewCommentText("");
      }
    }
  };

  return (
    <div className=" p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Comentários</h2>

      <div className="space-y-6 ">
        {comments.map((comment) => (
          <div
            key={comment.comentario_id}
            className="flex space-x-3 bg-white p-8 rounded-lg shadow-sm"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden ">
                <img
                  src={comment.user.url_img_user}
                  alt={`${comment.user.name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Comment content */}
            <div className="flex-1">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="font-bold">{comment.user.name}</div>
                  <div className="mt-1">{comment.comentario}</div>

                  <div className="mt-2 flex items-center text-gray-400 text-sm">
                    <button
                      className="text-gray-400 cursor-pointer hover:text-gray-700"
                      onClick={() => handleReplyClick(comment.user.name)}
                    >
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Escreva um comentário..."
              className="w-full bg-white p-2 rounded-lg shadow-sm min-h-20 focus:outline-none"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleSubmitComment}
                className="px-4 py-2 bg-[#243444] text-white rounded-md"
              >
                Comentar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="mt-6 pt-6 border-t border-gray-700"></div>
    </div>
  );
};

export default CommentSection;
