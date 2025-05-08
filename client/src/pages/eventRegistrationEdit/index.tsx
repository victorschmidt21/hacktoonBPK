import React, { useEffect, useState } from "react";
import {
  type ArticleAttributes,
  type Colaborator,
} from "../../api/routes/article/article";
import type { EventAttributes } from "../../api/routes/events/events";
import { useParams } from "react-router-dom";
import { Api } from "../../api/api";

export function EventRegistrationEdit() {
  const { id } = useParams();

  const api = new Api();
  const [article, setArticle] = useState<ArticleAttributes>();
  useEffect(() => {
    async function getArticles() {
      const response = await api.articles.getById(id);
      setArticleData(response);
    }
    getArticles();
  }, []);
  const event: EventAttributes = {
    evento_id: 1,
    img_url_evento: "https://example.com/images/evento1.jpg",
    title: "Workshop de Desenvolvimento Web",
    description:
      "Aprenda os fundamentos de HTML, CSS e JavaScript em um workshop prático de 8 horas.",
    dt_start: "2025-05-10T09:00:00",
    dt_end: "2025-05-10T17:00:00",
    status: "Iniciando",
    updated_at: "2025-05-07T14:30:22",
    created_at: "2025-05-01T10:15:45",
  };

  const currentUser: Colaborator = {
    user_id: "user123",
    name: "João Silva",
    urlPerfil: "https://via.placeholder.com/40",
  };

  const [articleData, setArticleData] = useState<Partial<ArticleAttributes>>({
    title: article?.title,
    resume: article?.resume,
    key_words: article?.key_words,
    tematic_area: article?.tematic_area,
    url: article?.url,
    colaborators_id: article?.colaborators_id,
    user: currentUser,
    event: event,
    version: 1,
    status: article?.status,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [newKeyword, setNewKeyword] = useState<string>("");
  const [newArea, setNewArea] = useState<string>("");
  const [newCollaborator, setNewCollaborator] = useState<{
    email: string;
  }>({
    email: "",
  });
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setArticleData({
      ...articleData,
      [name]: value,
    });
  };

  const addKeyword = () => {
    if (
      newKeyword.trim() &&
      !articleData.key_words?.includes(newKeyword.trim())
    ) {
      setArticleData({
        ...articleData,
        key_words: [...(articleData.key_words || []), newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setArticleData({
      ...articleData,
      key_words: articleData.key_words?.filter((k) => k !== keyword),
    });
  };

  const addCollaborator = () => {
    if (newCollaborator.email.trim()) {
      const newCollab: Colaborator = {
        user_id: `user_${Date.now()}`,
        name: "",
        urlPerfil: "https://via.placeholder.com/40",
      };

      setArticleData({
        ...articleData,
        colaborators_id: [...(articleData.colaborators_id || []), newCollab],
      });

      setNewCollaborator({ email: "" });
    }
  };

  const removeCollaborator = (userId: string) => {
    setArticleData({
      ...articleData,
      colaborators_id: articleData.colaborators_id?.filter(
        (c) => c.user_id !== userId
      ),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0]);

      setArticleData({
        ...articleData,
        url: "https://example.com/uploads/article.pdf",
      });
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#243444] mb-6">
            Informações do Artigo
          </h1>

          <div className="space-y-6">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="title"
              >
                Título do Artigo*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={articleData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="resume"
              >
                Resumo*{" "}
                <span className="text-sm font-normal text-gray-500">
                  (250-600 palavras)
                </span>
              </label>
              <textarea
                id="resume"
                name="resume"
                value={articleData.resume}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                required
              />
              <div className="mt-1 text-sm text-gray-500">
                {articleData.resume?.length || 0} caracteres
                {articleData.resume && articleData.resume.length < 250 && (
                  <span className="text-red-500"> (mínimo: 250)</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Palavras-chave*{" "}
                <span className="text-sm font-normal text-gray-500">
                  (mínimo: 3)
                </span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Digite uma palavra-chave"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 bg-[#243444] text-white rounded-r-md hover:bg-opacity-90 transition-colors"
                >
                  Adicionar
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {articleData.key_words?.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Área Temática
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={articleData.tematic_area}
                  onChange={handleInputChange}
                  placeholder="Digite uma área temática"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#243444] mb-6">
            Colaboradores
          </h1>

          <div className="mb-6">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
              <img
                src={currentUser.urlPerfil}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-medium">{currentUser.name} (Você)</div>
                <div className="text-sm text-gray-500">Autor Principal</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-3">
              Adicionar Colaboradores
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-1"
                  htmlFor="colab-email"
                >
                  Email do Colaborador
                </label>
                <input
                  type="email"
                  id="colab-email"
                  value={newCollaborator.email}
                  onChange={(e) =>
                    setNewCollaborator({
                      ...newCollaborator,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addCollaborator}
              className="px-4 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors"
              disabled={!newCollaborator.email}
            >
              Adicionar Colaborador
            </button>
          </div>

          {articleData.colaborators_id &&
            articleData.colaborators_id.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Colaboradores Adicionados
                </h3>

                <div className="space-y-3">
                  {articleData.colaborators_id.map((collaborator, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium">{collaborator.name}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCollaborator(collaborator.user_id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#243444] mb-6">
            Upload do Artigo
          </h1>

          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-4 flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#243444] hover:text-[#1a2631] focus-within:outline-none"
                >
                  <span>Faça upload do seu arquivo</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">ou arraste e solte</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">PDF até 10MB</p>
            </div>

            {articleData.url && !fileSelected && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start">
                <svg
                  className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h4 className="font-medium text-blue-800">Arquivo atual</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    {articleData.url.split("/").pop() || "artigo.pdf"}
                  </p>
                  <a
                    href={articleData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline mt-2 inline-block"
                  >
                    Visualizar
                  </a>
                </div>
              </div>
            )}

            {fileSelected && (
              <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h4 className="font-medium text-green-800">
                    Novo arquivo selecionado
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    {fileSelected.name} (
                    {(fileSelected.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#243444] mb-6">
            Revisar e Editar
          </h1>

          <div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-[#243444]">
                Informações do Artigo
              </h2>
              <div className="mt-3 space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Título</h4>
                  <p className="text-gray-800">{articleData.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Resumo</h4>
                  <p className="text-gray-800">{articleData.resume}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-[#243444] mb-3">
                  Palavras-chave
                </h2>
                <div className="flex flex-wrap gap-2">
                  {articleData.key_words?.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-[#243444] mb-3">
                  Área Temática
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {articleData.tematic_area}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-[#243444] mb-3">
                Autores
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">
                      {currentUser.name} (Autor Principal)
                    </div>
                  </div>
                </div>

                {articleData.colaborators_id?.map((collaborator, index) => (
                  <div key={index} className="flex items-center">
                    <div>
                      <div className="font-medium">{collaborator.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-[#243444] mb-3">
                Arquivo
              </h2>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-red-500 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {fileSelected
                    ? fileSelected.name
                    : articleData.url
                    ? articleData.url.split("/").pop() || "artigo.pdf"
                    : "Nenhum arquivo selecionado"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <button
                className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  "Editar Artigo"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
