import type { EventAttributes } from "../events/events"

export interface Colaborator {
    user_id: string
    name: string,
    urlPerfil: string
}


export interface ArticleAttributes {
    id: number
    title: string,
    user: Colaborator
    event: EventAttributes
    colaborators_id: Colaborator[]
    resume: string
    key_words: string[]
    tematic_area: string
    url: string
    version: number
    status: "created" | "revisao" | "aproved" | "rejected"
    likes: number
    updated_at: string
    created_at: string
}

export class Article implements ArticleAttributes {
    id: number
    title: string
    user: Colaborator
    event: EventAttributes
    colaborators_id: Colaborator[]
    resume: string
    key_words: string[]
    tematic_area: string
    url: string
    version: number
    status: "created" | "revisao" | "aproved" | "rejected"
    likes: number
    updated_at: string
    created_at: string

    constructor(attributes: ArticleAttributes) {
        this.colaborators_id = attributes.colaborators_id;
        this.event = attributes.event;
        this.id = attributes.id;
        this.key_words = attributes.key_words;
        this.likes = attributes.likes;
        this.resume = attributes.resume;
        this.status = attributes.status;
        this.tematic_area = attributes.tematic_area;
        this.url = attributes.url;
        this.user = attributes.user;
        this.version = attributes.version;
        this.created_at = attributes.created_at;
        this.updated_at = attributes.updated_at
        this.title = attributes.title        
    }
}