import React, { useState } from "react";

type Comment = {
  id: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  gostos: number;
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const [newCommentText, setNewCommentText] = useState<string>("");

  const handleReplyClick = (username: string) => {
    setNewCommentText(`@${username} `);
  };

  const handleSubmitComment = () => {
    if (newCommentText.trim()) {
      // Em uma aplicação real, aqui você enviaria o comentário para um backend
      // e receberia o novo comentário com um ID gerado pelo servidor

      const newComment: Comment = {
        id: `new-${Date.now()}`,
        username: "meu_usuario", // Normalmente viria do usuário logado
        avatarUrl: "https://via.placeholder.com/40",
        content: newCommentText,
        timestamp: "agora",
        gostos: 0,
      };

      setComments([...comments, newComment]);
      setNewCommentText("");
    }
  };

  return (
    <div className=" p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-6">Comentários</h2>

      <div className="space-y-6 ">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex space-x-3 bg-white p-8 rounded-lg shadow-sm"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden ">
                <img
                  src={comment.avatarUrl}
                  alt={`${comment.username} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Comment content */}
            <div className="flex-1">
              <div className="flex items-start">
                <div className="flex-1">
                  <div className="font-bold">{comment.username}</div>
                  <div className="mt-1">{comment.content}</div>

                  <div className="mt-2 flex items-center text-gray-400 text-sm">
                    <button
                      className="text-gray-400 cursor-pointer hover:text-gray-700"
                      onClick={() => handleReplyClick(comment.username)}
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
