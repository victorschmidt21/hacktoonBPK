export interface ReviewAttributes {
    comentario_id: number
    article_id: number
    comentario: string
    created_at: string
    nota: number
    user_id: string
}

export class Review implements ReviewAttributes {
    article_id: number
    comentario: string
    comentario_id: number
    created_at: string
    nota: number
    user_id: string

    constructor(attributes: ReviewAttributes) {
        this.article_id = attributes.article_id;
        this.comentario = attributes.comentario;
        this.comentario_id = attributes.comentario_id;
        this.nota = attributes.nota;
        this.user_id = attributes.user_id;
        this.created_at = attributes.created_at;
    }
}