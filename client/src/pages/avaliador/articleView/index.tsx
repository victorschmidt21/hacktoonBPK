import { useEffect, useState } from "react";
import { type ArticleAttributes } from "../../../api/routes/article/article";
import { Api } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Tag } from "../../../components/user/tag";
import { DownloadButton } from "../../../components/user/downloadButton";
import { BiEditAlt } from "react-icons/bi";
import RevisaoAv from "../../../components/avaliador/revisaoAv";

export function ArticleViewAv() {
  const api = new Api();
  const [article, setArticle] = useState<ArticleAttributes>();
  const { id } = useParams();
  const navigation = useNavigate();
  useEffect(() => {
    async function getArticleById() {
      const response = await api.articles.getById(id);
      setArticle(response);
    }
    getArticleById();
  }, []);
  const date = article?.created_at ? new Date(article.created_at) : null;

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
              {article?.title}
            </h1>

            <div className="flex items-center mb-6">
              <img
                src={article?.user.urlPerfil}
                alt={article?.user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-medium text-gray-900">
                  {article?.user.name}
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
                {article?.colaborators_id.map((item) => (
                  <a className="inline-flex items-center px-2 py-1 rounded bg-neutral-200 text-neutral-800 cursor-pointer hover:font-semibold">
                    {item.name}
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
                {article?.resume}
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

        <RevisaoAv articleId={article?.id ? article.id : 123} />
      </main>
    </div>
  );
}
