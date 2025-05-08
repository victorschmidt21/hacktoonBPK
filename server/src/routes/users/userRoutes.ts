import { Router, Request, Response } from "express";
import UserService from "../../services/UserService";
import jwtUtils from "../../Utils/jwtUtils";
import TokenData from "../../Utils/TokenData";
import cookieParser from "cookie-parser";

const usrRoute = Router();
const userService = new UserService();
const jwt: jwtUtils = new jwtUtils();

usrRoute.post("/create", async (req: Request, res: Response) => {
  try {
    userService.userInsert(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

usrRoute.post("/login", (req: Request, res: Response) => {
  try {
    userService.ValidateLogin(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error" + error });
  }
});

export default usrRoute;
