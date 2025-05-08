import type { AxiosInstance } from "axios";
import type { UserAttributes } from "./user";
import { templateGetAllUsers } from "./template";

export class UserRoute {
  server: AxiosInstance | null;

  constructor(server: AxiosInstance | null) {
    this.server = server;
  }

  async getById(id?: string): Promise<UserAttributes> {
    return (await this.server!.get("users/" + id)).data;
  }
  
  async getAll(): Promise<UserAttributes[]> {
    return (await this.server!.get("users"))?.data || templateGetAllUsers;
  }
}
