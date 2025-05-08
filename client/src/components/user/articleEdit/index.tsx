import { type ArticleAttributes } from "../../../api/routes/article/article";
import { DownloadButton } from "../downloadButton";
import { Tag } from "../tag";

export function ArticleEdit({ article }: { article: ArticleAttributes }) {
  const date = new Date(article.created_at);

  const formattedDateCreated = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  function capitalizeFirstLetter(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status) {
      case "aprovado":
        return "bg-green-100 text-green-800";
      case "revisado":
        return "bg-blue-100 text-blue-800";
      case "andamento":
        return "bg-yellow-100 text-yellow-800";
      case "rejeitado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <article
      key={article.article_id}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={article?.user.url_img_user ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.vecteezy.com%2Farte-vetorial%2F36594092-homem-esvaziar-avatar-vetor-foto-espaco-reservado-para-social-redes-curriculos-foruns-e-namoro-sites-masculino-e-femea-nao-foto-imagens-para-vazio-do-utilizador-perfil&psig=AOvVaw3cxWBuQowWG-a-pnWVMp2x&ust=1746802248135000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjj3s2PlI0DFQAAAAAdAAAAABAc"}
            alt={article?.user.userName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-gray-700 font-medium">{article.user.userName}</span>
        </div>
        <div className="flex items-center flex-col space-y-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              article.status
            )}`}
          >
            {capitalizeFirstLetter(article.status)}
          </span>
          <span>{formattedDateCreated}</span>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="text-xl font-bold text-[#243444] mb-2">
          <a
            href={`/article/${article.article_id}`}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            <div className="flex items-start">{article.tittle}</div>
          </a>
        </h2>
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
