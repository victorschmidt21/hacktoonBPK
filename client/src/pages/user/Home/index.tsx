import { useEffect, useState } from "react";
import { Api } from "../../../api/api";
import { Article } from "../../../components/user/articlePublish";
import type { ArticleAttributes } from "../../../api/routes/article/article";

export function Home() {
  const api = new Api();
  const [articles, setArticles] = useState<ArticleAttributes[]>([]);
  useEffect(() => {
    async function getArticles() {
      const response = await api.articles.getAll();
      setArticles(response);
    }
    getArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-[#243444] mb-8">
          Artigos Recentes
        </h1>

        <div className="space-y-8">
          {articles.map((article) => (
            <Article article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}
