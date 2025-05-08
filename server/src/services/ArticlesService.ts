import { Request, Response } from "express";
import ArticlesRepository from "../repository/ArticlesRepository";

export default class ArticlesService {
  private articlesRepository = new ArticlesRepository();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      await this.articlesRepository.getAll(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async getByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      await this.articlesRepository.getByUser(userId, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async getByEvent(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.eventId;
      await this.articlesRepository.getByEvent(eventId, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async getByUserByEvent(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const eventId = req.params.eventId;
      await this.articlesRepository.getByUserByEvent(userId, eventId, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async getByStatus(req: Request, res: Response): Promise<void> {
    try {
      const status = req.params.status;
      await this.articlesRepository.getByStatus(status, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const articleId = req.params.articleId;
      await this.articlesRepository.getById(articleId, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const articleData = req.body;
      
      // Validação básica dos dados
      if (!articleData.tittle || !articleData.creator_id || !articleData.resumo) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
      }
      
      // Gerar ID único para o artigo se não for fornecido
      if (!articleData.article_id) {
        articleData.article_id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      }
      
      // Definir valores padrão
      articleData.status = articleData.status || "Criado";
      articleData.version = articleData.version || 1;
      
      // Garantir que key_words seja um array
      if (typeof articleData.key_words === 'string') {
        articleData.key_words = articleData.key_words.split(',').map((word: string) => word.trim());
      } else if (!Array.isArray(articleData.key_words)) {
        articleData.key_words = [];
      }
      
      await this.articlesRepository.create(articleData, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const articleId = req.params.articleId;
      const articleData = req.body;
      
      // Validação básica dos dados
      if (!articleData.tittle && !articleData.resumo && !articleData.status) {
        return res.status(400).json({ message: "Nenhum campo válido para atualização" });
      }
      
      // Garantir que key_words seja um array se existir
      if (articleData.key_words) {
        if (typeof articleData.key_words === 'string') {
          articleData.key_words = articleData.key_words.split(',').map((word: string) => word.trim());
        } else if (!Array.isArray(articleData.key_words)) {
          articleData.key_words = [];
        }
      }
      
      await this.articlesRepository.update(articleId, articleData, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const articleId = req.params.articleId;
      
      if (!articleId) {
        return res.status(400).json({ message: "ID do artigo não fornecido" });
      }
      
      await this.articlesRepository.delete(articleId, req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }
}