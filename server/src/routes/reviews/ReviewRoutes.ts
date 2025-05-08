import { Router, Request, Response } from "express";
import ReviewService from "../../services/ReviewService";

const reviewRoutes = Router();
const reviewService = new ReviewService();

// Obter todas as revisões
reviewRoutes.get("/", async (req: Request, res: Response) => {
  try {
    await reviewService.getAll(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// Criar nova revisão
reviewRoutes.post("/", async (req: Request, res: Response) => {
  try {
    await reviewService.create(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

reviewRoutes.get("/article/:articleId", async (req: Request, res: Response) => {
  try {
    await reviewService.getByArticle(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

export default reviewRoutes;