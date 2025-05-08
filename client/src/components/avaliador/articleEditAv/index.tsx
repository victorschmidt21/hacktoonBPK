import { type ArticleAttributes } from "../../../api/routes/article/article";

export function ArticleEditAv({ article }: { article: ArticleAttributes }) {
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
        <div className="flex items-center flex-col space-y-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              article.status === "created"
                ? "bg-neutral-200 text-neutral-700"
                : article.status === "revisao"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-200 text-green-500"
            }`}
          >
            {article.status}
          </span>
          <span>{formattedDateCreated}</span>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-xl font-bold text-[#243444] mb-2">
          <a
            href={`/avaliador/article/${article.id}`}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            <div className="flex items-start">{article.title}</div>
          </a>
        </h2>
      </div>
    </article>
  );
}
