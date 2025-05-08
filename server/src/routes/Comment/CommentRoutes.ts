import { Router, Request, Response } from "express";
import CommentService from "../../services/CommentService";
import jwtUtils from "../../Utils/jwtUtils";
import TokenData from "../../Utils/TokenData";
import cookieParser from "cookie-parser";

const usrRoute = Router();
const commentService = new CommentService();
const jwt: jwtUtils = new jwtUtils();

usrRoute.post("/create", async (req: Request, res: Response) => {
  try {
    commentService.CommentInsert(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

usrRoute.get("/commentByArticle", (req: Request, res: Response) => {
  try {
    commentService.findCommentsArticle(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

export default usrRoute;
