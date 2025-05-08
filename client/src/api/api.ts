import axios, { Axios } from "axios";
import { ArticleRoute } from "./routes/article/articleRoute";
import { EventRoute } from "./routes/events/eventRoute";
import { CommentsRoute } from "./routes/comments/commentsRoute";
import { UserRoute } from "./routes/user/userRoute";
import { LoginRoute } from "./routes/login/loginRoute";

const server = null;

export class Api {
    private server = server

    articles = new ArticleRoute(server)
    events = new EventRoute(server)
    comments = new CommentsRoute(server)
    user = new UserRoute(server)
    login = new LoginRoute(server)
}