import React, { useState } from "react";
import {
  type ArticleAttributes,
  type Colaborator,
} from "../../../api/routes/article/article";
import type { EventAttributes } from "../../../api/routes/events/events";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../../api/api";
import { useUserStore } from "../../../context/userContext";

export function EventRegistration() {
  const { user } = useUserStore();
  const api = new Api()
  const navigator = useNavigate()
  const { id } = useParams();
  const event: EventAttributes = {
    evento_id: 1,
    img_url_evento: "https://example.com/images/evento1.jpg",
    title: "Workshop de Desenvolvimento Web",
    description:
      "Aprenda os fundamentos de HTML, CSS e JavaScript em um workshop prático de 8 horas.",
    dt_start: "2025-05-10T09:00:00",
    dt_end: "2025-05-10T17:00:00",
    status: "Andamento",
    updated_at: "2025-05-07T14:30:22",
    created_at: "2025-05-01T10:15:45",
  };

  const currentUser: Colaborator = {
    user_id: "user123",
    idUser: 123,
    userName: "João Silva",
    url_img_user: "https://via.placeholder.com/40",
    created_at: "2025-05-01T10:15:45",
  };

  const [articleData, setArticleData] = useState<Partial<ArticleAttributes>>({
    tittle: "",
    resumo: "",
    key_words: [],
    tematic_area: "",
    url: "",
    colaborators: [],
    user: currentUser,
    event: event,
    version: 1,
    status: "criado",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [newKeyword, setNewKeyword] = useState<string>("");
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
        idUser: 454,
        user_id: `user_${Date.now()}`,
        userName: newCollaborator.email,
        url_img_user: "https://via.placeholder.com/40",
        created_at: "2025-05-01T10:15:45",
      };


      setArticleData({
        ...articleData,
        colaborators: [...(articleData.colaborators || []), newCollab],
      });

      setNewCollaborator({ email: "" });
    }
  };

  // Remove collaborator
  const removeCollaborator = (userId: string) => {
    setArticleData({
      ...articleData,
      colaborators: articleData.colaborators?.filter(
        (c) => c.user_id !== userId
      ),
    });
  };

  // Handle file upload
  const [base64File, setBase64File] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf" && file.size <= 10 * 1024 * 1024) {
      setFileSelected(file);

      // Convert the file to Base64
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          setBase64File(base64String);
        } else {
          console.error("FileReader result is not a string");
          setFileSelected(null);
          setBase64File(null);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecione um arquivo PDF com até 10MB.");
      setFileSelected(null);
      setBase64File(null);
    }
  };

  // Submit the article
  const handleSubmit = () => {
    setLoading(true);

    setLoading(false);
    try {
      console.log({
        colaborators: articleData.colaborators || [],
        creator_id: 9,
        evento_id: Number(id),
        key_words: articleData.key_words || [],
        resumo: articleData.resumo || "",
        status: articleData.status || "",
        tematic_area: articleData.tematic_area || "",
        tittle: articleData.tittle || "",
        url_arquivo: base64File || ""
      })
      api.articles.post({
        colaborators: articleData.colaborators || [],
        creator_id: Number(user?.id),
        evento_id: Number(id),
        key_words: articleData.key_words || [],
        resumo: articleData.resumo || "",
        status: articleData.status || "",
        tematic_area: articleData.tematic_area || "",
        tittle: articleData.tittle || "",
        url_arquivo: base64File || ""
      })
    } catch (error) {
      console.log(error)

    }
    navigator("/eventos")
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
                id="tittle"
                name="tittle"
                value={articleData.tittle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="resumeo"
              >
                Resumo*{" "}
                <span className="text-sm font-normal text-gray-500">
                  (250-600 palavras)
                </span>
              </label>
              <textarea
                id="resumo"
                name="resumo"
                value={articleData.resumo}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                required
              />
              <div className="mt-1 text-sm text-gray-500">
                {articleData.resumo?.length || 0} caracteres
                {articleData.resumo && articleData.resumo.length < 250 && (
                  <span className="text-red-500"> (mínimo: 250)</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Voltar
              </button>
              <button
                className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors `}
              >
                Próximo
              </button>
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
                  name="tematic_area"
                  type="text"
                  value={articleData.tematic_area}
                  onChange={handleInputChange}
                  placeholder="Digite uma área temática"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Voltar
              </button>
              <button
                className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors `}
              >
                Próximo
              </button>
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
                src={currentUser.url_img_user ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.vecteezy.com%2Farte-vetorial%2F36594092-homem-esvaziar-avatar-vetor-foto-espaco-reservado-para-social-redes-curriculos-foruns-e-namoro-sites-masculino-e-femea-nao-foto-imagens-para-vazio-do-utilizador-perfil&psig=AOvVaw3cxWBuQowWG-a-pnWVMp2x&ust=1746802248135000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjj3s2PlI0DFQAAAAAdAAAAABAc"}
                alt={currentUser.userName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-medium">{currentUser.userName} (Você)</div>
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

          {articleData.colaborators &&
            articleData.colaborators.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Colaboradores Adicionados
                </h3>

                <div className="space-y-3">
                  {articleData.colaborators.map((collaborator, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">

                        <div>
                          <div className="font-medium">{collaborator.userName}</div>
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

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Voltar
              </button>
              <button className="px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors">
                Próximo
              </button>
            </div>
          </div>
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
                    Arquivo selecionado
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    {fileSelected.name} (
                    {(fileSelected.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Voltar
              </button>
              <button
                className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors`}
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-[#243444] mb-6">
            Revisar e Submeter
          </h1>

          <div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-[#243444]">
                Informações do Artigo
              </h2>
              <div className="mt-3 space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Título</h4>
                  <p className="text-gray-800">{articleData.tittle}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Resumo</h4>
                  <p className="text-gray-800">{articleData.resumo}</p>
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
                  <img
                    src={currentUser.url_img_user ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.vecteezy.com%2Farte-vetorial%2F36594092-homem-esvaziar-avatar-vetor-foto-espaco-reservado-para-social-redes-curriculos-foruns-e-namoro-sites-masculino-e-femea-nao-foto-imagens-para-vazio-do-utilizador-perfil&psig=AOvVaw3cxWBuQowWG-a-pnWVMp2x&ust=1746802248135000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjj3s2PlI0DFQAAAAAdAAAAABAc"}
                    alt={currentUser.userName}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium">
                      {currentUser.userName} (Autor Principal)
                    </div>
                  </div>
                </div>

                {articleData.colaborators?.map((collaborator, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      src={collaborator.url_img_user ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.vecteezy.com%2Farte-vetorial%2F36594092-homem-esvaziar-avatar-vetor-foto-espaco-reservado-para-social-redes-curriculos-foruns-e-namoro-sites-masculino-e-femea-nao-foto-imagens-para-vazio-do-utilizador-perfil&psig=AOvVaw3cxWBuQowWG-a-pnWVMp2x&ust=1746802248135000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjj3s2PlI0DFQAAAAAdAAAAABAc"}
                      alt={collaborator.userName}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium">{collaborator.userName}</div>
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
                <span>{fileSelected ? fileSelected.name : "artigo.pdf"}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Atenção</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Após submeter o artigo, ele será enviado para revisão. Você
                    poderá acompanhar o status da submissão na sua área de
                    usuário. Certifique-se de que todas as informações estão
                    corretas antes de submeter.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Voltar
              </button>
              <button
                className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center ${loading ? "opacity-70 cursor-not-allowed" : ""
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
                  "Submeter Artigo"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
