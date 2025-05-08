import type { EventAttributes } from "../events/events"

export interface Colaborator {
    user_id: string
    userName: string,
    url_img_user: string
    created_at: string
}


    export interface ArticleAttributes {
        article_id: number
        tittle: string,
        user: Colaborator
        event: EventAttributes
        colaborators: Colaborator[]
        resumo: string
        key_words: string[]
        tematic_area: string
        url: string
        version: number
        status: 'criado' | 'andamento' | 'revisado' | 'aprovado' | 'rejeitado'
        likes: number
        updated_at: string
        created_at: string
        evento_id: number
    }


export class Article implements ArticleAttributes {
    article_id: number
    tittle: string
    user: Colaborator
    event: EventAttributes
    colaborators: Colaborator[]
    resumo: string
    key_words: string[]
    tematic_area: string
    url: string
    version: number
    status: 'criado' | 'andamento' | 'revisado' | 'aprovado' | 'rejeitado'
    likes: number
    updated_at: string
    created_at: string
    evento_id: number

    constructor(attributes: ArticleAttributes) {
        this.colaborators = attributes.colaborators;
        this.event = attributes.event;
        this.article_id = attributes.article_id;
        this.key_words = attributes.key_words;
        this.likes = attributes.likes;
        this.resumo = attributes.resumo;
        this.status = attributes.status;
        this.tematic_area = attributes.tematic_area;
        this.url = attributes.url;
        this.user = attributes.user;
        this.version = attributes.version;
        this.created_at = attributes.created_at;
        this.updated_at = attributes.updated_at
        this.tittle = attributes.tittle      
        this.evento_id = attributes.evento_id  
    }
}

export interface ArticleDTOPost {
    tittle: string
    creator_id: number
    resumo: string
    url_arquivo: string
    key_words: string[]
    tematic_area: string
    status: string
    evento_id: number
    colaborators: Colaborator[]
  }
  
  export interface Colaborator {
    idUser: number
  }
  