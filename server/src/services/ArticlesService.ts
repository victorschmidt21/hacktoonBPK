import { Request, Response } from "express";
import ArticlesRepository from "../repository/ArticlesRepository";

export default class ArticlesService {
  private articlesRepository = new ArticlesRepository();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
        this.articlesRepository.getAll(req, res);
    } catch (error) {
      res.status(500).json({ message: "Error: " + error });
    }
  }
}
