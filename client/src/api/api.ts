import axios, { Axios } from "axios";
import { ArticleRoute } from "./routes/article/articleRoute";
import { EventRoute } from "./routes/events/eventRoute";

const server = null;

export class Api {
    server = server

    articles = new ArticleRoute(server)
    events = new EventRoute(server)
}