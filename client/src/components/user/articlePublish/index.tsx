import { type ArticleAttributes } from "../../../api/routes/article/article";
import { DownloadButton } from "../downloadButton";
import { Tag } from "../tag";

export function Article({ article }: { article: ArticleAttributes }) {
  const date = new Date(article.created_at);
  const formattedDateCreated = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });


  return (
    <article
      key={article.article_id}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={article?.user.url_img_user}
            alt={article.user.userName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-gray-700 font-medium">{article.user.userName}</span>
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-2"></span>
          <span>{formattedDateCreated}</span>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-xl font-bold text-[#243444] mb-2">
          <a
            href={`/article/${article.article_id}`}
            className=" transition-colors duration-200"
          >
            <div className="flex items-start">{article.tittle}</div>
          </a>
        </h2>
        <p className="text-gray-600 line-clamp-3">{article.resumo}</p>
      </div>

      <div className="mb-4 mt-2">
        <DownloadButton url={article.url} />
      </div>


      <div className="mt-5 border-t pt-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center text-sm flex-wrap space-x-2">
            {article.key_words.map((item) => (
              <Tag>{item}</Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
