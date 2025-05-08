import CommentModel from "../models/CommentModel";
import db from "../database/database";
import QueryReturn from "../Utils/QueryReturn";
import QueryUtils from "../Utils/QueryUtils";
import User from "../models/UserModel";

import ValidationUtils from "../Utils/ValidationUtils";
import { Request, Response } from "express";

class CommentRepository {
  private queryController: QueryUtils = new QueryUtils();
  private validationUtils: ValidationUtils = new ValidationUtils();

  public async getCommentByArticle(
    article_id: string,
    res: Response
  ): Promise<CommentModel[] | null | undefined> {
    try {
      const queryConfig = new QueryReturn(
        `SELECT a.*, b.userEmail, b.type, b.userName, b.idUser as user_id, b.url_img_user 
         FROM tb_comentarios AS a 
         INNER JOIN tb_user AS b ON a.user_id = b.idUser 
         WHERE a.article_id = ?;`,
        [article_id]
      );
  
      const [rows] = await db.query(queryConfig.generatedQuery, queryConfig.queryCompleter);
      const result = rows as any[];
  
      const comments: CommentModel[] = [];
  
      for (let index = 0; index < result.length; index++) {
        const user = new User(
          result[index].userEmail,
          null,
          result[index].type,
          result[index].userName,
          result[index].user_id,
          result[index].url_img_user
        );
  
        const comment = new CommentModel(
          result[index].comentario_id,
          result[index].comentario,
          result[index].article_id,
          result[index].user_id,
          result[index].created_at,
          result[index].updated_at ?? null,
          user
        );
  
        comments.push(comment);
      }
  
      return comments.length > 0 ? comments : null;
    } catch (error) {
      res.status(500).json({ message: "Error searching for comments: " + error });
    }
  }
  

  public async InsertComment(
    comment: CommentModel,
    res: Response
  ): Promise<number | undefined> {
    try {
      let CommentQuery: QueryReturn =
        this.queryController.CommentInsertGenerate(comment);
      let result: any = await db.query(
        CommentQuery.generatedQuery,
        CommentQuery.queryCompleter
      );
      if (result[0].insertId) {
        return result[0].insertId;
      } else {
        return 0;
      }
    } catch (error) {
      res.status(500).json({ Message: "Error when save Comment: " + error });
    }
  }
}

export default CommentRepository;
