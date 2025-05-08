import { Router, Request, Response } from "express";
import ArticlesService from "../../services/ArticlesService";

const articlesRoutes = Router();
const articlesService = new ArticlesService();


// getAll
articlesRoutes.get("/", async (req: Request, res: Response) => {
  try {
    articlesService.getAll(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

// getByUser
// getByEvent
// getByUserByEvent
// getByStatus
// post
// put

export default articlesRoutes;