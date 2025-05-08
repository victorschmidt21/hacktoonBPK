import type { AxiosInstance } from "axios";
import type { ReviewAttributes } from "./reviews";
import { templateGetAllReviews } from "./template";

export class ReviewRoute {
    server: AxiosInstance | null
    
    constructor(server: AxiosInstance | null) {
        this.server = server;
    }

    async getAll(): Promise<ReviewAttributes[]> {
        return (await this.server?.get("revisao"))?.data || templateGetAllReviews
    }
}