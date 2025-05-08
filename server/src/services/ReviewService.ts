import { Request, Response } from "express";
import ReviewRepository from "../repository/ReviewRepository";

export default class ReviewService {
  private reviewRepository = new ReviewRepository();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      await this.reviewRepository.getAll(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const reviewData = req.body;
      
      // Validação básica
      if (!reviewData.article_id || !reviewData.user_id || !reviewData.comentario) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
      }
      
      // Converter IDs para números
      reviewData.article_id = Number(reviewData.article_id);
      reviewData.user_id = Number(reviewData.user_id);
      
      if (reviewData.nota !== undefined) {
        reviewData.nota = Number(reviewData.nota);
      }
      
      await this.reviewRepository.create(reviewData, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async getByArticle(req: Request, res: Response): Promise<void> {
    try {
      const articleId = Number(req.params.articleId);
      if (isNaN(articleId)) {
        return res.status(400).json({ message: "ID de artigo inválido" });
      }
      await this.reviewRepository.getByArticle(articleId, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }
}