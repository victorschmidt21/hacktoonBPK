import type { AxiosInstance } from "axios";
import type { UserAttributes } from "./user";

export class UserRoute {
    server: AxiosInstance | null

    constructor(server: AxiosInstance | null) {
        this.server = server
    }

    async getById(id?: string): Promise<UserAttributes> {
        return (await this.server!.get("users/" + id)).data;
    }
}