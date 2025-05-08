import axios, { Axios } from "axios";
import { ArticleRoute } from "./routes/article/articleRoute";
import { EventRoute } from "./routes/events/eventRoute";
import { CommentsRoute } from "./routes/comments/commentsRoute";

const server = null;

export class Api {
    server = server

    articles = new ArticleRoute(server)
    events = new EventRoute(server)
    comments = new CommentsRoute(server)
}