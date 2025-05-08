import { Article, type ArticleAttributes } from "./article";

export const templateGetAllArticles: ArticleAttributes[] = [
  {
    id: 101,
    title: "Explorando os Avanços da Inteligência Artificial Generativa",
    user: {
      user_id: "u001",
      name: "Camila Andrade",
      urlPerfil: "https://example.com/perfis/camila.png",
    },
    colaborators_id: [
      {
        name: "João Paulo Lima",
        user_id: "u004",
        urlPerfil: "https://example.com/perfis/joao.png",
      },
      {
        name: "Mariana Reis",
        user_id: "u007",
        urlPerfil: "https://example.com/perfis/mariana.png",
      },
    ],
    event: {
      evento_id: 35,
      img_url_evento: "https://example.com/eventos/ai2025.png",
      title: "Conferência Internacional de Inteligência Artificial 2025",
      description:
        "Uma conferência anual reunindo especialistas e pesquisadores em IA de todo o mundo.",
      dt_start: "2025-08-20T09:00:00Z",
      dt_end: "2025-08-23T17:00:00Z",
      status: "ativo",
      created_at: "2025-03-01T11:00:00Z",
      updated_at: "2025-04-10T15:30:00Z",
    },
    key_words: ["IA", "Machine Learning", "NLP", "Chatbots", "Redes Neurais"],
    likes: 152,
    resume: `Este artigo explora os desenvolvimentos mais recentes em inteligência artificial generativa, 
  focando especialmente no impacto que essas tecnologias têm causado em diversas indústrias, como saúde, educação, 
  mercado financeiro e entretenimento. Com o avanço dos modelos de linguagem de grande porte, como GPT e similares, 
  estamos observando uma transformação significativa na forma como humanos interagem com máquinas. 
  
  Além disso, discutimos o papel da IA generativa na automação de tarefas criativas, como geração de conteúdo textual, 
  imagens e até mesmo composições musicais, analisando tanto os benefícios quanto os riscos envolvidos. Abordamos também 
  questões éticas críticas relacionadas ao uso indevido dessas tecnologias, incluindo a geração de desinformação, 
  deepfakes e viés algorítmico.
  
  O artigo apresenta estudos de caso de empresas que já estão integrando IA generativa em seus fluxos de trabalho e 
  destaca como essas mudanças exigem uma nova abordagem para regulamentação e governança de dados. 
  
  Concluímos com previsões baseadas em tendências atuais e opiniões de especialistas sobre o futuro da inteligência artificial generativa, 
  seu papel na sociedade e os desafios que ainda precisam ser enfrentados para garantir que ela seja utilizada de forma ética, segura e responsável.`,
    status: "created",
    tematic_area: "Inteligência Artificial",
    url: "https://revista-tech.com/artigos/ia-generativa-2025",
    version: 2,
    created_at: "2025-04-25T08:15:00Z",
    updated_at: "2025-05-06T10:45:00Z",
  },
  {
    id: 2,
    title: "Prototipação com Arduino",
    user: {
      user_id: "1",
      name: "Autor Principal",
      urlPerfil: "https://example.com/autor1.png",
    },
    colaborators_id: [],
    event: {
      evento_id: 1,
      img_url_evento: "https://example.com/evento1.png",
      title: "Evento de Tecnologia",
      description: "Evento sobre inovações em tecnologia",
      dt_start: "2025-01-10T08:00:00Z",
      dt_end: "2025-01-12T18:00:00Z",
      status: "ativo",
      created_at: "2024-12-01T12:00:00Z",
      updated_at: "2024-12-10T12:00:00Z",
    },
    key_words: ["Ciência e tecnologia", "Arduino"],
    likes: 4,
    resume: "Projeto de prototipação",
    status: "created",
    tematic_area: "IA",
    url: "path://algo.com",
    version: 1,
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-01T10:00:00Z",
  },
  {
    id: 3,
    title: "Outro Artigo sobre IA",
    user: {
      user_id: "1",
      name: "Autor Principal",
      urlPerfil: "https://example.com/autor1.png",
    },
    colaborators_id: [
      {
        name: "Josue",
        user_id: "10",
        urlPerfil: "https://example.com/josue.png",
      },
    ],
    event: {
      evento_id: 2,
      img_url_evento: "https://example.com/evento2.png",
      title: "Simpósio de Inovação",
      description: "Discussões sobre inteligência artificial e robótica",
      dt_start: "2025-02-15T09:00:00Z",
      dt_end: "2025-02-17T17:00:00Z",
      status: "ativo",
      created_at: "2025-01-05T10:00:00Z",
      updated_at: "2025-01-15T14:00:00Z",
    },
    key_words: ["IA", "Desenvolvimento em Desktop"],
    likes: 4,
    resume: "Um resumo legal",
    status: "created",
    tematic_area: "IA",
    url: "path://algo.com",
    version: 1,
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-01T10:00:00Z",
  },
];

export const templateGetByIdArticles = new Article({
  id: 101,
  title: "Explorando os Avanços da Inteligência Artificial Generativa",
  user: {
    user_id: "u001",
    name: "Camila Andrade",
    urlPerfil: "https://example.com/perfis/camila.png",
  },
  colaborators_id: [
    {
      name: "João Paulo Lima",
      user_id: "u004",
      urlPerfil: "https://example.com/perfis/joao.png",
    },
    {
      name: "Mariana Reis",
      user_id: "u007",
      urlPerfil: "https://example.com/perfis/mariana.png",
    },
  ],
  event: {
    evento_id: 35,
    img_url_evento: "https://example.com/eventos/ai2025.png",
    title: "Conferência Internacional de Inteligência Artificial 2025",
    description:
      "Uma conferência anual reunindo especialistas e pesquisadores em IA de todo o mundo.",
    dt_start: "2025-08-20T09:00:00Z",
    dt_end: "2025-08-23T17:00:00Z",
    status: "ativo",
    created_at: "2025-03-01T11:00:00Z",
    updated_at: "2025-04-10T15:30:00Z",
  },
  key_words: ["IA", "Machine Learning", "NLP", "Chatbots", "Redes Neurais"],
  likes: 152,
  resume: `Este artigo explora os desenvolvimentos mais recentes em inteligência artificial generativa, 
focando especialmente no impacto que essas tecnologias têm causado em diversas indústrias, como saúde, educação, 
mercado financeiro e entretenimento. Com o avanço dos modelos de linguagem de grande porte, como GPT e similares, 
estamos observando uma transformação significativa na forma como humanos interagem com máquinas. 

Além disso, discutimos o papel da IA generativa na automação de tarefas criativas, como geração de conteúdo textual, 
imagens e até mesmo composições musicais, analisando tanto os benefícios quanto os riscos envolvidos. Abordamos também 
questões éticas críticas relacionadas ao uso indevido dessas tecnologias, incluindo a geração de desinformação, 
deepfakes e viés algorítmico.

O artigo apresenta estudos de caso de empresas que já estão integrando IA generativa em seus fluxos de trabalho e 
destaca como essas mudanças exigem uma nova abordagem para regulamentação e governança de dados. 

Concluímos com previsões baseadas em tendências atuais e opiniões de especialistas sobre o futuro da inteligência artificial generativa, 
seu papel na sociedade e os desafios que ainda precisam ser enfrentados para garantir que ela seja utilizada de forma ética, segura e responsável.`,
  status: "created",
  tematic_area: "Inteligência Artificial",
  url: "https://revista-tech.com/artigos/4547sd",
  version: 2,
  created_at: "2025-04-25T08:15:00Z",
  updated_at: "2025-05-06T10:45:00Z",
});
