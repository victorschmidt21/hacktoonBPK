import type { ReviewAttributes } from "./reviews";

export const templateGetAllReviews: ReviewAttributes[] = [
    {
        review_id: 1,
        comentario: "Ruim",
        article_id: 1,
        created_at: new Date().toISOString(),
        nota: 40,
        user_id: "1"
    },
    {
        review_id: 2,
        comentario: "Bacaninha",
        article_id: 1,
        created_at: new Date().toISOString(),
        nota: 60,
        user_id: "2"
    },
    {
        review_id: 1,
        comentario: "Melhorou",
        article_id: 1,
        created_at: new Date().toISOString(),
        nota: 80,
        user_id: "1"
    }
]