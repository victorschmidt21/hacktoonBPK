import { type ArticleAttributes } from "../../api/routes/article/article";

export function Article({ article }: { article: ArticleAttributes }) {
  const date = new Date(article.created_at);

  const formattedDateCreated = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <article
      key={article.id}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={article.user.urlPerfil}
            alt={article.user.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-gray-700 font-medium">{article.user.name}</span>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-2"></span>
          <span>{formattedDateCreated}</span>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-xl font-bold text-[#243444] mb-2">
          <a
            href={`/article/${article.id}`}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            <div className="flex items-start">{article.title}</div>
          </a>
        </h2>
        <p className="text-gray-600 line-clamp-3">{article.resume}</p>
      </div>

      <div className="mb-4 mt-2">
        <a
          download={article.url}
          className="px-8 py-1 rounded-lg bg-[#243444] text-white cursor-pointer hover:scale-105"
        >
          Download artigo
        </a>
      </div>

      <div className="flex items-center justify-between text-gray-500 mt-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>{article.likes}</span>
          </div>

          <div className="flex items-center">
            <svg
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center text-sm flex-wrap space-x-2">
            {article.key_words.map((item) => (
              <span className="inline-flex items-center px-2 py-1 rounded bg-neutral-200 text-neutral-800">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
