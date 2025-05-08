import type { AxiosInstance } from "axios";
import { templateGetByIdArticleComments } from "./template";
import type { CommentsAttributes, CommentsDTOPost } from "./comments";

export class CommentsRoute {
    server: AxiosInstance | null;

    constructor(server:  AxiosInstance | null) {
        this.server = server;
    }

    async getByIdArticle(id: number | undefined): Promise<CommentsAttributes[]> {
        const response = await this.server?.get("comment/" + id);
        return response?.data ?? templateGetByIdArticleComments
    }

    async post(comment: CommentsDTOPost): Promise<void> {
        await this.server?.post("comment", comment);
    }
}