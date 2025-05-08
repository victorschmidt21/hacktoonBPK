import React, { useState } from 'react';


export interface Colaborator {
  user_id: string;
  name: string;
  urlPerfil: string;
}

export interface ArticleAttributes {
  id: string;
  title: string;
  user: Colaborator;
  event: EventAttributes;
  colaborators_id: Colaborator[];
  resume: string;
  key_words: string[];
  tematic_area: string[];
  url: string;
  version: number;
  status: "created" | "revisao" | "aproved" | "rejected";
  likes: number;
  updated_at: string;
  created_at: string;
}

export interface EventAttributes {
  evento_id: number;
  img_url_evento: string;
  title: string;
  description: string;
  dt_start: string;
  dt_end: string;
  status: string;
  updated_at: string;
  created_at: string;
}

const EventRegistration: React.FC = () => {

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

  // Usuário atual logado (normalmente viria do sistema de autenticação)
  const currentUser: Colaborator = {
    user_id: "user123",
    name: "João Silva",
    urlPerfil: "https://via.placeholder.com/40"
  };

  // Dados do artigo
  const [articleData, setArticleData] = useState<Partial<ArticleAttributes>>({
    title: '',
    resume: '',
    key_words: [],
    tematic_area: [],
    url: '',
    colaborators_id: [],
    user: currentUser,
    event: event,
    version: 1,
    status: "created"
  });

  // Estado para o processo de submissão
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submissionComplete, setSubmissionComplete] = useState<boolean>(false);
  
  // Estado para campos temporários
  const [newKeyword, setNewKeyword] = useState<string>('');
  const [newArea, setNewArea] = useState<string>('');
  const [newCollaborator, setNewCollaborator] = useState<{name: string, email: string}>({
    name: '',
    email: ''
  });
  const [fileSelected, setFileSelected] = useState<File | null>(null);

  // Áreas temáticas disponíveis
  const availableAreas = [
    'Desenvolvimento Web',
    'Inteligência Artificial',
    'Machine Learning',
    'Processamento de Linguagem Natural',
    'Desenvolvimento Mobile',
    'Ciência de Dados',
    'Segurança da Informação',
    'Computação em Nuvem',
    'Internet das Coisas',
    'Blockchain',
    'UX/UI Design',
    'DevOps'
  ];

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArticleData({
      ...articleData,
      [name]: value
    });
  };

  // Add keyword
  const addKeyword = () => {
    if (newKeyword.trim() && !articleData.key_words?.includes(newKeyword.trim())) {
      setArticleData({
        ...articleData,
        key_words: [...(articleData.key_words || []), newKeyword.trim()]
      });
      setNewKeyword('');
    }
  };

  // Remove keyword
  const removeKeyword = (keyword: string) => {
    setArticleData({
      ...articleData,
      key_words: articleData.key_words?.filter(k => k !== keyword)
    });
  };

  // Add thematic area
  const addThematicArea = () => {
    if (newArea && !articleData.tematic_area?.includes(newArea)) {
      setArticleData({
        ...articleData,
        tematic_area: [...(articleData.tematic_area || []), newArea]
      });
      setNewArea('');
    }
  };

  // Remove thematic area
  const removeThematicArea = (area: string) => {
    setArticleData({
      ...articleData,
      tematic_area: articleData.tematic_area?.filter(a => a !== area)
    });
  };

  // Add collaborator
  const addCollaborator = () => {
    if (newCollaborator.name.trim() && newCollaborator.email.trim()) {
      // Normalmente, você faria uma busca na API para encontrar o usuário correspondente
      // Aqui estamos apenas simulando a criação de um colaborador
      const newCollab: Colaborator = {
        user_id: `user_${Date.now()}`, // ID temporário
        name: newCollaborator.name.trim(),
        urlPerfil: "https://via.placeholder.com/40"
      };
      
      setArticleData({
        ...articleData,
        colaborators_id: [...(articleData.colaborators_id || []), newCollab]
      });
      
      setNewCollaborator({ name: '', email: '' });
    }
  };

  // Remove collaborator
  const removeCollaborator = (userId: string) => {
    setArticleData({
      ...articleData,
      colaborators_id: articleData.colaborators_id?.filter(c => c.user_id !== userId)
    });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0]);
      // Normalmente, você faria o upload para o servidor e obteria uma URL
      // Aqui estamos apenas simulando
      setArticleData({
        ...articleData,
        url: 'https://example.com/uploads/article.pdf'
      });
    }
  };

  // Submit the article
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulando uma chamada de API
    setTimeout(() => {
      setLoading(false);
      setSubmissionComplete(true);
    }, 1500);
  };

  // Validate if the current step is complete
  const isStepComplete = () => {
    switch (step) {
      case 1:
        return true; // Information step is always complete
      case 2:
        return !!articleData.title && !!articleData.resume && articleData.resume.length >= 100;
      case 3:
        return (
          articleData.key_words && articleData.key_words.length >= 3 &&
          articleData.tematic_area && articleData.tematic_area.length >= 1
        );
      case 4:
        return true; // Collaborators are optional
      case 5:
        return !!articleData.url || !!fileSelected;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!submissionComplete ? (
          <>
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#243444]' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-[#243444] text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="text-xs mt-1">Informações</span>
                </div>
                <div className={`w-full h-1 mx-1 ${step >= 2 ? 'bg-[#243444]' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-[#243444]' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-[#243444] text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="text-xs mt-1">Artigo</span>
                </div>
                <div className={`w-full h-1 mx-1 ${step >= 3 ? 'bg-[#243444]' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-[#243444]' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-[#243444] text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="text-xs mt-1">Categorização</span>
                </div>
                <div className={`w-full h-1 mx-1 ${step >= 4 ? 'bg-[#243444]' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 4 ? 'text-[#243444]' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 4 ? 'bg-[#243444] text-white' : 'bg-gray-200'}`}>
                    4
                  </div>
                  <span className="text-xs mt-1">Colaboradores</span>
                </div>
                <div className={`w-full h-1 mx-1 ${step >= 5 ? 'bg-[#243444]' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 5 ? 'text-[#243444]' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 5 ? 'bg-[#243444] text-white' : 'bg-gray-200'}`}>
                    5
                  </div>
                  <span className="text-xs mt-1">Upload</span>
                </div>
                <div className={`w-full h-1 mx-1 ${step >= 6 ? 'bg-[#243444]' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 6 ? 'text-[#243444]' : 'text-gray-400'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 6 ? 'bg-[#243444] text-white' : 'bg-gray-200'}`}>
                    6
                  </div>
                  <span className="text-xs mt-1">Revisão</span>
                </div>
              </div>
            </div>

            {/* Step 1: Event Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h1 className="text-2xl font-bold text-[#243444] mb-6">Submissão de Artigo</h1>
                
                <div className="flex flex-col md:flex-row mb-6">
                  <div className="md:w-1/3 pr-8">
                    <img 
                      src="https://via.placeholder.com/400x250.png?text=Workshop+de+Desenvolvimento+Web" 
                      alt={event.title}
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                  </div>
                  <div className="md:w-2/3 mt-4 md:mt-0">
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    
                    <div className="mt-2 flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{formatDate(event.dt_start)}</span>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-800">Diretrizes para submissão de artigos:</h3>
                      <ul className="mt-2 list-disc list-inside text-gray-600">
                        <li>Os artigos devem estar em formato PDF.</li>
                        <li>O resumo deve ter entre 100 e 250 palavras.</li>
                        <li>Inclua de 3 a 5 palavras-chave.</li>
                        <li>O artigo completo deve ter entre 6 e 15 páginas.</li>
                        <li>Utilize a formatação padrão IEEE para referências.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-600">Submissões abertas até: <strong>01/05/2025</strong></span>
                    </div>
                    <button 
                      className="px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors"
                      onClick={() => setStep(2)}
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Article Information */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h1 className="text-2xl font-bold text-[#243444] mb-6">Informações do Artigo</h1>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
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
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="resume">
                      Resumo* <span className="text-sm font-normal text-gray-500">(100-250 palavras)</span>
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
                      {articleData.resume && articleData.resume.length < 100 && (
                        <span className="text-red-500"> (mínimo: 100)</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center">
                    <button 
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setStep(1)}
                    >
                      Voltar
                    </button>
                    <button 
                      className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors ${!isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setStep(3)}
                      disabled={!isStepComplete()}
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Keywords and Thematic Areas */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h1 className="text-2xl font-bold text-[#243444] mb-6">Categorização</h1>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Palavras-chave* <span className="text-sm font-normal text-gray-500">(mínimo: 3)</span>
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
                      Áreas Temáticas* <span className="text-sm font-normal text-gray-500">(mínimo: 1)</span>
                    </label>
                    <div className="flex">
                      <select
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                      >
                        <option value="">Selecione uma área</option>
                        {availableAreas.map((area, index) => (
                          <option key={index} value={area}>{area}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={addThematicArea}
                        className="px-4 py-2 bg-[#243444] text-white rounded-r-md hover:bg-opacity-90 transition-colors"
                        disabled={!newArea}
                      >
                        Adicionar
                      </button>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {articleData.tematic_area?.map((area, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {area}
                          <button 
                            type="button" 
                            onClick={() => removeThematicArea(area)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center">
                    <button 
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setStep(2)}
                    >
                      Voltar
                    </button>
                    <button 
                      className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors ${!isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setStep(4)}
                      disabled={!isStepComplete()}
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Collaborators */}
            {step === 4 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h1 className="text-2xl font-bold text-[#243444] mb-6">Colaboradores</h1>
                
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
                  <h2 className="text-lg font-medium text-gray-700 mb-3">Adicionar Colaboradores</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="colab-name">
                        Nome do Colaborador
                      </label>
                      <input
                        type="text"
                        id="colab-name"
                        value={newCollaborator.name}
                        onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="colab-email">
                        Email do Colaborador
                      </label>
                      <input
                        type="email"
                        id="colab-email"
                        value={newCollaborator.email}
                        onChange={(e) => setNewCollaborator({...newCollaborator, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243444] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={addCollaborator}
                    className="px-4 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors"
                    disabled={!newCollaborator.name || !newCollaborator.email}
                  >
                    Adicionar Colaborador
                  </button>
                </div>
                
                {articleData.colaborators_id && articleData.colaborators_id.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Colaboradores Adicionados</h3>
                    
                    <div className="space-y-3">
                      {articleData.colaborators_id.map((collaborator, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <img 
                              src={collaborator.urlPerfil}
                              alt={collaborator.name}
                              className="w-8 h-8 rounded-full mr-3"
                            />
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
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center">
                    <button 
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setStep(3)}
                    >
                      Voltar
                    </button>
                    <button 
                      className="px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors"
                      onClick={() => setStep(5)}
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Upload Article */}
            {step === 5 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h1 className="text-2xl font-bold text-[#243444] mb-6">Upload do Artigo</h1>
                
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
                    <p className="text-xs text-gray-500 mt-2">
                      PDF até 10MB
                    </p>
                  </div>
                  
                  {fileSelected && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-green-800">Arquivo selecionado</h4>
                        <p className="text-sm text-green-700 mt-1">{fileSelected.name} ({(fileSelected.size / 1024 / 1024).toFixed(2)} MB)</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center">
                    <button 
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setStep(4)}
                    >
                      Voltar
                    </button>
                    <button 
                      className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors ${!isStepComplete() ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => setStep(6)}
                      disabled={!isStepComplete()}
                    >
                      Próximo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Review and Submit */}
            {step === 6 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h1 className="text-2xl font-bold text-[#243444] mb-6">Revisar e Submeter</h1>
                
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold text-[#243444]">Informações do Artigo</h2>
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
                      <h2 className="text-lg font-semibold text-[#243444] mb-3">Palavras-chave</h2>
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
                      <h2 className="text-lg font-semibold text-[#243444] mb-3">Áreas Temáticas</h2>
                      <div className="flex flex-wrap gap-2">
                        {articleData.tematic_area?.map((area, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold text-[#243444] mb-3">Autores</h2>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <img 
                          src={currentUser.urlPerfil}
                          alt={currentUser.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium">{currentUser.name} (Autor Principal)</div>
                        </div>
                      </div>
                      
                      {articleData.colaborators_id?.map((collaborator, index) => (
                        <div key={index} className="flex items-center">
                          <img 
                            src={collaborator.urlPerfil}
                            alt={collaborator.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="font-medium">{collaborator.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold text-[#243444] mb-3">Arquivo</h2>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      <span>
                        {fileSelected ? fileSelected.name : 'artigo.pdf'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Atenção</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Após submeter o artigo, ele será enviado para revisão. Você poderá acompanhar o status da submissão na sua área de usuário.
                          Certifique-se de que todas as informações estão corretas antes de submeter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex justify-between items-center">
                    <button 
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setStep(5)}
                    >
                      Voltar
                    </button>
                    <button 
                      className={`px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processando...
                        </>
                      ) : (
                        'Submeter Artigo'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#243444]">Artigo Submetido com Sucesso!</h2>
              <p className="mt-2 text-gray-600">
                Seu artigo <strong>"{articleData.title}"</strong> foi enviado para revisão.
              </p>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Informações da Submissão</h3>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">ID da Submissão</h4>
                  <p className="text-gray-800">SUB-{Math.floor(Math.random() * 10000)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Em análise
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Data de Submissão</h4>
                  <p className="text-gray-800">{new Date().toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Evento</h4>
                  <p className="text-gray-800">{event.title}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8 text-left">
              <p className="text-gray-600">
                Você receberá um email com a confirmação da submissão. O comitê do evento irá avaliar seu artigo e você será notificado quando houver uma decisão.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 justify-center">
              <button className="px-6 py-2 bg-[#243444] text-white rounded-md hover:bg-opacity-90 transition-colors">
                Ver Minhas Submissões
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Voltar para Eventos
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EventRegistration;