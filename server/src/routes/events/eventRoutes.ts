import { Router, Request, Response } from "express";
import EventService from "../../services/EventService";

const eventRoutes = Router();
const eventService = new EventService();

eventRoutes.get("/", async (req: Request, res: Response) => {
  try {
    eventService.getAll(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

eventRoutes.post("/", async (req: Request, res: Response) => {
  try {

    if(!req.body.img_url_evento){
      res.status(400).json({ message: "Imagem não encontrada."});
    }
    if(!req.body.title){
      res.status(400).json({ message: "Titulo não encontrado."});
    }
    if(!req.body.description){
      res.status(400).json({ message: "Descrição não encontrado."});
    }
    if(!req.body.dt_start){
      res.status(400).json({ message: "Data de inicio não encontrada."});
    }
    if(!req.body.dt_end){
      res.status(400).json({ message: "Data de fim não encontrada."});
    }

    eventService.insertEvent(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

export default eventRoutes;
