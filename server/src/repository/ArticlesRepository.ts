import db from "../database/database";
import QueryReturn from "../Utils/QueryReturn";
import QueryUtils from "../Utils/QueryUtils";
import ArticlesModel from "../models/ArticlesModel";
import { Request, Response } from "express";

export default class ArticlesRepository{

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            let result = await db.query("SELECT a.article_id, a.title AS tittle, a.creator_id, a.resumo, a.url_arquivo, a.status, a.tematic_area, a.version, a.key_words, COALESCE(JSON_ARRAYAGG(JSON_OBJECT('idUser', u.idUser, 'userName', u.userName, 'url_img_user', u.url_img_user, 'userEmail', u.userEmail, 'type', u.type)), JSON_ARRAY()) AS colaborators FROM tb_artigo a LEFT JOIN tb_colaboradores c ON c.article_id = a.article_id LEFT JOIN tb_user u ON u.idUser = c.user_id GROUP BY a.article_id ORDER BY a.created_at DESC;");
            res.status(200).send(result[0]);
        } catch (error) {
          res.status(500).json({ message: "Error: " + error });
        }
      }
}