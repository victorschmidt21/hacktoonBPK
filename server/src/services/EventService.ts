import { Request, Response } from "express";
import { EventRepository } from "../repository/EventRepository";
import EventModel from "../models/EventModel";

class EventService {
  private eventRepo = new EventRepository();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      this.eventRepo.getAll(req, res);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async insertEvent(req: Request, res: Response): Promise<void> {
    try {
      let img_url_evento: string = req.body.img_url_evento;
      let title: string = req.body.title;
      let description: string = req.body.description;
      let dt_start: string = req.body.dt_start;
      let dt_end: string = req.body.dt_end;
      const startDate = new Date(dt_start);
      const endDate = new Date(dt_end);
      const now = new Date();
      let status: "Em breve" | "Andamento" | "Finalizado";
      if (now < startDate) {
        status = "Em breve";
      } else if (now >= startDate && now <= endDate) {
        status = "Andamento";
      } else {
        status = "Finalizado";
      }

      let data = {
        img_url_evento: img_url_evento,
        title: title,
        description: description,
        dt_start: startDate.toISOString().slice(0, 19).replace("T", " "),
        dt_end: endDate.toISOString().slice(0, 19).replace("T", " "),
        status: status
      }

      let newEvent = new EventModel(data);

      this.eventRepo.insertEvent(res, newEvent);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default EventService;
