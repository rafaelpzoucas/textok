import { ArticleSchema } from "@/schemas/article";
import { z } from "zod";


export function FullArticle({ article }: { article?: z.infer<typeof ArticleSchema>}) {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold">
        {article?.title}
      </h1>

      <p className="text-2xl text-muted-foreground">{article?.body}</p>
    </div>
  )
}