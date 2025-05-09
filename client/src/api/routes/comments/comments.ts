import type { UserAttributes } from "../user/user"

export interface CommentsAttributes {
    comentario_id: number
    article_id: number
    comentario: string
    created_at: string
    updated_at: string
    user: UserAttributes
}

export interface CommentsDTOPost {
    article_id: number
    comentario: string
    user_id: string
}