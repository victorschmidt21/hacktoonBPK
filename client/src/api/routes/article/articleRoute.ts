import type { AxiosInstance } from "axios";
import { templateGetAllArticles, templateGetByIdArticles } from "./template";
import type { ArticleAttributes } from "./article";

export class ArticleRoute {
  server: AxiosInstance | null;

  constructor(server: AxiosInstance | null) {
    this.server = server;
  }

  async getAll(): Promise<ArticleAttributes[]> {
    return (await this.server?.get("articles"))?.data || templateGetAllArticles;
  }

  async getById(id: string | undefined): Promise<ArticleAttributes> {
    return (await (this.server?.get("articles/" + id)))?.data || templateGetByIdArticles;
  }
}
