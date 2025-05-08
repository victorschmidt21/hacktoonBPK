import EventModel from "../models/EventModel";
import db from "../database/database";
import QueryReturn from "../Utils/QueryReturn";
import QueryUtils from "../Utils/QueryUtils";

import ValidationUtils from "../Utils/ValidationUtils";
import e, { Request, Response } from "express";

export class EventRepository {
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await db.query(
        `SELECT evento_id, img_url_evento, title, description, dt_start, dt_end, status, created_at, updated_at 
         FROM tb_evento 
         ORDER BY dt_start DESC`
      );

      const rows: any = result[0]; 
      const eventos = rows.map((row: any) => new EventModel(row));
      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno ao buscar eventos." });
    }
  }

  public async insertEvent(res: Response, event: EventModel): Promise<void> {
    try {
      let sql =
        `INSERT INTO tb_evento (img_url_evento, title, description, dt_start, dt_end, status) 
      VALUES ('` +
        event.getImgUrlEvento() +
        `','` +
        event.getTitle() +
        `','` +
        event.getDescription() +
        `','` +
        event.getDtStart() +
        `','` +
        event.getDtEnd() +
        `','` +
        event.getStatus() +
        `') `;
      const result = await db.query(sql);
      res.status(201).json({ message: "Evento inserido." });
    } catch (error) {
      res.status(500).json({ message: "Erro ao inserir dados" + error });
    }
  }
}