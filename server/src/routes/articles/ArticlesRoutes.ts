import { Router, Request, Response } from "express";
import ArticlesService from "../../services/ArticlesService";

const articlesRoutes = Router();
const articlesService = new ArticlesService();


articlesRoutes.get("/", async (req: Request, res: Response) => {
  try {
    await articlesService.getAll(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    await articlesService.getByUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.get("/event/:eventId", async (req: Request, res: Response) => {
  try {
    await articlesService.getByEvent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.get("/user/:userId/event/:eventId", async (req: Request, res: Response) => {
  try {
    await articlesService.getByUserByEvent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.get("/status/:status", async (req: Request, res: Response) => {
  try {
    await articlesService.getByStatus(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.post("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body.tittle);
    console.log(req.body.creator_id);
    console.log(req.body.resumo);
    await articlesService.create(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.put("/:articleId", async (req: Request, res: Response) => {
  try {
    await articlesService.update(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.delete("/:articleId", async (req: Request, res: Response) => {
  try {
    await articlesService.delete(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});


articlesRoutes.get("/:articleId", async (req: Request, res: Response) => {
  try {
    await articlesService.getById(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error });
  }
});

export default articlesRoutes;