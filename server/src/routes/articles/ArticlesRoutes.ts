import { Router, Request, Response } from "express";
import ArticlesService from "../../services/ArticlesService";

const articlesRoutes = Router();
const articlesService = new ArticlesService();

// getAll
articlesRoutes.get("/", async (req: Request, res: Response) => {
  try {
    await articlesService.getAll(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// Rotas específicas primeiro
// getByUser
articlesRoutes.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    await articlesService.getByUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// getByEvent
articlesRoutes.get("/event/:eventId", async (req: Request, res: Response) => {
  try {
    await articlesService.getByEvent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// getByUserByEvent
articlesRoutes.get("/user/:userId/event/:eventId", async (req: Request, res: Response) => {
  try {
    await articlesService.getByUserByEvent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// getByStatus
articlesRoutes.get("/status/:status", async (req: Request, res: Response) => {
  try {
    await articlesService.getByStatus(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// create
articlesRoutes.post("/", async (req: Request, res: Response) => {
  try {
    await articlesService.create(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// update
articlesRoutes.put("/:articleId", async (req: Request, res: Response) => {
  try {
    await articlesService.update(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// delete
articlesRoutes.delete("/:articleId", async (req: Request, res: Response) => {
  try {
    await articlesService.delete(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

// getById - Esta rota deve ser a ÚLTIMA, pois é a mais genérica
articlesRoutes.get("/:articleId", async (req: Request, res: Response) => {
  try {
    await articlesService.getById(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

export default articlesRoutes;