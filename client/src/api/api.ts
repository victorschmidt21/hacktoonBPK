import axios from "axios";
import { ArticleRoute } from "./routes/article/articleRoute";
import { EventRoute } from "./routes/events/eventRoute";
import { CommentsRoute } from "./routes/comments/commentsRoute";
import { UserRoute } from "./routes/user/userRoute";
import { LoginRoute } from "./routes/login/loginRoute";
import { ReviewRoute } from "./routes/reviews/reviewRoute";

const server = axios.create({
    baseURL: "http://localhost:3000"
});

export class Api {
    private server = server

    articles = new ArticleRoute(server)
    events = new EventRoute(server)
    comments = new CommentsRoute(server)
    user = new UserRoute(server)
    login = new LoginRoute(server)
    review = new ReviewRoute(server)
}