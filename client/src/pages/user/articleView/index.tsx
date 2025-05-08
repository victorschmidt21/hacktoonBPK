import { useEffect, useState } from "react";
import { type ArticleAttributes } from "../../../api/routes/article/article";
import { Api } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "../../../components/user/comment";
import { Tag } from "../../../components/user/tag";
import { DownloadButton } from "../../../components/user/downloadButton";
import { BiEditAlt } from "react-icons/bi";
import Revisao from "../../../components/user/revisao";

export function ArticleView() {
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
  const [like, setLike] = useState({ num: 148, like: false });

  const handleLike = () => {
    setLike((prev) => ({
      like: !prev.like,
      num: prev.like ? prev.num - 1 : prev.num + 1,
    }));
  };

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
                src={article?.user.urlPerfil  ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.vecteezy.com%2Farte-vetorial%2F36594092-homem-esvaziar-avatar-vetor-foto-espaco-reservado-para-social-redes-curriculos-foruns-e-namoro-sites-masculino-e-femea-nao-foto-imagens-para-vazio-do-utilizador-perfil&psig=AOvVaw3cxWBuQowWG-a-pnWVMp2x&ust=1746802248135000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjj3s2PlI0DFQAAAAAdAAAAABAc"}
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

          <div className="flex space-x-4 mt-4 justify-between">
            {article?.status == "aprovado" && (
              <div className="flex space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center  ${
                    like.like
                      ? "text-gray-9500"
                      : "hover:text-gray-900 text-gray-400"
                  }  cursor-pointer`}
                >
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
                  <span>{like.num}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-gray-900 cursor-pointer">
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
                </button>
              </div>
            )}

            {article?.status != "aprovado" && (
              <a
                className="px-2 py-1 rounded-lg bg-[#243444] text-white cursor-pointer flex items-center space-x-2"
                onClick={() => navigation(`/eventregistration/${article?.id}`)}
              >
                <p>Editar</p>
                <BiEditAlt />
              </a>
            )}
          </div>
        </article>
        {article?.status == "aprovado" && (
          <CommentSection articleId={article.id} />
        )}
        {article?.status != "aprovado" && (
          <Revisao articleId={article?.id ? article.id : 123} />
        )}
      </main>
    </div>
  );
}
