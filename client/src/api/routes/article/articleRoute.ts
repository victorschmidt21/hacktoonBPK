import type { AxiosInstance } from "axios";
import { templateGetAllArticles, templateGetByIdArticles } from "./template";
import type { ArticleAttributes, ArticleDTOPost } from "./article";

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

  async post(attributes: ArticleDTOPost): Promise<void> {
    return (await (this.server?.post("articles", attributes)))
  }
}
