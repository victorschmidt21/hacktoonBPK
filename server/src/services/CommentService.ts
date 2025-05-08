import CommentModel from "../models/CommentModel";
import { Request, Response } from "express";
import CommentRepository from "../repository/CommentRepository";
import { uploadPDFBase64, uploadImageBase64 } from "../Utils/supabaseUtils";

// if (!req.cookies["token"]) {
//   res.status(401).json({ message: "Token not found" });
// }

// let tokenData: TokenData | null = await jwt.verifyToken(
//   req.cookies["token"]
// );

class CommentService {
  private commentRepository: CommentRepository = new CommentRepository();

  public async findCommentsArticle(req: Request, res: Response) {
    try {
      if (!req.body.article_id) {
        res.status(400).json({ Message: "Article is missing." });
      }
      let article_id: string = req.body.article_id;
      if (!article_id) {
        res.status(401).json({ Message: "Article not found." });
      }

      let comments: CommentModel[] | null | undefined =
        await this.commentRepository.getCommentByArticle(article_id, res);

      return res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ Message: "Comment error: " + error });
    }
  }

  public async CommentInsert(req: Request, res: Response) {
    try {
      if (!req.body.article_id) {
        res.status(400).json({ Message: "Article ID is missing." });
        return;
      }

      if (!req.body.comentario || req.body.comentario.trim() === "") {
        res.status(400).json({ Message: "Comment text is missing." });
        return;
      }

      if (!req.body.user_id) {
        res.status(400).json({ Message: "User ID is missing." });
        return;
      }

      const comment = new CommentModel(
        null, 
        req.body.comentario.trim(),
        req.body.article_id, 
        req.body.user_id, 
        null, 
        null, 
        null
      );

      const result = await this.commentRepository.InsertComment(comment, res);

      if (result && result !== 0) {
        res.status(201).json({ Message: "Comment created successfully." });
      } else {
        res.status(500).json({ Message: "Failed to create comment." });
      }
    } catch (error) {
      res.status(500).json({ Message: "Error inserting comment: " + error });
    }
  }
}

export default CommentService;
