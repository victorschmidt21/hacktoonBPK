import axios from "axios";
import { ArticleRoute } from "./routes/article/articleRoute";
import { EventRoute } from "./routes/events/eventRoute";
import { CommentsRoute } from "./routes/comments/commentsRoute";
import { UserRoute } from "./routes/user/userRoute";
import { LoginRoute } from "./routes/login/loginRoute";

const server = axios.create({
    baseURL: "http://localhost:3000"
});

export class Api {
    private server = server

    articles = new ArticleRoute(this.server)
    events = new EventRoute(this.server)
    comments = new CommentsRoute(this.server)
    user = new UserRoute(this.server)
    login = new LoginRoute(this.server)
}