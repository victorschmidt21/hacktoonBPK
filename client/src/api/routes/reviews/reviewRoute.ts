import type { AxiosInstance } from "axios";
import type { ReviewAttributes } from "./reviews";
import { templateGetAllReviews } from "./template";

export class ReviewRoute {
    server: AxiosInstance | null
    
    constructor(server: AxiosInstance | null) {
        this.server = server;
    }

    async getByIdArticle(id: string): Promise<ReviewAttributes[]> {
        return (await this.server?.get("revisao/" + id))?.data || templateGetAllReviews
    }

    async post(attributes: ReviewAttributes): Promise<void> {
        return (await this.server?.post("revisao", attributes))
    }
}