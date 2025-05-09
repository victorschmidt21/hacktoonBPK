import { useEffect, useState } from "react";
import { type ArticleAttributes } from "../../../api/routes/article/article";
import { Api } from "../../../api/api";
import { useParams } from "react-router-dom";
import { Tag } from "../../../components/user/tag";
import { DownloadButton } from "../../../components/user/downloadButton";
import RevisaoAv from "../../../components/avaliador/revisaoAv";

export function ArticleViewAv() {
  const api = new Api();
  const [article, setArticle] = useState<ArticleAttributes>();
  const { id } = useParams();
  useEffect(() => {
    async function getArticleById() {
      const response = await api.articles.getById(id);
      setArticle(response);
    }
    getArticleById();

    
  }, []);
  const date = article?.created_at ? new Date(article.created_at) : null;
  console.log("article ",article)

  
  const formattedDateCreated = date?.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <article className="bg-white p-8 rounded-lg shadow-sm">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#243444] mb-4">
              {article?.tittle}
            </h1>

            <div className="flex items-center mb-6">
              <img
                src={article?.user.url_img_user  ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.vecteezy.com%2Farte-vetorial%2F36594092-homem-esvaziar-avatar-vetor-foto-espaco-reservado-para-social-redes-curriculos-foruns-e-namoro-sites-masculino-e-femea-nao-foto-imagens-para-vazio-do-utilizador-perfil&psig=AOvVaw3cxWBuQowWG-a-pnWVMp2x&ust=1746802248135000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjj3s2PlI0DFQAAAAAdAAAAABAc"}
                alt={article?.user.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-medium text-gray-900">
                  {article?.user.userName}
                </div>
                <div className="text-gray-500 text-sm flex items-center">
                  <span>{formattedDateCreated}</span>
                </div>
              </div>
            </div>
          </header>
          <div className="mt-5 border-t pt-4">
            <div className="flex flex-wrap gap-2 flex-col">
              <h2 className="font-semibold">Autores:</h2>
              <div className="flex items-center text-sm flex-wrap space-x-2">
                {article?.colaborators.map((item) => (
                  <a className="inline-flex items-center px-2 py-1 rounded bg-neutral-200 text-neutral-800 cursor-pointer hover:font-semibold">
                    {item.userName}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t pt-4">
            <div className="flex flex-wrap gap-2 flex-col">
              <h2 className="font-semibold">Tags:</h2>
              <div className="flex items-center text-sm flex-wrap space-x-2 space-y-2">
                {article?.key_words.map((item) => (
                        <Tag>{item}</Tag>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t pt-4">
            <div className="flex flex-wrap gap-2">
              <h2 className="font-semibold">Resumo:</h2>
              <div className="flex items-center text-sm flex-wrap space-x-2">
                {article?.resumo}
              </div>
            </div>
          </div>

          <div className="mt-5 border-t pt-4">
            <div className="flex flex-wrap gap-2 flex-col">
              <h2 className="font-semibold">Artigo:</h2>
              <div className="mb-4 mt-2">
                <DownloadButton url={article?.url} />
              </div>
            </div>
          </div>
        </article>

        <RevisaoAv articleId={article?.article_id ? article.article_id : 123} />
      </main>
    </div>
  );
}
