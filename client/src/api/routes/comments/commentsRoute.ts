import type { AxiosInstance } from "axios";
import { templateGetByIdArticleComments } from "./template";
import type { CommentsAttributes } from "./comments";

export class CommentsRoute {
    server: AxiosInstance | null;

    constructor(server:  AxiosInstance | null) {
        this.server = server;
    }

    async getByIdArticle(id: string): Promise<CommentsAttributes[]> {
        const response = await this.server?.get("comentario/" + id);
        return response?.data ?? templateGetByIdArticleComments
    }
}