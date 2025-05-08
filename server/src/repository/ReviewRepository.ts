import db from "../database/database";
import { Request, Response } from "express";

export default class ReviewRepository {

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            // Combinar dados de tb_revisao com tb_user e tb_artigo
            const result = await db.query(`
                SELECT 
                    r.revisao_id AS comentario_id,
                    r.article_id,
                    r.comentario,
                    r.nota,
                    r.user_id,
                    u.userName,
                    u.url_img_user,
                    a.created_at
                FROM 
                    tb_revisao r
                JOIN 
                    tb_user u ON r.user_id = u.idUser
                JOIN 
                    tb_artigo a ON r.article_id = a.article_id
                ORDER BY 
                    a.created_at DESC
            `);
            
            // Converter user_id para string para atender à interface ReviewAttributes
            const reviews = result[0].map((review: any) => ({
                ...review,
                user_id: String(review.user_id)
            }));
            
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: "Error: " + error });
        }
    }

    public async create(reviewData: any, req: Request, res: Response): Promise<void> {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            // Inserir na tabela tb_revisao
            const result = await connection.query(`
                INSERT INTO tb_revisao (
                    user_id, article_id, comentario, nota
                ) VALUES (?, ?, ?, ?)
            `, [
                reviewData.user_id,
                reviewData.article_id,
                reviewData.comentario,
                reviewData.nota || 0
            ]);
            
            const revisaoId = result[0].insertId;
            
            await connection.commit();
            
            // Buscar a revisão recém-criada para retornar no formato esperado
            const newReview = await connection.query(`
                SELECT 
                    r.revisao_id AS comentario_id,
                    r.article_id,
                    r.comentario,
                    r.nota,
                    r.user_id,
                    u.userName,
                    u.url_img_user,
                    NOW() AS created_at
                FROM 
                    tb_revisao r
                JOIN 
                    tb_user u ON r.user_id = u.idUser
                WHERE 
                    r.revisao_id = ?
            `, [revisaoId]);
            
            // Converter user_id para string
            const review = {
                ...newReview[0][0],
                user_id: String(newReview[0][0].user_id)
            };
            
            res.status(201).json(review);
        } catch (error) {
            await connection.rollback();
            res.status(500).json({ message: "Error: " + error });
        } finally {
            connection.release();
        }
    }

    public async getByArticle(articleId: number, req: Request, res: Response): Promise<void> {
        try {
          const result = await db.query(`
            SELECT 
              r.revisao_id AS comentario_id,
              r.article_id,
              r.comentario,
              r.nota,
              r.user_id,
              u.userName,
              u.url_img_user,
              a.created_at
            FROM 
              tb_revisao r
            JOIN 
              tb_user u ON r.user_id = u.idUser
            JOIN 
              tb_artigo a ON r.article_id = a.article_id
            WHERE 
              r.article_id = ?
            ORDER BY 
              a.created_at DESC
          `, [articleId]);
              
          // Converter user_id para string
          const reviews = result[0].map((review: any) => ({
            ...review,
            user_id: String(review.user_id)
          }));
              
          res.status(200).json(reviews);
        } catch (error) {
          res.status(500).json({ message: "Error: " + error });
        }
      }
}