"use client";

import { ArticleSchema } from "@/schemas/article";
import { z } from "zod";

export function FeedArticle({
  article,
}: {
  article: z.infer<typeof ArticleSchema>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center border-b">
      <h1 className="text-6xl font-bold text-left break-normal hyphens-auto">
        {article.title}
      </h1>
    </div>
  );
}
