import type { AxiosInstance } from "axios";
import { templateGetAllArticles, templateGetByIdArticles } from "./template";
import type { ArticleAttributes } from "./article";

export class ArticleRoute {
    server: AxiosInstance | null

    constructor(server: AxiosInstance | null) {
        this.server = server;
    }

    async getAll(): Promise <ArticleAttributes[]> {
        return this.server?.get("articles") || templateGetAllArticles;
    }

    async getById(id: string) {
        return this.server?.get("articles/" + id) || templateGetByIdArticles;
    }
}