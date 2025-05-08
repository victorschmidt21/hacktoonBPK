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
      key={article.id}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={article?.user.urlPerfil  ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.vecteezy.com%2Farte-vetorial%2F36594092-homem-esvaziar-avatar-vetor-foto-espaco-reservado-para-social-redes-curriculos-foruns-e-namoro-sites-masculino-e-femea-nao-foto-imagens-para-vazio-do-utilizador-perfil&psig=AOvVaw3cxWBuQowWG-a-pnWVMp2x&ust=1746802248135000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjj3s2PlI0DFQAAAAAdAAAAABAc"}
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
            className=" transition-colors duration-200"
          >
            <div className="flex items-start">{article.title}</div>
          </a>
        </h2>
        <p className="text-gray-600 line-clamp-3">{article.resume}</p>
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
