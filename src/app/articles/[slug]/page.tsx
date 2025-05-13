import { mockArticles } from "@/schemas/article";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = mockArticles.find((article) => article.slug === params.slug);
  
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-4xl font-bold">{article?.title}</h1>
      <p className="text-lg text-muted-foreground">{article?.body}</p>
    </div>
  );
}
